export const getGPSCoordinates = (
  setUserLocation: ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => void
) => {
  const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
  };
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      setUserLocation({ latitude, longitude });
      getLiveGPSCoordinates(setUserLocation);
    },
    (e) => {
      console.log(e);
    },
    options
  );
};

export const getLiveGPSCoordinates = (
  setUserLocation: ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => void
) => {
  const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
  };
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      console.log({ latitude, longitude });

      setUserLocation({ latitude, longitude });
      getLiveGPSCoordinates(setUserLocation);
    },
    (e) => {
      console.log(e);
    },
    options
  );
};
