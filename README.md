![NYC Gun Homicide Map Screenshot](https://github.com/CodeWritingCow/hrnyc20-mvp-map-app/blob/master/screenshot.gif)


# NYC Gun Homicide Map
This repository contains the source for a Leaflet.js [map](https://nyc-gun-homicide-map.herokuapp.com/) displaying locations of gun homicides in New York City for the current year.

Each map marker contains an incident date, location and demographic information of victim and suspect. Data comes from an NYPD dataset on shooting incidents.

A dropdown menu allows users to display gun homicides by year (2006 to present).

The repository also contains the code for a Node.js server, which fetches incident data from the Socrata Open Data API. The server then returns the data to the map. The live server is hosted on Heroku.

This map was a MVP project for Hack Reactor NYC Cohort 20.

## Requirements

#### External API Key

- This project uses Socrata Open Data API to access the city's dataset. To get an API key, visit: https://dev.socrata.com/docs/app-tokens.html
- A Socrata account is required to get an API key. To open an account, sign up: https://opendata.socrata.com/signup

#### Key Dependencies

- [Node.js](https://nodejs.org/en/) with [Express.js](https://expressjs.com/) web framework
- [Leaflet.js](https://leafletjs.com/) library for mobile-friendly interactive maps

## TODO
- When user clicks a marker, the app displays URLs to news stories related to the incident.

## Author
**Gary Pang** - [garypang.dev](https://garypang.dev)

## References
- [NYPD Shooting Incident Data (Year To Date) Public Safety](https://data.cityofnewyork.us/Public-Safety/NYPD-Shooting-Incident-Data-Year-To-Date-/5ucz-vwe8) from NYPD and [NYC Open Data](https://opendata.cityofnewyork.us/)
- [Socrata Open Data API documentation](https://dev.socrata.com/)
