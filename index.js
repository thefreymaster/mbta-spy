const express = require("express");
require("dotenv").config();
const { createServer } = require("http");
const axios = require("axios");
const path = require("path");
const { Server } = require("socket.io");

const EventSource = require("eventsource");

const app = express();
const httpServer = createServer(app);

app.use(express.static(__dirname + "/build"));
app.use(express.json());

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5500"],
    methods: ["GET", "POST"],
  },
});

app.get("/api/status", function (req, res) {
  return res.send({ running: true });
});

app.get("/api", (req, res) => {
  return res.send({ ready: true });
});

app.get("/api/vehicles", async (req, res) => {
  const response = await axios.get(
    `https://api-v3.mbta.com/vehicles?api_key=${process.env.MBTA_TOKEN}`
  );
  const vehicles = response.data;
  return res.send({ vehicles: vehicles.data });
});

app.get("/api/routes", async (req, res) => {
  const response = await axios.get(
    `https://api-v3.mbta.com/routes?api_key=${process.env.MBTA_TOKEN}`
  );
  const routes = response.data;
  return res.send({ routes: routes.data });
});

app.get("/api/routes/:route_id", async (req, res) => {
  const { route_id } = req.params;

  const response = await axios.get(
    `https://api-v3.mbta.com/routes/${route_id}?api_key=${process.env.MBTA_TOKEN}`
  );
  const route = response.data;
  return res.send({ route: route.data });
});

app.get("/api/shapes/:shapeId", async (req, res) => {
  const response = await axios.get(
    `https://api-v3.mbta.com/shapes?include=route&filter%5Broute%5D=${req.params.shapeId}`
  );
  const shapes = response.data;
  return res.send({ shapes: shapes.data });
});

app.get("/api/vehicles/:vehicle_id", async (req, res) => {
  const { vehicle_id } = req.params;
  const response = await axios.get(
    `https://api-v3.mbta.com/vehicles?filter%5Broute_type%5D=${vehicle_id}&api_key=${process.env.MBTA_TOKEN}`
  );
  const vehicles = response.data;
  return res.send({ vehicles: vehicles.data });
});

app.get("/api/stops/:stop_id", async (req, res) => {
  const { stop_id } = req.params;

  const response = await axios.get(
    `https://api-v3.mbta.com/stops?include=child_stops&filter%5Broute%5D=${stop_id}&api_key=${process.env.MBTA_TOKEN}`
  );
  const stops = response.data;
  return res.send({ stops: stops.data });
});

app.get("/api/predictions/:route_id/:trip_id", async (req, res) => {
  const { route_id, trip_id } = req.params;

  const response = await axios.get(
    `https://api-v3.mbta.com/predictions?include=stop&filter%5Broute%5D=${route_id}&filter%5Btrip%5D=${trip_id}&api_key=${process.env.MBTA_TOKEN}`
  );
  const predictions = response.data;
  const included = response.data.included.reverse();

  const newPredictions = predictions.data.reduce(
    (collector, prediction, index) => {
      const [stop] = included.filter(
        (include) => include.id === prediction?.relationships?.stop?.data?.id
      );
      const combined = {
        attributes: {
          departure_time: prediction?.attributes?.departure_time,
          arrival_time: prediction?.attributes?.arrival_time,
          platform_name: stop?.attributes?.name,
          latitude: stop?.attributes?.latitude,
          longitude: stop?.attributes?.longitude,
        },
        id: prediction?.id,
        relationships: {
          ...prediction.relationships,
        },
      };
      collector.push(combined);
      return collector;
    },
    []
  );

  return res.send({
    predictions: predictions.data,
    combined: newPredictions,
  });
});

app.get("/*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "build/index.html"));
});

const stream = new EventSource(
  `https://api-v3.mbta.com/vehicles?api_key=${process.env.MBTA_TOKEN}`,
  { withCredentials: true }
);

stream.addEventListener("update", (event) => {
  const parsed = JSON.parse(event.data);
  io.emit(parsed.id, event);
});

const port = 5500;

httpServer.listen(process.env.PORT || port, () => {
  console.log("MBTA Spy running");
});
