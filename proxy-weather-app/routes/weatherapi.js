const express = require('express');
const router = express.Router();
const {getWeatherData,getForecast,getCoordZip, getCoordCity} = require('../controllers/weatherapi')
// router.route('/').get(getWeatherData)
router.route('/weather/').get(getWeatherData)
router.route('/forecast/').get(getForecast)
router.route('/zip/').get(getCoordZip)
router.route('/city/').get(getCoordCity)
module.exports = router;