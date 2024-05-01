import { Box } from "@mui/system"
import { Typography } from "@mui/material"
export default function DayForecast(props){
    const unit = props.unit || "imperial"
    const unitDic = {
        metric: {
            speed: 'KMH',
            temp: '°C'
        },
        imperial: {
            speed: 'MPH',
            temp: '°F'
        }
    }
    return (
        <Box sx={{ display: 'flex', alignItems: 'center',color: 'white' }}>
            <Typography sx={{ fontSize: 14, marginLeft: 1 }} color="white" gutterBottom>
                {props.fc.day.substring(0,3)}
            </Typography>
            <Box sx={{ marginLeft: 'auto', textAlign: 'center' }}>
                <img src={`https://openweathermap.org/img/wn/${props.fc.icon}.png`} alt="Weather Icon"/> 
            </Box>
            {props.fc.description}
            <Typography sx={{ fontSize: 14, marginLeft: 'auto', marginRight: 1 }} color="white" gutterBottom>
                {parseInt(props.fc.min_temp)}{unitDic[unit]['temp']}&nbsp;{parseInt(props.fc.max_temp)}{unitDic[unit]['temp']}
            </Typography>
        </Box>   
    )
}