import {Typography,Paper} from '@mui/material'
import {Air, Speed} from '@mui/icons-material'
export default function WindDetails(props){
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
            sx={{height: 150,width: '100%',backgroundColor: '#8B78FF',border: '1px solid white'}}>
            <Typography sx={{color: 'white', fontSize: 13, textAlign: 'left', margin: 1,display: 'flex', alignItems: 'center' }} color="text.secondary" gutterBottom>
                <Speed sx={{ color: 'white', fontSize: 14 }}/>&nbsp;Wind speed
            </Typography>
            <Air sx={{ color: 'white',fontSize: 55 }}/>
            <h2 style={{color: 'white'}}>{props.wind_speed} {unitDic[unit]['speed']}</h2>
        </Paper>                    
    )
}