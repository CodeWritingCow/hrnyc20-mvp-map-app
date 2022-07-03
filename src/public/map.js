let baseMap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
    {
        attribution: 'NYPD Shooting Incident Data',
        maxZoom: 17,
        minZoom: 1
    });

let openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    });

let baseMaps = {
    "Basemap": baseMap,
    "OpenStreetMap": openStreetMap
}

let nycMap = L.map('map', {
    layers: [baseMap]
}).setView([40.75, -73.98], 11);

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

let homicideMarkers = new L.LayerGroup().addTo(nycMap);
L.control.layers(baseMaps, {"Homicides": homicideMarkers}).addTo(nycMap);

const getHomicidesByYear = function(year) {
    fetch(`/api/homicides/${year}`)
        .then((response) => {
            response.text().then((data) => {
                let crimes = JSON.parse(data);
                crimes.forEach((crime) => {
                    placeMarker(crime);
                });
                updateDeathCount(crimes.length);
                updateYear(year);
            });
        }).catch((err) => {
            console.log(err);
        });
}

let currentYear = new Date().getFullYear();

getHomicidesByYear(currentYear);

// Add dropdown menu for selecting year
let yearDropdown = L.control({position: 'topright'});

yearDropdown.onAdd = function () {
    let div = L.DomUtil.create('div', 'year menu');
    let options = '';
    
    for(let year = currentYear; year >= 2006 ; year--) {
        options += `<option>${year}</option>`
    }
    div.innerHTML = `<select>${options}</select>`;
    div.firstChild.onblclick = L.DomEvent.stopPropagation;
    return div;
}
yearDropdown.addTo(nycMap);

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

const placeMarker = function (crime) {
    L.marker([crime.latitude, crime.longitude], {icon: skullMarker}) 
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
        `)
        .addTo(homicideMarkers);  
}

const updateYear = function(year=Date().split(' ')[3]) {
    document.getElementById('year').textContent = year;
}

const updateDeathCount = function(deathCount) {
    document.getElementById('deathCounter').textContent = deathCount;
}

// Listen to changes in dropdown menu
document.querySelector('select')
        .addEventListener('change', (e) => {
            homicideMarkers.clearLayers(); // clear all map markers 
            getHomicidesByYear(e.target.value);
});