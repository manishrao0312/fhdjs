const WEATHER_API_KEY = 'adbbf33300084696a36f6f151a2efe5b'; // Replace with your actual API key
const GEOCODING_API_KEY = '85544dc9fa1c468981f4c789eaa7bdad'; // Replace with your OpenCage Geocoding API key

// Initialize Leaflet map
const map = L.map('map').setView([20, 77], 5); // Center of India

// Load and display tile layers
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Fetch Latitude and Longitude using OpenCage API
async function getCoordinates(location) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${GEOCODING_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length > 0) {
            const latitude = data.results[0].geometry.lat;
            const longitude = data.results[0].geometry.lng;
            console.log('Coordinates:', latitude, longitude);  // Debug log
            return { latitude, longitude };
        } else {
            throw new Error('Location not found');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
}

// Fetch Earthquake Data from USGS
async function getEarthquakeData(latitude, longitude) {
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=${latitude}&longitude=${longitude}&maxradius=100`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Earthquake Data:', data);  // Debug log
        
        if (data.features && data.features.length > 0) {
            const recentEarthquake = data.features[0];
            return recentEarthquake.properties.mag;
        } else {
            return 0;
        }
    } catch (error) {
        console.error('Error fetching earthquake data:', error);
        return 0;
    }
}

// Predict Earthquake Risk based on user-entered location
async function predictEarthquakeRisk(location) {
    const earthquakeDiv = document.getElementById('earthquake-prediction-result');
    
    const coordinates = await getCoordinates(location);
    if (coordinates) {
        const { latitude, longitude } = coordinates;
        const earthquakeMagnitude = await getEarthquakeData(latitude, longitude);

        if (earthquakeMagnitude >= 6) {
            earthquakeDiv.innerText = `Earthquake risk for ${location}: High Risk (Magnitude ${earthquakeMagnitude} detected nearby).`;
        } else if (earthquakeMagnitude > 0) {
            earthquakeDiv.innerText = `Earthquake risk for ${location}: Medium Risk (Smaller earthquake detected).`;
        } else {
            earthquakeDiv.innerText = `Earthquake risk for ${location}: Low Risk (No recent earthquakes detected).`;
        }
    } else {
        earthquakeDiv.innerText = 'Unable to determine location coordinates.';
    }
}

// Predict Flood Risk (Dummy Prediction for Now)
async function predictFloodRisk(location) {
    const floodDiv = document.getElementById('flood-prediction-result');
    
    const coordinates = await getCoordinates(location);
    if (coordinates) {
        // This is a placeholder logic for flood risk prediction.
        const floodRisk = Math.random() * 100;  // Random value between 0 and 100
        
        if (floodRisk > 80) {
            floodDiv.innerText = `Flood risk for ${location}: High Risk (Floods detected in surrounding areas).`;
        } else if (floodRisk > 50) {
            floodDiv.innerText = `Flood risk for ${location}: Medium Risk (Moderate flood risk).`;
        } else {
            floodDiv.innerText = `Flood risk for ${location}: Low Risk (No significant flood risk).`;
        }
    } else {
        floodDiv.innerText = 'Unable to determine location coordinates.';
    }
}

// Predict Tsunami Risk (Dummy Prediction for Now)
async function predictTsunamiRisk(location) {
    const tsunamiDiv = document.getElementById('tsunami-prediction-result');
    
    const coordinates = await getCoordinates(location);
    if (coordinates) {
        // This is a placeholder logic for tsunami risk prediction.
        const tsunamiRisk = Math.random() * 100;  // Random value between 0 and 100
        
        if (tsunamiRisk > 80) {
            tsunamiDiv.innerText = `Tsunami risk for ${location}: High Risk (Recent tsunami events detected).`;
        } else if (tsunamiRisk > 50) {
            tsunamiDiv.innerText = `Tsunami risk for ${location}: Medium Risk (Potential risk detected).`;
        } else {
            tsunamiDiv.innerText = `Tsunami risk for ${location}: Low Risk (No significant tsunami risk).`;
        }
    } else {
        tsunamiDiv.innerText = 'Unable to determine location coordinates.';
    }
}

// Predict Tornado Risk (Dummy Prediction for Now)
async function predictTornadoRisk(location) {
    const tornadoDiv = document.getElementById('tornado-prediction-result');
    
    const coordinates = await getCoordinates(location);
    if (coordinates) {
        // This is a placeholder logic for tornado risk prediction.
        const tornadoRisk = Math.random() * 100;  // Random value between 0 and 100
        
        if (tornadoRisk > 80) {
            tornadoDiv.innerText = `Tornado risk for ${location}: High Risk (Tornadoes detected in surrounding areas).`;
        } else if (tornadoRisk > 50) {
            tornadoDiv.innerText = `Tornado risk for ${location}: Medium Risk (Moderate tornado risk).`;
        } else {
            tornadoDiv.innerText = `Tornado risk for ${location}: Low Risk (No significant tornado risk).`;
        }
    } else {
        tornadoDiv.innerText = 'Unable to determine location coordinates.';
    }
}

// Event listeners for each prediction button
document.getElementById('predict-earthquake-btn').addEventListener('click', function() {
    const location = document.getElementById('earthquake-location-input').value.trim();
    if (location === '') {
        alert('Please enter a location for earthquake prediction.');
        return;
    }
    predictEarthquakeRisk(location);
});

document.getElementById('predict-flood-btn').addEventListener('click', function() {
    const location = document.getElementById('flood-location-input').value.trim();
    if (location === '') {
        alert('Please enter a location for flood prediction.');
        return;
    }
    predictFloodRisk(location);
});

document.getElementById('predict-tsunami-btn').addEventListener('click', function() {
    const location = document.getElementById('tsunami-location-input').value.trim();
    if (location === '') {
        alert('Please enter a location for tsunami prediction.');
        return;
    }
    predictTsunamiRisk(location);
});

document.getElementById('predict-tornado-btn').addEventListener('click', function() {
    const location = document.getElementById('tornado-location-input').value.trim();
    if (location === '') {
        alert('Please enter a location for tornado prediction.');
        return;
    }
    predictTornadoRisk(location);
});
