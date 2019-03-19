const token = process.env.API_TOKEN || require('../../config/token');
const axios = require('axios');

const getNypdData = function () {
    return axios.get(`https://data.cityofnewyork.us/resource/5ucz-vwe8.json?statistical_murder_flag=true&$$app_token=${token}`);
}

module.exports = {
    getNypdData: getNypdData
}