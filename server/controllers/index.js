const token = process.env.API_TOKEN || require('../../config/token');
const redisUrl = process.env.REDIS_URL || require('../../config/redisUrl');
const axios = require('axios');
const redis = require('redis').createClient(redisUrl);

const getNypdData = function (year) {
    if (!year || year === Date().split(' ')[3]) {
        return axios.get(`https://data.cityofnewyork.us/resource/5ucz-vwe8.json?statistical_murder_flag=true&$$app_token=${token}`);
    } else {
        return axios.get(`https://data.cityofnewyork.us/resource/833y-fsy8.json?statistical_murder_flag=true&$where=occur_date%20between%20%27${year}-01-01T00:00:00%27%20and%20%27${year}-12-31T00:00:00%27&$$app_token=${token}`);
    }
}

module.exports = {
    getNypdData: getNypdData
}