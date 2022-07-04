import axios from 'axios';

const token: string = process.env.API_TOKEN || require('../../../config/token');

const currentYear: string = Date().split(' ')[3];

const getMapData = (year: string = currentYear) => {
    if (!year || year === currentYear) {
        return axios.get(
            `https://data.cityofnewyork.us/resource/5ucz-vwe8.json?statistical_murder_flag=Y&$$app_token=${token}`
        );
    } else {
        return axios.get(
            `https://data.cityofnewyork.us/resource/833y-fsy8.json?statistical_murder_flag=true&$where=occur_date%20between%20%27${year}-01-01T00:00:00%27%20and%20%27${year}-12-31T00:00:00%27&$$app_token=${token}`
        );
    }
};

export default getMapData;
