// Initialize the map
const map = L.map('map').setView([50, 10], 5);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

//
// 🔵 Load default charger markers (from chargers_with_highways.json)
//
fetch("chargers_with_highways.json")
  .then(response => response.json())
  .then(data => {
    data.forEach(charger => {
      const marker = L.marker([charger.lat, charger.lon]).addTo(map);
      const popupText = `
        <strong>${charger.title}</strong><br/>
        Cluster: ${charger.cluster}<br/>
        Country: ${charger.country || "N/A"}<br/>
        Highway: ${charger.nearest_highway || "Unknown"}<br/>
        Corridor: ${charger.corridor || "TBD"}
      `;
      marker.bindPopup(popupText);
    });
  });

//
// 🟠 Load clustered corridor chargers (from chargers_with_corridors.geojson)
//
fetch('data/chargers_with_corridors.geojson')
  .then(res => res.json())
  .then(data => {
    console.log("Loaded clustered chargers:", data.features.length);

    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        const corridor = feature.properties.corridor;
        const color = getColorByCorridor(corridor);

        return L.circleMarker(latlng, {
          radius: 10,           // Bigger marker
          fillColor: color,     // Fill color based on corridor
          color: "#333",        // Border color
          weight: 2,
          fillOpacity: 1
        }).bindPopup(`
          <strong>Clustered Charger</strong><br/>
          Corridor: ${corridor}<br/>
          Lat: ${latlng.lat.toFixed(4)}, Lon: ${latlng.lng.toFixed(4)}
        `);
      }
    }).addTo(map);
  })
  .catch(err => console.error("Failed to load corridor geojson:", err));

//
// 🎨 Color function for corridor clusters
//
function getColorByCorridor(corridor) {
  const colors = [
    "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728",
    "#9467bd", "#8c564b", "#e377c2", "#7f7f7f",
    "#bcbd22", "#17becf"
  ];
  if (corridor === "Unclustered") return "#999";
  if (typeof corridor === "number") return colors[corridor % colors.length];
  return "#000"; // fallback color
}
