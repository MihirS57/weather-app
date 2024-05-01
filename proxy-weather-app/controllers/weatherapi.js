const axios = require('axios')
exports.getWeatherData = async (req,res,next) => {
    try{
        const {lat, lon, units} = req.query
        const options = {
            method: 'GET',
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=${units}`,
        };
        axios.request(options)
        .then(function (response) {
            return res.status(200).json(response.data)
        })
        .catch(function (error) {
            return res.status(500).json({
                success: false, 
                error: error.message
            })
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }

}

exports.getForecast = async (req,res,next) => {
    try{
        const {lat, lon, units} = req.query
        const options = {
            method: 'GET',
            url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=${units}`,
        };
        axios.request(options)
        .then(function (response) {
            return res.status(200).json(response.data)
        })
        .catch(function (error) {
            return res.status(500).json({
                success: false, 
                error: error.message
            })
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }

}

exports.getCoordZip = async (req,res,next) => {
    try{
        const {zip} = req.query
        const options = {
            method: 'GET',
            url: `https://api.openweathermap.org/geo/1.0/zip?zip=${zip}&limit=5&appid=${process.env.REACT_APP_WEATHER_KEY}`,
        };
        axios.request(options)
        .then(function (response) {
            return res.status(200).json(response.data)
        })
        .catch(function (error) {
            return res.status(500).json({
                success: false, 
                error: error.message
            })
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }

}

exports.getCoordCity = async (req,res,next) => {
    try{
        const {city} = req.query
        const options = {
            method: 'GET',
            url: `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_WEATHER_KEY}`,
        };
        axios.request(options)
        .then(function (response) {
            return res.status(200).json(response.data)
        })
        .catch(function (error) {
            return res.status(500).json({
                success: false, 
                error: error.message
            })
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }

}