# MBTA Spy

This project shows the entire MBTA fleet of vehicles on a map, updating in real-time.

<img width="1446" alt="Screen Shot 2022-08-02 at 10 21 36 PM" src="https://user-images.githubusercontent.com/28308815/182510365-0323e121-528b-4ad1-83d3-33bffbe208b6.png">

## Tech Stack
- React
- Mapbox
- Express
- Websockets
- Server Sent Events

## Prerequisites

You must have two API tokens to run locally.  Create a file called `.env`, and add the following keys:
- `MBTA_TOKEN`
- `REACT_APP_MAP_BOX_TOKEN`

Your `.env` file should look like the below

```
MBTA_TOKEN=myMBTAToken
REACT_APP_MAP_BOX_TOKEN=myMapboxToken
```

MBTA Token: https://api-v3.mbta.com/
Mapbox Token: https://docs.mapbox.com/help/getting-started/access-tokens/

## Available Scripts

In the project directory, you can run:

### Frontend

```
npm run fe
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Backend

Runs ExpressJS backend service
```
npm run start
```

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
