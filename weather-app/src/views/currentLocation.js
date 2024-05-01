import {useState,useEffect} from 'react'
import WeatherCard from '../components/weatherCard'
export default function CurrentLocation(){
    const [lat, setLat] = useState("")
    const [lon, setLon] = useState("")
    const [userLocation, setUserLocation] = useState("")
    const token_ip = process.env.REACT_APP_IPINFO_TOKEN

    function apiCurrentLocation(controller){
        return fetch(`https://ipinfo.io/?token=${token_ip}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal
        })
          .then(data => data.json())
    }

    useEffect(() => {
        const controller = new AbortController()
        apiCurrentLocation(controller).then(response => {
            setUserLocation(`${response['city']}, ${response['region']}, ${response['country']}`)
            setLat(response['loc'].split(",")[0])
            setLon(response['loc'].split(",")[1])
        })
    },[])

    return (
        <>
        <WeatherCard userLocation={userLocation} lat={lat} lon={lon}/>
        </>
    )
}