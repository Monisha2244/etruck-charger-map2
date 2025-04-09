const map = L.map('map').setView([50, 10], 5); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

fetch("enriched_chargers.json")
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
