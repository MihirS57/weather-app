import {Typography,Paper} from '@mui/material'
import {Water,WaterDrop} from '@mui/icons-material'
export default function HumidityDetails(props){
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
        <Paper
                                sx={{
                                height: 150,
                                width: '100%',
                                backgroundColor: '#8B78FF',
                                 border: '1px solid white'
                                }}
                            >
                                <Typography sx={{ color: 'white', fontSize: 13, textAlign: 'left', margin: 1,display: 'flex', alignItems: 'center'  }} color="text.secondary" gutterBottom>
                                <Water sx={{ fontSize: 15 }}/>&nbsp;Humidity
                                </Typography>
                                <WaterDrop sx={{ fontSize: 55, color: 'white' }}/>
                                <h2 style={{color: 'white'}}>{props.humidity}%</h2>
                            </Paper>                 
    )
}