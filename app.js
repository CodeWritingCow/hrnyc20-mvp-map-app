let nycMap = L.map('map').setView([40.75, -73.98], 11);

let gunIcon = L.icon({
    iconUrl: 'gun.png',
    iconSize: [24, 24]
});

let skullMarker = L.ExtraMarkers.icon({
    icon: 'fa-skull-crossbones',
    markerColor: 'black',
    shape: 'circle',
    prefix: 'fa'
});

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
{
    attribution: 'NYPD Shooting Incident Data',
    maxZoom: 17,
    minZoom: 1
    }).addTo(nycMap);

let nypdData;

fetch('https://data.cityofnewyork.us/resource/5ucz-vwe8.json?statistical_murder_flag=true')
    .then((res) => {
        return res.json();
    })
    .then((myJson) => {
        nypdData = JSON.stringify(myJson);
        myJson.forEach((crime) => {
            // L.marker([crime.latitude, crime.longitude], {icon: gunIcon}) 
            L.marker([crime.latitude, crime.longitude], {icon: skullMarker}) 
            // L.marker([crime.latitude, crime.longitude]) // Replace with code above to show guns as map markers
                .addTo(nycMap)
                .bindPopup(`
                <h3>${crime.occur_date}</h3>
                <hr/>
                <h5>${crime.occur_time}</h5>
                <h5>${crime.boro}</h5>
                <p>${crime.location_desc || ''}</p>
                <h5>Victim</h5>
                <p>Sex: ${getGender(crime.vic_sex)}</p>
                <p>Age: ${crime.vic_age_group}</p>
                <p>Race: ${crime.vic_race}</p>
                <h5>Suspect</h5>
                <p>Sex: ${getGender(crime.perp_sex)}</p>
                <p>Age: ${crime.perp_age_group || 'Unknown'}</p>
                <p>Race: ${crime.perp_race || 'Unknown'}</p>                        
                `);                    
        });
        // console.log('Total murders by gun, 2018:', myJson.length);
        document.getElementById('deathCounter').textContent = JSON.parse(nypdData).length;
});

let getGender = function (gender) {
    if (!gender) {
        return 'Unknown';
    }
    if (gender === 'M') {
        return 'Male';
    } 
    if (gender === 'F') {
        return 'Female';
    }
}