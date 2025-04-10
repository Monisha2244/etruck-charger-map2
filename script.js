// Initialize the Leaflet map
const map = L.map('map').setView([50, 10], 5);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

//
// ✅ Load chargers with clusters (corridor version)
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
          radius: 10,
          fillColor: color,
          color: "#333",
          weight: 2,
          fillOpacity: 1
        }).bindPopup(`
          <strong>${feature.properties.title || "Unnamed Charger"}</strong><br/>
          Country: ${feature.properties.country || "N/A"}<br/>
          Highway: ${feature.properties.nearest_highway || "Unknown"}<br/>
          Cluster: ${feature.properties.cluster || "N/A"}<br/>
          Corridor: ${corridor}
        `);
      }
    }).addTo(map);
  })
  .catch(err => console.error("Failed to load corridor geojson:", err));

//
// 🎨 Color assignment for corridor clusters
//
function getColorByCorridor(corridor) {
  const colors = [
    "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728",
    "#9467bd", "#8c564b", "#e377c2", "#7f7f7f",
    "#bcbd22", "#17becf"
  ];
  if (corridor === "Unclustered") return "#999";
  if (typeof corridor === "number") return colors[corridor % colors.length];
  return "#000";
}
