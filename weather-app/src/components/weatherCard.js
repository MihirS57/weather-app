import {useState,useEffect} from 'react'
import {Button, Box, Card, CardContent,Typography, Grid, CircularProgress} from '@mui/material'
import FiveDayForeCast from './fiveDayForecast'
import WindDetails from './windDetails'
import HumidityDetails from './humidityDetails'

export default function WeatherCard(props){
    let no_info = "--"
    let initialWeatherState = {
        icon: no_info,
        min_temp: no_info,
        max_temp: no_info,
        current_temp: no_info,
        feels_like: no_info,
        humidity: no_info,
        weather_description: no_info,
        wind_speed: no_info,
        forecast: no_info,
    }
    const [weather_dictionary,setWeather] = useState(initialWeatherState)
     const unit = "imperial"
     const unitDic = {
        metric: {
            speed: 'kmh',
            temp: '°C'
        },
        imperial: {
            speed: 'mph',
            temp: '°F'
        }
     }
     
    
    function apiWeatherData(){
        
            return fetch(`api/weather?lat=${props.lat}&lon=${props.lon}&units=${unit}`, {
                mode: 'cors',
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then(data => data.json())
        
        
    }

    useEffect(() => {
        if(props.lat !== '' && props.lon !== ''){
            apiWeatherData().then(weather_response => {
                
                let weather = {}
                if('weather' in weather_response){
                    weather.weather_description = weather_response['weather'][0]['description']
                    weather.icon = `https://openweathermap.org/img/wn/${weather_response['weather'][0]['icon']}.png`
                }
                if('main' in weather_response){
                    let response_main = weather_response['main']
                    weather.current_temp = response_main['temp']
                    weather.feels_like = response_main['feels_like']
                    weather.max_temp = response_main['temp_max']
                    weather.min_temp = response_main['temp_min']
                    weather.humidity = response_main['humidity']
                }
                if('wind' in weather_response){
                    weather.wind_speed = weather_response['wind']['speed']
                }
                setWeather(initialWeatherState)
                setWeather(weather)
            })
        }
    }, [props.lat])

    return (
        <Box style={{margin: 10}}>
            <Card variant='outlined' sx={{backgroundColor: '#7F6BFF'}}>
                
                {props.saveLocation && !props.checkStorage(props.userLocation) &&
                <Button 
                    sx={{float: 'right', color: 'white', marginBottom: 2}}
                    onClick={() => props.saveLocation(props.userLocation)}
                    >Save
                </Button>
                }
                <br></br>
                <CardContent style={{'textAlign': 'center',color: 'white' }}>
                    {!props.saveLocation && <Typography sx={{ fontSize: 18 }} color="white" gutterBottom>
                        YOUR LOCATION
                    </Typography>}
                    <Typography sx={{ fontSize: 18 }} color="white" gutterBottom>
                        {props.userLocation}
                    </Typography>
                    <Typography variant="h2" component="div">
                        <img src={weather_dictionary.icon}/>
                        {weather_dictionary.current_temp} 
                        {unitDic[unit]['temp']} 
                        {weather_dictionary.current_temp === no_info && <CircularProgress size={40} sx={{color: 'white', marginLeft: 1}}/>}
                    </Typography>
                    <Typography sx={{ fontSize: 11 }} component="div">
                        Feels like {weather_dictionary.feels_like} {unitDic[unit]['temp']}
                    </Typography>
                    <Typography color="white">
                        {weather_dictionary.weather_description}
                    </Typography>
                    <Typography sx={{ mb: 10 }}  color="white">
                        L: {weather_dictionary.min_temp}
                        {unitDic[unit]['temp']} &nbsp; 
                        H: {weather_dictionary.max_temp} {unitDic[unit]['temp']}
                    </Typography>

                    <Box>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                                <WindDetails wind_speed={weather_dictionary.wind_speed} unit={unit}/>
                            </Grid>
                            <Grid item xs={6}>
                                <HumidityDetails humidity={weather_dictionary.humidity} unit={unit}/>
                            </Grid>
                        </Grid>
                        
                        <FiveDayForeCast lat={props.lat} 
                        lon={props.lon} unit={unit}/>
                    </Box>
                </CardContent>
            
            </Card>
        </Box>
    )
}