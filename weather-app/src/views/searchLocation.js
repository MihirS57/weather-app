import { useState } from "react"
import WeatherCard from "../components/weatherCard"
import { Chip, Box, TextField, Button } from "@mui/material"



export default function SearchLocation(){
    const [searchLocation,setLocation] = useState("")
    let searchParameter = ""
    const [lat, setLat] = useState("")
    const [lon, setLon] = useState("")
    const [stored_locations,setStoredLocations] = useState(JSON.parse(localStorage.getItem("locations")) || [])

    function apiCoordFromZip(zip_code){
        return fetch(`api/zip?zip=${zip_code}`, {
            mode: 'cors',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then(data => data.json())
    }

    function apiCoordFromCity(city_name){
        return fetch(`api/city?city=${city_name}`, {
            mode: 'cors',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then(data => data.json())
    }


    function apiGetCoords(){
        const numbersRegex = /^\d{5}$/;
        if (numbersRegex.test(searchParameter)) {
            apiCoordFromZip(searchParameter).then(response => {
                if('lat' in response && 'lon' in response){
                    setLat(response['lat'])
                    setLon(response['lon'])
                    setLocation(searchParameter)
                    searchParameter = ""
                }else{
                    console.log('No coords received from API')
                }
            })
            setLocation(searchParameter)
            console.log(searchParameter,'Possible ZIP Code')
        } else  {
            apiCoordFromCity(searchParameter).then(response => {
                if(response.length > 0 && 'lat' in response[0] && 'lon' in response[0]){
                    setLat(response[0]['lat'])
                    setLon(response[0]['lon'])
                    setLocation(searchParameter)
                    searchParameter = ""
                }else{
                    console.log('No coords received from API',response.length)
                    console.log(response)
                }
            })
            console.log(searchParameter,'City detected')
        }
    }

    function checkIfStored(city_name){
        if(city_name !== ""){
            let location_list = stored_locations || []
            return location_list.includes(city_name)
        }
    }

    
    function saveLocation(city_name){
        if(city_name !== ""){
            let location_list = JSON.parse(localStorage.getItem("locations")) || []
            if(!location_list.includes(city_name)){
                location_list.push(city_name)
                localStorage.setItem("locations",JSON.stringify(location_list))
                console.log(`${city_name} city saved`)
                setStoredLocations(location_list)
            }
            
        }
        
    }

    function setSearchParameter(value){
        searchParameter = value
    }

    function searchStoredLocation(location){
        setSearchParameter(location)
        apiGetCoords()
    }

    return (
        <>
        <Box sx={{margin: 2, display: 'flex', alignItems: 'center'}}>
        <TextField 
            sx={{width: '80%', marginRight: 4, color: '#34cceb'}}
            onChange={(e) => setSearchParameter(e.target.value)}
            label="Search by City or ZipCode" 
            variant="outlined" 
            />
            
            <Button variant="contained" onClick={() => apiGetCoords()}>Search</Button>
            
            
        </Box>
        {stored_locations.length > 0 && 
            <Box sx={{overflowX: 'auto', margin: 2, color: '#9D22C9'}}>
                Saved Locations: &nbsp;
            {stored_locations.map((location) => {
                return <Chip sx={{marginRight: 1, marginBottom:  1, backgroundColor: '#9D22C9', color: 'white' }} label={location} onClick={() => searchStoredLocation(location)}></Chip>
            })}
        </Box>}
        {lat === "" && 
            <Box
            height="fit-content"
            width="95%"
            sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'grey', marginLeft: 2, marginRight: 2, marginTop: 10 }}
          >
           <h3> Begin by choosing or typing a city or zip </h3>
          </Box>}
            
        
        {lat !== "" && <WeatherCard 
        userLocation={searchLocation} 
        lat={lat} lon={lon} 
        saveLocation={saveLocation}
        checkStorage={checkIfStored}
        />}
        </>
    )
}
