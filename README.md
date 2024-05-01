This repository contains files for the frontend as well as the proxy server used to call the OpenWeather API.
To run the frontend, you will first need to run the proxy server.
To run the proxy node-server, follow these steps:

On your terminal: 
1. Navigate to "proxy-weather-app", and run the command `npm install`.
2. Once installation is complete, generate a config.env file in the config folder. Inside the config.env file enter this `REACT_APP_WEATHER_KEY={YOUR_API_KEY}`
3. If you don't have an API key for OpenWeather, you can create one using this link: 'https://home.openweathermap.org/users/sign_in'
4. Once you are done following the above steps, you can now run the server using the command `npm run start`
5. If you see this in your terminal `Proxy server Listening on PORT: 3001`, your proxy server is now up and running locally.

Now to run the react-frontend, 
On your terminal,
1. Navigate to "weather-app", and run the command `npm install`.
2. Once installation is complete, generate a .env file in this folder. Inside the .env file enter this `REACT_APP_IPINFO_TOKEN={YOUR_API_KEY}`.
3. If you don't have an API key for IPInfo, you can create one on this website: 'https://ipinfo.io/'
4. Once you are done following the above steps, you can now run the server using the command `npm start`
5. If you see this in your terminal, `You can now view weather-app in the browser; Local: http://localhost:3000`, your frontend is now launched on your browser.
