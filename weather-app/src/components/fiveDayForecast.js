import {  Card, CircularProgress, Typography} from '@mui/material'
import {DateRange} from '@mui/icons-material'
import DayForecast from './dayForecast'
import { useState, useEffect } from 'react'
export default function FiveDayForeCast(props){
    const [forecast,setForecast] = useState([])
    const forecastHour = 11
    function apiForecast(){
        return fetch(`api/forecast?lat=${props.lat}&lon=${props.lon}&units=${props.unit}`, {
            mode: 'cors',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(data => data.json())
    }

    function processForecast(){
        let cnt = 0,list = [], days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        apiForecast().then(response => {
                if('list' in response){
                    let minT = Number.MAX_SAFE_INTEGER, maxT = Number.MIN_SAFE_INTEGER, forecast = {}
                    response['list'].map((day_weather,index) => {
                        const dateTime = new Date(day_weather.dt*1000)
                        if(cnt === 5){
                            forecast['day'] = `${days[dateTime.getDay()]}`
                            forecast['min_temp'] = minT
                            forecast['max_temp'] = maxT
                            if(!('desciption' in forecast) || forecast['desciption'] === undefined){
                                forecast['description'] = response['list'][index-5]['weather'][0]['main']
                            }
                            if(!('icon' in forecast) || forecast['icon'] === undefined ){
                                forecast['icon'] = response['list'][index-5]['weather'][0]['icon']
                            }
                            if(!('key' in forecast)){
                                forecast['key'] = day_weather['dt']
                            }
                            list.push(forecast)
                            
                            cnt = 0
                            minT = Number.MAX_SAFE_INTEGER
                            maxT = Number.MIN_SAFE_INTEGER
                            forecast = {}
                        }else{
                            if('main' in day_weather && 'weather' in day_weather){
                                if(minT > day_weather['main']['temp_min']){
                                    minT = day_weather['main']['temp_min']
                                }
                                if(maxT < day_weather['main']['temp_max']){
                                    maxT = day_weather['main']['temp_max']
                                }
                                if(dateTime.getHours() === forecastHour){
                                    console.log(days[dateTime.getDay()],day_weather['weather'])
                                    if(day_weather['weather'].length > 0){
                                        forecast['description'] = day_weather['weather'][0]['main']
                                        forecast['icon'] = day_weather['weather'][0]['icon']
                                        forecast['key'] = day_weather['dt']
                                    }
                                }
                            }else{
                                forecast['description'] = 'Unavailable'
                            }
                            cnt++
                        }
                        
                    })
                    setForecast(list)
                }
                
            })
        
    }

    useEffect(() => {
        processForecast()
    },[props.lat])

    return (
        <Card variant='outlined' sx={{marginTop: 2, marginBottom: 2, backgroundColor: '#8B78FF',border: '1px solid white'}}>
            <Typography sx={{color: 'white', fontSize: 13, textAlign: 'left', margin: 1,display: 'flex', alignItems: 'center'  }} color="text.secondary" gutterBottom>
                <DateRange sx={{ fontSize: 15,color: 'white', }}/>&nbsp;5-day forecast {forecast.length === 0 && <CircularProgress size={20} sx={{color: 'white', marginLeft: 1}}/>}
             </Typography>
            <hr></hr>
            
            {forecast.map((fc) => {
                return (
                    <div key={fc.key}>   
                        <DayForecast fc={fc}/>
                    </div>
                )
            })}
        </Card>
    )
}