// Main JavaScript file for Electric Truck Charging Sites Map
let map;
let markersLayer;
let allSites = [];

// Route color mapping for all 24 corridors
const routeColors = {
    'Delhi-Mumbai': '#e74c3c',
    'Delhi-Kolkata': '#3498db',
    'Mumbai-Chennai': '#2ecc71',
    'Chennai-Kolkata': '#f39c12',
    'Delhi-Chennai': '#9b59b6',
    'Mumbai-Kolkata': '#e67e22',
    'Ahmedabad-Chennai': '#1abc9c',
    'Delhi-Bangalore': '#34495e',
    'Pune-Hyderabad': '#8e44ad',
    'Kolkata-Mumbai': '#16a085',
    'Chennai-Ahmedabad': '#c0392b',
    'Bangalore-Delhi': '#2980b9',
    'Hyderabad-Pune': '#27ae60',
    'Kochi-Bangalore': '#d35400',
    'Coimbatore-Chennai': '#7f8c8d',
    'Surat-Delhi': '#e74c3c',
    'Indore-Mumbai': '#3498db',
    'Lucknow-Delhi': '#2ecc71',
    'Jaipur-Ahmedabad': '#f39c12',
    'Chandigarh-Delhi': '#9b59b6',
    'Bhubaneswar-Kolkata': '#e67e22',
    'Vijayawada-Chennai': '#1abc9c',
    'Nashik-Pune': '#34495e',
    'Vadodara-Surat': '#8e44ad',
    'default': '#95a5a6'
};

// Complete data for all 120 charging sites across 24 corridors
const chargingSitesData = [
    // Route 1: Delhi-Mumbai Corridor
    {
        route: "Delhi-Mumbai",
        siteName: "Gurgaon Logistics Hub",
        siteCoords: "28.4595, 77.0266",
        distanceToHighway: 2.5,
        nearestSubstation: "Gurgaon 220kV Substation",
        substationCoords: "28.4601, 77.0298",
        industrialZone: "IMT Manesar",
        industrialZoneCoords: "28.3629, 76.9311",
        solarPotential: 25,
        solarSiteCoords: "28.4500, 77.0100",
        windPotential: 15,
        windSiteCoords: "28.4400, 77.0000",
        amenities: "Fuel Station, Restaurant, Rest Area, Maintenance",
        state: "Haryana"
    },
    {
        route: "Delhi-Mumbai",
        siteName: "Rewari Transport Center",
        siteCoords: "28.1895, 76.6066",
        distanceToHighway: 1.8,
        nearestSubstation: "Rewari 132kV Substation",
        substationCoords: "28.1920, 76.6100",
        industrialZone: "Rewari Industrial Area",
        industrialZoneCoords: "28.1800, 76.5900",
        solarPotential: 30,
        solarSiteCoords: "28.1700, 76.5800",
        windPotential: 20,
        windSiteCoords: "28.1600, 76.5700",
        amenities: "Dhaba, Truck Parking, Basic Repair",
        state: "Haryana"
    },
    {
        route: "Delhi-Mumbai",
        siteName: "Jaipur Freight Terminal",
        siteCoords: "26.9124, 75.7873",
        distanceToHighway: 3.2,
        nearestSubstation: "Jaipur 400kV Substation",
        substationCoords: "26.9200, 75.8000",
        industrialZone: "Sitapura Industrial Area",
        industrialZoneCoords: "26.8500, 75.8200",
        solarPotential: 35,
        solarSiteCoords: "26.9000, 75.7500",
        windPotential: 25,
        windSiteCoords: "26.8800, 75.7300",
        amenities: "Hotel, Restaurant, Fuel Station, Workshop",
        state: "Rajasthan"
    },
    {
        route: "Delhi-Mumbai",
        siteName: "Udaipur Logistics Park",
        siteCoords: "24.5854, 73.7125",
        distanceToHighway: 2.1,
        nearestSubstation: "Udaipur 220kV Substation",
        substationCoords: "24.5900, 73.7200",
        industrialZone: "Udaipur Industrial Area",
        industrialZoneCoords: "24.5700, 73.7000",
        solarPotential: 40,
        solarSiteCoords: "24.5600, 73.6800",
        windPotential: 30,
        windSiteCoords: "24.5500, 73.6600",
        amenities: "Rest Area, Canteen, Parking, Medical",
        state: "Rajasthan"
    },
    {
        route: "Delhi-Mumbai",
        siteName: "Ahmedabad Transport Hub",
        siteCoords: "23.0225, 72.5714",
        distanceToHighway: 1.5,
        nearestSubstation: "Ahmedabad 400kV Substation",
        substationCoords: "23.0300, 72.5800",
        industrialZone: "Naroda Industrial Estate",
        industrialZoneCoords: "23.0700, 72.6200",
        solarPotential: 45,
        solarSiteCoords: "23.0100, 72.5500",
        windPotential: 35,
        windSiteCoords: "23.0000, 72.5300",
        amenities: "Hotel, Restaurant, Fuel, Maintenance, ATM",
        state: "Gujarat"
    },

    // Route 2: Delhi-Kolkata Corridor
    {
        route: "Delhi-Kolkata",
        siteName: "Ghaziabad Industrial Hub",
        siteCoords: "28.6692, 77.4538",
        distanceToHighway: 2.0,
        nearestSubstation: "Ghaziabad 220kV Substation",
        substationCoords: "28.6750, 77.4600",
        industrialZone: "Ghaziabad Industrial Area",
        industrialZoneCoords: "28.6500, 77.4300",
        solarPotential: 22,
        solarSiteCoords: "28.6600, 77.4200",
        windPotential: 12,
        windSiteCoords: "28.6400, 77.4100",
        amenities: "Fuel Station, Restaurant, Parking",
        state: "Uttar Pradesh"
    },
    {
        route: "Delhi-Kolkata",
        siteName: "Kanpur Logistics Center",
        siteCoords: "26.4499, 80.3319",
        distanceToHighway: 2.8,
        nearestSubstation: "Kanpur 400kV Substation",
        substationCoords: "26.4600, 80.3400",
        industrialZone: "Panki Industrial Area",
        industrialZoneCoords: "26.4200, 80.3100",
        solarPotential: 28,
        solarSiteCoords: "26.4300, 80.3000",
        windPotential: 18,
        windSiteCoords: "26.4100, 80.2900",
        amenities: "Hotel, Dhaba, Workshop, Medical",
        state: "Uttar Pradesh"
    },
    {
        route: "Delhi-Kolkata",
        siteName: "Allahabad Transport Terminal",
        siteCoords: "25.4358, 81.8463",
        distanceToHighway: 1.9,
        nearestSubstation: "Allahabad 220kV Substation",
        substationCoords: "25.4400, 81.8500",
        industrialZone: "Naini Industrial Area",
        industrialZoneCoords: "25.4100, 81.8200",
        solarPotential: 32,
        solarSiteCoords: "25.4200, 81.8100",
        windPotential: 20,
        windSiteCoords: "25.4000, 81.8000",
        amenities: "Restaurant, Fuel, Rest Area, ATM",
        state: "Uttar Pradesh"
    },
    {
        route: "Delhi-Kolkata",
        siteName: "Patna Freight Hub",
        siteCoords: "25.5941, 85.1376",
        distanceToHighway: 3.5,
        nearestSubstation: "Patna 400kV Substation",
        substationCoords: "25.6000, 85.1500",
        industrialZone: "Hajipur Industrial Area",
        industrialZoneCoords: "25.6800, 85.2100",
        solarPotential: 26,
        solarSiteCoords: "25.5800, 85.1200",
        windPotential: 16,
        windSiteCoords: "25.5700, 85.1100",
        amenities: "Hotel, Restaurant, Parking, Repair",
        state: "Bihar"
    },
    {
        route: "Delhi-Kolkata",
        siteName: "Durgapur Steel City Hub",
        siteCoords: "23.5204, 87.3119",
        distanceToHighway: 2.2,
        nearestSubstation: "Durgapur 400kV Substation",
        substationCoords: "23.5300, 87.3200",
        industrialZone: "Durgapur Steel Plant Area",
        industrialZoneCoords: "23.5100, 87.3000",
        solarPotential: 24,
        solarSiteCoords: "23.5000, 87.2900",
        windPotential: 14,
        windSiteCoords: "23.4900, 87.2800",
        amenities: "Canteen, Fuel, Workshop, Medical",
        state: "West Bengal"
    },

    // Route 3: Mumbai-Chennai Corridor
    {
        route: "Mumbai-Chennai",
        siteName: "Pune Logistics Park",
        siteCoords: "18.5204, 73.8567",
        distanceToHighway: 1.8,
        nearestSubstation: "Pune 400kV Substation",
        substationCoords: "18.5300, 73.8650",
        industrialZone: "Pimpri-Chinchwad Industrial Area",
        industrialZoneCoords: "18.6200, 73.8000",
        solarPotential: 38,
        solarSiteCoords: "18.5100, 73.8400",
        windPotential: 28,
        windSiteCoords: "18.5000, 73.8300",
        amenities: "Hotel, Restaurant, Fuel, Maintenance",
        state: "Maharashtra"
    },
    {
        route: "Mumbai-Chennai",
        siteName: "Solapur Transport Center",
        siteCoords: "17.6599, 75.9064",
        distanceToHighway: 2.5,
        nearestSubstation: "Solapur 220kV Substation",
        substationCoords: "17.6700, 75.9150",
        industrialZone: "Solapur Industrial Estate",
        industrialZoneCoords: "17.6400, 75.8900",
        solarPotential: 42,
        solarSiteCoords: "17.6300, 75.8800",
        windPotential: 32,
        windSiteCoords: "17.6200, 75.8700",
        amenities: "Dhaba, Parking, Basic Repair, ATM",
        state: "Maharashtra"
    },
    {
        route: "Mumbai-Chennai",
        siteName: "Belgaum Freight Terminal",
        siteCoords: "15.8497, 74.4977",
        distanceToHighway: 3.1,
        nearestSubstation: "Belgaum 220kV Substation",
        substationCoords: "15.8600, 74.5100",
        industrialZone: "Belgaum Industrial Area",
        industrialZoneCoords: "15.8300, 74.4800",
        solarPotential: 40,
        solarSiteCoords: "15.8200, 74.4700",
        windPotential: 30,
        windSiteCoords: "15.8100, 74.4600",
        amenities: "Restaurant, Fuel, Rest Area, Medical",
        state: "Karnataka"
    },
    {
        route: "Mumbai-Chennai",
        siteName: "Bangalore Logistics Hub",
        siteCoords: "12.9716, 77.5946",
        distanceToHighway: 2.0,
        nearestSubstation: "Bangalore 400kV Substation",
        substationCoords: "12.9800, 77.6000",
        industrialZone: "Electronic City",
        industrialZoneCoords: "12.8400, 77.6600",
        solarPotential: 35,
        solarSiteCoords: "12.9600, 77.5800",
        windPotential: 25,
        windSiteCoords: "12.9500, 77.5700",
        amenities: "Hotel, Restaurant, Fuel, Workshop, ATM",
        state: "Karnataka"
    },
    {
        route: "Mumbai-Chennai",
        siteName: "Vellore Transport Park",
        siteCoords: "12.9165, 79.1325",
        distanceToHighway: 1.7,
        nearestSubstation: "Vellore 220kV Substation",
        substationCoords: "12.9250, 79.1400",
        industrialZone: "Ranipet Industrial Area",
        industrialZoneCoords: "12.9500, 79.3300",
        solarPotential: 45,
        solarSiteCoords: "12.9000, 79.1200",
        windPotential: 35,
        windSiteCoords: "12.8900, 79.1100",
        amenities: "Canteen, Fuel, Parking, Repair",
        state: "Tamil Nadu"
    },

    // Route 4: Chennai-Kolkata Corridor
    {
        route: "Chennai-Kolkata",
        siteName: "Nellore Logistics Center",
        siteCoords: "14.4426, 79.9865",
        distanceToHighway: 2.3,
        nearestSubstation: "Nellore 220kV Substation",
        substationCoords: "14.4500, 79.9950",
        industrialZone: "Nellore Industrial Park",
        industrialZoneCoords: "14.4200, 79.9700",
        solarPotential: 48,
        solarSiteCoords: "14.4300, 79.9600",
        windPotential: 38,
        windSiteCoords: "14.4100, 79.9500",
        amenities: "Restaurant, Fuel, Rest Area, Medical",
        state: "Andhra Pradesh"
    },
    {
        route: "Chennai-Kolkata",
        siteName: "Visakhapatnam Port Hub",
        siteCoords: "17.6868, 83.2185",
        distanceToHighway: 1.5,
        nearestSubstation: "Visakhapatnam 400kV Substation",
        substationCoords: "17.6950, 83.2250",
        industrialZone: "Visakhapatnam Steel Plant Area",
        industrialZoneCoords: "17.6500, 83.2000",
        solarPotential: 42,
        solarSiteCoords: "17.6700, 83.2100",
        windPotential: 45,
        windSiteCoords: "17.6600, 83.2000",
        amenities: "Hotel, Restaurant, Fuel, Workshop, ATM",
        state: "Andhra Pradesh"
    },
    {
        route: "Chennai-Kolkata",
        siteName: "Bhubaneswar Transport Terminal",
        siteCoords: "20.2961, 85.8245",
        distanceToHighway: 2.8,
        nearestSubstation: "Bhubaneswar 400kV Substation",
        substationCoords: "20.3050, 85.8350",
        industrialZone: "Mancheswar Industrial Estate",
        industrialZoneCoords: "20.2700, 85.8100",
        solarPotential: 36,
        solarSiteCoords: "20.2800, 85.8000",
        windPotential: 28,
        windSiteCoords: "20.2700, 85.7900",
        amenities: "Dhaba, Parking, Basic Repair, Medical",
        state: "Odisha"
    },
    {
        route: "Chennai-Kolkata",
        siteName: "Cuttack Freight Hub",
        siteCoords: "20.4625, 85.8828",
        distanceToHighway: 2.1,
        nearestSubstation: "Cuttack 220kV Substation",
        substationCoords: "20.4700, 85.8900",
        industrialZone: "Cuttack Industrial Area",
        industrialZoneCoords: "20.4400, 85.8600",
        solarPotential: 34,
        solarSiteCoords: "20.4500, 85.8500",
        windPotential: 26,
        windSiteCoords: "20.4300, 85.8400",
        amenities: "Restaurant, Fuel, Rest Area, ATM",
        state: "Odisha"
    },
    {
        route: "Chennai-Kolkata",
        siteName: "Kharagpur Junction Hub",
        siteCoords: "22.3460, 87.2320",
        distanceToHighway: 1.9,
        nearestSubstation: "Kharagpur 132kV Substation",
        substationCoords: "22.3550, 87.2400",
        industrialZone: "Kharagpur Industrial Area",
        industrialZoneCoords: "22.3300, 87.2200",
        solarPotential: 28,
        solarSiteCoords: "22.3200, 87.2100",
        windPotential: 20,
        windSiteCoords: "22.3100, 87.2000",
        amenities: "Hotel, Canteen, Fuel, Workshop",
        state: "West Bengal"
    },

    // Route 5: Delhi-Chennai Corridor
    {
        route: "Delhi-Chennai",
        siteName: "Agra Transport Center",
        siteCoords: "27.1767, 78.0081",
        distanceToHighway: 2.4,
        nearestSubstation: "Agra 220kV Substation",
        substationCoords: "27.1850, 78.0150",
        industrialZone: "Agra Industrial Area",
        industrialZoneCoords: "27.1600, 77.9900",
        solarPotential: 30,
        solarSiteCoords: "27.1500, 77.9800",
        windPotential: 20,
        windSiteCoords: "27.1400, 77.9700",
        amenities: "Restaurant, Fuel, Parking, Medical",
        state: "Uttar Pradesh"
    },
    {
        route: "Delhi-Chennai",
        siteName: "Gwalior Logistics Hub",
        siteCoords: "26.2183, 78.1828",
        distanceToHighway: 3.0,
        nearestSubstation: "Gwalior 400kV Substation",
        substationCoords: "26.2300, 78.1950",
        industrialZone: "Gwalior Industrial Area",
        industrialZoneCoords: "26.2000, 78.1600",
        solarPotential: 32,
        solarSiteCoords: "26.1900, 78.1500",
        windPotential: 22,
        windSiteCoords: "26.1800, 78.1400",
        amenities: "Hotel, Dhaba, Workshop, ATM",
        state: "Madhya Pradesh"
    },
    {
        route: "Delhi-Chennai",
        siteName: "Bhopal Freight Terminal",
        siteCoords: "23.2599, 77.4126",
        distanceToHighway: 2.2,
        nearestSubstation: "Bhopal 400kV Substation",
        substationCoords: "23.2700, 77.4250",
        industrialZone: "Mandideep Industrial Area",
        industrialZoneCoords: "23.0800, 77.5300",
        solarPotential: 38,
        solarSiteCoords: "23.2400, 77.3900",
        windPotential: 28,
        windSiteCoords: "23.2300, 77.3800",
        amenities: "Restaurant, Fuel, Rest Area, Repair",
        state: "Madhya Pradesh"
    },
    {
        route: "Delhi-Chennai",
        siteName: "Nagpur Central Hub",
        siteCoords: "21.1458, 79.0882",
        distanceToHighway: 1.8,
        nearestSubstation: "Nagpur 400kV Substation",
        substationCoords: "21.1550, 79.0950",
        industrialZone: "Butibori Industrial Area",
        industrialZoneCoords: "21.2300, 79.0000",
        solarPotential: 40,
        solarSiteCoords: "21.1300, 79.0700",
        windPotential: 30,
        windSiteCoords: "21.1200, 79.0600",
        amenities: "Hotel, Restaurant, Fuel, Workshop, Medical",
        state: "Maharashtra"
    },
    {
        route: "Delhi-Chennai",
        siteName: "Hyderabad Logistics Park",
        siteCoords: "17.3850, 78.4867",
        distanceToHighway: 2.5,
        nearestSubstation: "Hyderabad 400kV Substation",
        substationCoords: "17.3950, 78.4950",
        industrialZone: "Genome Valley",
        industrialZoneCoords: "17.5000, 78.2700",
        solarPotential: 45,
        solarSiteCoords: "17.3700, 78.4700",
        windPotential: 35,
        windSiteCoords: "17.3600, 78.4600",
        amenities: "Hotel, Restaurant, Fuel, Maintenance, ATM",
        state: "Telangana"
    },

    // Route 6: Mumbai-Kolkata Corridor
    {
        route: "Mumbai-Kolkata",
        siteName: "Nashik Transport Hub",
        siteCoords: "19.9975, 73.7898",
        distanceToHighway: 2.1,
        nearestSubstation: "Nashik 220kV Substation",
        substationCoords: "20.0050, 73.8000",
        industrialZone: "Ambad Industrial Area",
        industrialZoneCoords: "19.9800, 73.7600",
        solarPotential: 36,
        solarSiteCoords: "19.9900, 73.7700",
        windPotential: 26,
        windSiteCoords: "19.9850, 73.7650",
        amenities: "Hotel, Restaurant, Fuel, Workshop",
        state: "Maharashtra"
    },
    {
        route: "Mumbai-Kolkata",
        siteName: "Raipur Logistics Center",
        siteCoords: "21.2514, 81.6296",
        distanceToHighway: 2.8,
        nearestSubstation: "Raipur 400kV Substation",
        substationCoords: "21.2600, 81.6400",
        industrialZone: "Urla Industrial Complex",
        industrialZoneCoords: "21.2300, 81.6100",
        solarPotential: 38,
        solarSiteCoords: "21.2400, 81.6200",
        windPotential: 28,
        windSiteCoords: "21.2350, 81.6150",
        amenities: "Dhaba, Parking, Basic Repair, Medical",
        state: "Chhattisgarh"
    },
    {
        route: "Mumbai-Kolkata",
        siteName: "Ranchi Industrial Hub",
        siteCoords: "23.3441, 85.3096",
        distanceToHighway: 3.2,
        nearestSubstation: "Ranchi 220kV Substation",
        substationCoords: "23.3550, 85.3200",
        industrialZone: "Ranchi Industrial Area",
        industrialZoneCoords: "23.3300, 85.2900",
        solarPotential: 30,
        solarSiteCoords: "23.3200, 85.2800",
        windPotential: 20,
        windSiteCoords: "23.3150, 85.2750",
        amenities: "Restaurant, Fuel, Rest Area, ATM",
        state: "Jharkhand"
    },
    {
        route: "Mumbai-Kolkata",
        siteName: "Jamshedpur Steel Hub",
        siteCoords: "22.8046, 86.2029",
        distanceToHighway: 1.9,
        nearestSubstation: "Jamshedpur 400kV Substation",
        substationCoords: "22.8150, 86.2150",
        industrialZone: "Adityapur Industrial Area",
        industrialZoneCoords: "22.7900, 86.1800",
        solarPotential: 32,
        solarSiteCoords: "22.7800, 86.1700",
        windPotential: 22,
        windSiteCoords: "22.7750, 86.1650",
        amenities: "Hotel, Canteen, Fuel, Workshop, Medical",
        state: "Jharkhand"
    },
    {
        route: "Mumbai-Kolkata",
        siteName: "Asansol Transport Terminal",
        siteCoords: "23.6739, 86.9524",
        distanceToHighway: 2.4,
        nearestSubstation: "Asansol 220kV Substation",
        substationCoords: "23.6850, 86.9650",
        industrialZone: "Burnpur Industrial Area",
        industrialZoneCoords: "23.6600, 86.9300",
        solarPotential: 28,
        solarSiteCoords: "23.6500, 86.9200",
        windPotential: 18,
        windSiteCoords: "23.6450, 86.9150",
        amenities: "Restaurant, Fuel, Parking, Repair",
        state: "West Bengal"
    },

    // Route 7: Ahmedabad-Chennai Corridor
    {
        route: "Ahmedabad-Chennai",
        siteName: "Surat Diamond Hub",
        siteCoords: "21.1702, 72.8311",
        distanceToHighway: 1.6,
        nearestSubstation: "Surat 400kV Substation",
        substationCoords: "21.1800, 72.8400",
        industrialZone: "Hazira Industrial Area",
        industrialZoneCoords: "21.1000, 72.6500",
        solarPotential: 44,
        solarSiteCoords: "21.1600, 72.8200",
        windPotential: 34,
        windSiteCoords: "21.1550, 72.8150",
        amenities: "Hotel, Restaurant, Fuel, Maintenance, ATM",
        state: "Gujarat"
    },
    {
        route: "Ahmedabad-Chennai",
        siteName: "Mumbai Port Logistics",
        siteCoords: "19.0760, 72.8777",
        distanceToHighway: 2.3,
        nearestSubstation: "Mumbai 400kV Substation",
        substationCoords: "19.0850, 72.8850",
        industrialZone: "MIDC Andheri",
        industrialZoneCoords: "19.1200, 72.8500",
        solarPotential: 35,
        solarSiteCoords: "19.0700, 72.8700",
        windPotential: 25,
        windSiteCoords: "19.0650, 72.8650",
        amenities: "Hotel, Restaurant, Fuel, Workshop, Medical",
        state: "Maharashtra"
    },
    {
        route: "Ahmedabad-Chennai",
        siteName: "Hubli Transport Center",
        siteCoords: "15.3647, 75.1240",
        distanceToHighway: 2.7,
        nearestSubstation: "Hubli 220kV Substation",
        substationCoords: "15.3750, 75.1350",
        industrialZone: "Hubli Industrial Estate",
        industrialZoneCoords: "15.3500, 75.1100",
        solarPotential: 41,
        solarSiteCoords: "15.3400, 75.1000",
        windPotential: 31,
        windSiteCoords: "15.3350, 75.0950",
        amenities: "Dhaba, Parking, Basic Repair, ATM",
        state: "Karnataka"
    },
    {
        route: "Ahmedabad-Chennai",
        siteName: "Mysore Logistics Park",
        siteCoords: "12.2958, 76.6394",
        distanceToHighway: 2.0,
        nearestSubstation: "Mysore 220kV Substation",
        substationCoords: "12.3050, 76.6500",
        industrialZone: "Mysore Industrial Area",
        industrialZoneCoords: "12.2800, 76.6200",
        solarPotential: 37,
        solarSiteCoords: "12.2700, 76.6100",
        windPotential: 27,
        windSiteCoords: "12.2650, 76.6050",
        amenities: "Restaurant, Fuel, Rest Area, Medical",
        state: "Karnataka"
    },
    {
        route: "Ahmedabad-Chennai",
        siteName: "Salem Steel Hub",
        siteCoords: "11.6643, 78.1460",
        distanceToHighway: 1.8,
        nearestSubstation: "Salem 400kV Substation",
        substationCoords: "11.6750, 78.1550",
        industrialZone: "Salem Steel Plant Area",
        industrialZoneCoords: "11.6500, 78.1300",
        solarPotential: 46,
        solarSiteCoords: "11.6400, 78.1200",
        windPotential: 36,
        windSiteCoords: "11.6350, 78.1150",
        amenities: "Hotel, Canteen, Fuel, Workshop, ATM",
        state: "Tamil Nadu"
    },

    // Route 8: Delhi-Bangalore Corridor
    {
        route: "Delhi-Bangalore",
        siteName: "Mathura Refinery Hub",
        siteCoords: "27.4924, 77.6737",
        distanceToHighway: 2.2,
        nearestSubstation: "Mathura 220kV Substation",
        substationCoords: "27.5000, 77.6800",
        industrialZone: "Mathura Refinery Complex",
        industrialZoneCoords: "27.4800, 77.6600",
        solarPotential: 31,
        solarSiteCoords: "27.4700, 77.6500",
        windPotential: 21,
        windSiteCoords: "27.4650, 77.6450",
        amenities: "Restaurant, Fuel, Parking, Medical",
        state: "Uttar Pradesh"
    },
    {
        route: "Delhi-Bangalore",
        siteName: "Kota Industrial Hub",
        siteCoords: "25.2138, 75.8648",
        distanceToHighway: 2.9,
        nearestSubstation: "Kota 400kV Substation",
        substationCoords: "25.2250, 75.8750",
        industrialZone: "Kota Industrial Area",
        industrialZoneCoords: "25.2000, 75.8500",
        solarPotential: 39,
        solarSiteCoords: "25.1900, 75.8400",
        windPotential: 29,
        windSiteCoords: "25.1850, 75.8350",
        amenities: "Hotel, Dhaba, Workshop, ATM",
        state: "Rajasthan"
    },
    {
        route: "Delhi-Bangalore",
        siteName: "Aurangabad Transport Center",
        siteCoords: "19.8762, 75.3433",
        distanceToHighway: 2.5,
        nearestSubstation: "Aurangabad 220kV Substation",
        substationCoords: "19.8850, 75.3550",
        industrialZone: "Aurangabad Industrial City",
        industrialZoneCoords: "19.8600, 75.3200",
        solarPotential: 40,
        solarSiteCoords: "19.8500, 75.3100",
        windPotential: 30,
        windSiteCoords: "19.8450, 75.3050",
        amenities: "Restaurant, Fuel, Rest Area, Repair",
        state: "Maharashtra"
    },
    {
        route: "Delhi-Bangalore",
        siteName: "Gulbarga Logistics Park",
        siteCoords: "17.3297, 76.8343",
        distanceToHighway: 2.1,
        nearestSubstation: "Gulbarga 220kV Substation",
        substationCoords: "17.3400, 76.8450",
        industrialZone: "Gulbarga Industrial Area",
        industrialZoneCoords: "17.3150, 76.8200",
        solarPotential: 43,
        solarSiteCoords: "17.3050, 76.8100",
        windPotential: 33,
        windSiteCoords: "17.3000, 76.8050",
        amenities: "Hotel, Restaurant, Fuel, Workshop, Medical",
        state: "Karnataka"
    },
    {
        route: "Delhi-Bangalore",
        siteName: "Tumkur Transport Hub",
        siteCoords: "13.3379, 77.1186",
        distanceToHighway: 1.7,
        nearestSubstation: "Tumkur 132kV Substation",
        substationCoords: "13.3450, 77.1250",
        industrialZone: "Tumkur Industrial Area",
        industrialZoneCoords: "13.3250, 77.1050",
        solarPotential: 36,
        solarSiteCoords: "13.3150, 77.0950",
        windPotential: 26,
        windSiteCoords: "13.3100, 77.0900",
        amenities: "Canteen, Fuel, Parking, Repair",
        state: "Karnataka"
    },

    // Route 9: Pune-Hyderabad Corridor
    {
        route: "Pune-Hyderabad",
        siteName: "Satara Transport Center",
        siteCoords: "17.6805, 74.0183",
        distanceToHighway: 2.4,
        nearestSubstation: "Satara 132kV Substation",
        substationCoords: "17.6900, 74.0300",
        industrialZone: "Satara Industrial Estate",
        industrialZoneCoords: "17.6650, 73.9950",
        solarPotential: 38,
        solarSiteCoords: "17.6550, 73.9850",
        windPotential: 28,
        windSiteCoords: "17.6500, 73.9800",
        amenities: "Restaurant, Fuel, Rest Area, Medical",
        state: "Maharashtra"
    },
    {
        route: "Pune-Hyderabad",
        siteName: "Kolhapur Logistics Hub",
        siteCoords: "16.7050, 74.2433",
        distanceToHighway: 2.0,
        nearestSubstation: "Kolhapur 220kV Substation",
        substationCoords: "16.7150, 74.2550",
        industrialZone: "Kolhapur Industrial Area",
        industrialZoneCoords: "16.6900, 74.2200",
        solarPotential: 41,
        solarSiteCoords: "16.6800, 74.2100",
        windPotential: 31,
        windSiteCoords: "16.6750, 74.2050",
        amenities: "Hotel, Restaurant, Fuel, Workshop, ATM",
        state: "Maharashtra"
    },
    {
        route: "Pune-Hyderabad",
        siteName: "Bijapur Transport Terminal",
        siteCoords: "16.8302, 75.7100",
        distanceToHighway: 2.8,
        nearestSubstation: "Bijapur 132kV Substation",
        substationCoords: "16.8400, 75.7200",
        industrialZone: "Bijapur Industrial Area",
        industrialZoneCoords: "16.8150, 75.6900",
        solarPotential: 42,
        solarSiteCoords: "16.8050, 75.6800",
        windPotential: 32,
        windSiteCoords: "16.8000, 75.6750",
        amenities: "Dhaba, Parking, Basic Repair, Medical",
        state: "Karnataka"
    },
    {
        route: "Pune-Hyderabad",
        siteName: "Raichur Power Hub",
        siteCoords: "16.2077, 77.3463",
        distanceToHighway: 2.3,
        nearestSubstation: "Raichur 400kV Substation",
        substationCoords: "16.2200, 77.3600",
        industrialZone: "Raichur Thermal Power Station",
        industrialZoneCoords: "16.1900, 77.3200",
        solarPotential: 45,
        solarSiteCoords: "16.1800, 77.3100",
        windPotential: 35,
        windSiteCoords: "16.1750, 77.3050",
        amenities: "Restaurant, Fuel, Rest Area, ATM",
        state: "Karnataka"
    },
    {
        route: "Pune-Hyderabad",
        siteName: "Mahbubnagar Logistics Center",
        siteCoords: "16.7394, 77.9993",
        distanceToHighway: 1.9,
        nearestSubstation: "Mahbubnagar 220kV Substation",
        substationCoords: "16.7500, 78.0100",
        industrialZone: "Mahbubnagar Industrial Park",
        industrialZoneCoords: "16.7250, 77.9800",
        solarPotential: 44,
        solarSiteCoords: "16.7150, 77.9700",
        windPotential: 34,
        windSiteCoords: "16.7100, 77.9650",
        amenities: "Hotel, Canteen, Fuel, Workshop",
        state: "Telangana"
    },

    // Route 10: Kolkata-Mumbai Corridor
    {
        route: "Kolkata-Mumbai",
        siteName: "Howrah Industrial Hub",
        siteCoords: "22.5958, 88.2636",
        distanceToHighway: 2.1,
        nearestSubstation: "Howrah 220kV Substation",
        substationCoords: "22.6050, 88.2750",
        industrialZone: "Howrah Industrial Area",
        industrialZoneCoords: "22.5800, 88.2400",
        solarPotential: 26,
        solarSiteCoords: "22.5700, 88.2300",
        windPotential: 16,
        windSiteCoords: "22.5650, 88.2250",
        amenities: "Restaurant, Fuel, Parking, Medical",
        state: "West Bengal"
    },
    {
        route: "Kolkata-Mumbai",
        siteName: "Bokaro Steel Hub",
        siteCoords: "23.6693, 86.1511",
        distanceToHighway: 2.7,
        nearestSubstation: "Bokaro 400kV Substation",
        substationCoords: "23.6800, 86.1650",
        industrialZone: "Bokaro Steel Plant Area",
        industrialZoneCoords: "23.6550, 86.1300",
        solarPotential: 29,
        solarSiteCoords: "23.6450, 86.1200",
        windPotential: 19,
        windSiteCoords: "23.6400, 86.1150",
        amenities: "Hotel, Dhaba, Workshop, ATM",
        state: "Jharkhand"
    },
    {
        route: "Kolkata-Mumbai",
        siteName: "Bilaspur Transport Center",
        siteCoords: "22.0797, 82.1409",
        distanceToHighway: 2.4,
        nearestSubstation: "Bilaspur 220kV Substation",
        substationCoords: "22.0900, 82.1550",
        industrialZone: "Bilaspur Industrial Area",
        industrialZoneCoords: "22.0650, 82.1200",
        solarPotential: 35,
        solarSiteCoords: "22.0550, 82.1100",
        windPotential: 25,
        windSiteCoords: "22.0500, 82.1050",
        amenities: "Restaurant, Fuel, Rest Area, Repair",
        state: "Chhattisgarh"
    },
    {
        route: "Kolkata-Mumbai",
        siteName: "Nagpur Junction Hub",
        siteCoords: "21.1458, 79.0882",
        distanceToHighway: 1.8,
        nearestSubstation: "Nagpur 400kV Substation",
        substationCoords: "21.1550, 79.0950",
        industrialZone: "Butibori Industrial Area",
        industrialZoneCoords: "21.2300, 79.0000",
        solarPotential: 40,
        solarSiteCoords: "21.1300, 79.0700",
        windPotential: 30,
        windSiteCoords: "21.1200, 79.0600",
        amenities: "Hotel, Restaurant, Fuel, Workshop, Medical",
        state: "Maharashtra"
    },
    {
        route: "Kolkata-Mumbai",
        siteName: "Akola Logistics Park",
        siteCoords: "20.7002, 77.0082",
        distanceToHighway: 2.2,
        nearestSubstation: "Akola 220kV Substation",
        substationCoords: "20.7150, 77.0200",
        industrialZone: "Akola Industrial Estate",
        industrialZoneCoords: "20.6850, 76.9900",
        solarPotential: 39,
        solarSiteCoords: "20.6750, 76.9800",
        windPotential: 29,
        windSiteCoords: "20.6700, 76.9750",
        amenities: "Canteen, Fuel, Parking, Repair",
        state: "Maharashtra"
    },

    // Route 11: Chennai-Ahmedabad Corridor
    {
        route: "Chennai-Ahmedabad",
        siteName: "Kanchipuram Transport Hub",
        siteCoords: "12.8342, 79.7036",
        distanceToHighway: 2.0,
        nearestSubstation: "Kanchipuram 132kV Substation",
        substationCoords: "12.8450, 79.7150",
        industrialZone: "Kanchipuram Industrial Area",
        industrialZoneCoords: "12.8200, 79.6850",
        solarPotential: 47,
        solarSiteCoords: "12.8100, 79.6750",
        windPotential: 37,
        windSiteCoords: "12.8050, 79.6700",
        amenities: "Restaurant, Fuel, Rest Area, Medical",
        state: "Tamil Nadu"
    },
    {
        route: "Chennai-Ahmedabad",
        siteName: "Tirupati Logistics Center",
        siteCoords: "13.6288, 79.4192",
        distanceToHighway: 2.6,
        nearestSubstation: "Tirupati 220kV Substation",
        substationCoords: "13.6400, 79.4300",
        industrialZone: "Tirupati Industrial Park",
        industrialZoneCoords: "13.6150, 79.4000",
        solarPotential: 45,
        solarSiteCoords: "13.6050, 79.3900",
        windPotential: 35,
        windSiteCoords: "13.6000, 79.3850",
        amenities: "Hotel, Restaurant, Fuel, Workshop, ATM",
        state: "Andhra Pradesh"
    },
    {
        route: "Chennai-Ahmedabad",
        siteName: "Anantapur Transport Terminal",
        siteCoords: "14.6819, 77.6006",
        distanceToHighway: 2.3,
        nearestSubstation: "Anantapur 132kV Substation",
        substationCoords: "14.6950, 77.6150",
        industrialZone: "Anantapur Industrial Area",
        industrialZoneCoords: "14.6650, 77.5800",
        solarPotential: 48,
        solarSiteCoords: "14.6550, 77.5700",
        windPotential: 38,
        windSiteCoords: "14.6500, 77.5650",
        amenities: "Dhaba, Parking, Basic Repair, Medical",
        state: "Andhra Pradesh"
    },
    {
        route: "Chennai-Ahmedabad",
        siteName: "Solapur Junction Hub",
        siteCoords: "17.6599, 75.9064",
        distanceToHighway: 2.5,
        nearestSubstation: "Solapur 220kV Substation",
        substationCoords: "17.6700, 75.9150",
        industrialZone: "Solapur Industrial Estate",
        industrialZoneCoords: "17.6400, 75.8900",
        solarPotential: 42,
        solarSiteCoords: "17.6300, 75.8800",
        windPotential: 32,
        windSiteCoords: "17.6200, 75.8700",
        amenities: "Restaurant, Fuel, Rest Area, ATM",
        state: "Maharashtra"
    },
    {
        route: "Chennai-Ahmedabad",
        siteName: "Vadodara Industrial Hub",
        siteCoords: "22.3072, 73.1812",
        distanceToHighway: 1.9,
        nearestSubstation: "Vadodara 400kV Substation",
        substationCoords: "22.3200, 73.1950",
        industrialZone: "Vadodara Industrial Estate",
        industrialZoneCoords: "22.2900, 73.1600",
        solarPotential: 43,
        solarSiteCoords: "22.2800, 73.1500",
        windPotential: 33,
        windSiteCoords: "22.2750, 73.1450",
        amenities: "Hotel, Canteen, Fuel, Workshop",
        state: "Gujarat"
    },

    // Route 12: Bangalore-Delhi Corridor
    {
        route: "Bangalore-Delhi",
        siteName: "Chitradurga Transport Center",
        siteCoords: "14.2251, 76.3980",
        distanceToHighway: 2.1,
        nearestSubstation: "Chitradurga 132kV Substation",
        substationCoords: "14.2350, 76.4100",
        industrialZone: "Chitradurga Industrial Area",
        industrialZoneCoords: "14.2100, 76.3800",
        solarPotential: 40,
        solarSiteCoords: "14.2000, 76.3700",
        windPotential: 30,
        windSiteCoords: "14.1950, 76.3650",
        amenities: "Restaurant, Fuel, Parking, Medical",
        state: "Karnataka"
    },
    {
        route: "Bangalore-Delhi",
        siteName: "Bellary Mining Hub",
        siteCoords: "15.1394, 76.9214",
        distanceToHighway: 2.8,
        nearestSubstation: "Bellary 220kV Substation",
        substationCoords: "15.1500, 76.9350",
        industrialZone: "Bellary Industrial Area",
        industrialZoneCoords: "15.1250, 76.9000",
        solarPotential: 44,
        solarSiteCoords: "15.1150, 76.8900",
        windPotential: 34,
        windSiteCoords: "15.1100, 76.8850",
        amenities: "Hotel, Dhaba, Workshop, ATM",
        state: "Karnataka"
    },
    {
        route: "Bangalore-Delhi",
        siteName: "Pune Logistics Junction",
        siteCoords: "18.5204, 73.8567",
        distanceToHighway: 1.8,
        nearestSubstation: "Pune 400kV Substation",
        substationCoords: "18.5300, 73.8650",
        industrialZone: "Pimpri-Chinchwad Industrial Area",
        industrialZoneCoords: "18.6200, 73.8000",
        solarPotential: 38,
        solarSiteCoords: "18.5100, 73.8400",
        windPotential: 28,
        windSiteCoords: "18.5000, 73.8300",
        amenities: "Restaurant, Fuel, Rest Area, Repair",
        state: "Maharashtra"
    },
    {
        route: "Bangalore-Delhi",
        siteName: "Indore Central Hub",
        siteCoords: "22.7196, 75.8577",
        distanceToHighway: 2.4,
        nearestSubstation: "Indore 400kV Substation",
        substationCoords: "22.7300, 75.8700",
        industrialZone: "Pithampur Industrial Area",
        industrialZoneCoords: "22.6000, 75.7000",
        solarPotential: 37,
        solarSiteCoords: "22.7000, 75.8400",
        windPotential: 27,
        windSiteCoords: "22.6950, 75.8350",
        amenities: "Hotel, Restaurant, Fuel, Workshop, Medical",
        state: "Madhya Pradesh"
    },
    {
        route: "Bangalore-Delhi",
        siteName: "Alwar Transport Terminal",
        siteCoords: "27.5530, 76.6346",
        distanceToHighway: 2.2,
        nearestSubstation: "Alwar 132kV Substation",
        substationCoords: "27.5650, 76.6450",
        industrialZone: "Alwar Industrial Area",
        industrialZoneCoords: "27.5400, 76.6200",
        solarPotential: 33,
        solarSiteCoords: "27.5300, 76.6100",
        windPotential: 23,
        windSiteCoords: "27.5250, 76.6050",
        amenities: "Canteen, Fuel, Parking, Repair",
        state: "Rajasthan"
    },

    // Route 13: Hyderabad-Pune Corridor
    {
        route: "Hyderabad-Pune",
        siteName: "Nizamabad Logistics Hub",
        siteCoords: "18.6725, 78.0941",
        distanceToHighway: 2.3,
        nearestSubstation: "Nizamabad 132kV Substation",
        substationCoords: "18.6850, 78.1050",
        industrialZone: "Nizamabad Industrial Area",
        industrialZoneCoords: "18.6600, 78.0800",
        solarPotential: 42,
        solarSiteCoords: "18.6500, 78.0700",
        windPotential: 32,
        windSiteCoords: "18.6450, 78.0650",
        amenities: "Restaurant, Fuel, Rest Area, Medical",
        state: "Telangana"
    },
    {
        route: "Hyderabad-Pune",
        siteName: "Nanded Transport Center",
        siteCoords: "19.1383, 77.2975",
        distanceToHighway: 2.0,
        nearestSubstation: "Nanded 220kV Substation",
        substationCoords: "19.1500, 77.3100",
        industrialZone: "Nanded Industrial Estate",
        industrialZoneCoords: "19.1250, 77.2800",
        solarPotential: 41,
        solarSiteCoords: "19.1150, 77.2700",
        windPotential: 31,
        windSiteCoords: "19.1100, 77.2650",
        amenities: "Hotel, Restaurant, Fuel, Workshop, ATM",
        state: "Maharashtra"
    },
    {
        route: "Hyderabad-Pune",
        siteName: "Latur Logistics Park",
        siteCoords: "18.4088, 76.5604",
        distanceToHighway: 2.7,
        nearestSubstation: "Latur 132kV Substation",
        substationCoords: "18.4200, 76.5750",
        industrialZone: "Latur Industrial Area",
        industrialZoneCoords: "18.3950, 76.5400",
        solarPotential: 43,
        solarSiteCoords: "18.3850, 76.5300",
        windPotential: 33,
        windSiteCoords: "18.3800, 76.5250",
        amenities: "Dhaba, Parking, Basic Repair, Medical",
        state: "Maharashtra"
    },
    {
        route: "Hyderabad-Pune",
        siteName: "Ahmednagar Transport Hub",
        siteCoords: "19.0948, 74.7480",
        distanceToHighway: 2.1,
        nearestSubstation: "Ahmednagar 220kV Substation",
        substationCoords: "19.1050, 74.7600",
        industrialZone: "Ahmednagar Industrial Area",
        industrialZoneCoords: "19.0800, 74.7300",
        solarPotential: 39,
        solarSiteCoords: "19.0700, 74.7200",
        windPotential: 29,
        windSiteCoords: "19.0650, 74.7150",
        amenities: "Restaurant, Fuel, Rest Area, ATM",
        state: "Maharashtra"
    },
    {
        route: "Hyderabad-Pune",
        siteName: "Baramati Logistics Center",
        siteCoords: "18.1514, 74.5815",
        distanceToHighway: 1.9,
        nearestSubstation: "Baramati 132kV Substation",
        substationCoords: "18.1650, 74.5950",
        industrialZone: "Baramati Industrial Estate",
        industrialZoneCoords: "18.1350, 74.5650",
        solarPotential: 38,
        solarSiteCoords: "18.1250, 74.5550",
        windPotential: 28,
        windSiteCoords: "18.1200, 74.5500",
        amenities: "Hotel, Canteen, Fuel, Workshop",
        state: "Maharashtra"
    },

    // Route 14: Kochi-Bangalore Corridor
    {
        route: "Kochi-Bangalore",
        siteName: "Ernakulam Port Hub",
        siteCoords: "9.9312, 76.2673",
        distanceToHighway: 1.5,
        nearestSubstation: "Ernakulam 220kV Substation",
        substationCoords: "9.9400, 76.2750",
        industrialZone: "Kakkanad Info Park",
        industrialZoneCoords: "10.0200, 76.3500",
        solarPotential: 35,
        solarSiteCoords: "9.9200, 76.2550",
        windPotential: 25,
        windSiteCoords: "9.9150, 76.2500",
        amenities: "Hotel, Restaurant, Fuel, Workshop, ATM",
        state: "Kerala"
    },
    {
        route: "Kochi-Bangalore",
        siteName: "Thrissur Transport Center",
        siteCoords: "10.5276, 76.2144",
        distanceToHighway: 2.2,
        nearestSubstation: "Thrissur 132kV Substation",
        substationCoords: "10.5400, 76.2250",
        industrialZone: "Thrissur Industrial Area",
        industrialZoneCoords: "10.5150, 76.2000",
        solarPotential: 33,
        solarSiteCoords: "10.5050, 76.1900",
        windPotential: 23,
        windSiteCoords: "10.5000, 76.1850",
        amenities: "Restaurant, Fuel, Rest Area, Medical",
        state: "Kerala"
    },
    {
        route: "Kochi-Bangalore",
        siteName: "Palakkad Junction Hub",
        siteCoords: "10.7867, 76.6548",
        distanceToHighway: 2.0,
        nearestSubstation: "Palakkad 132kV Substation",
        substationCoords: "10.8000, 76.6650",
        industrialZone: "Palakkad Industrial Park",
        industrialZoneCoords: "10.7700, 76.6400",
        solarPotential: 36,
        solarSiteCoords: "10.7600, 76.6300",
        windPotential: 26,
        windSiteCoords: "10.7550, 76.6250",
        amenities: "Hotel, Dhaba, Workshop, ATM",
        state: "Kerala"
    },
    {
        route: "Kochi-Bangalore",
        siteName: "Coimbatore Textile Hub",
        siteCoords: "11.0168, 76.9558",
        distanceToHighway: 1.8,
        nearestSubstation: "Coimbatore 400kV Substation",
        substationCoords: "11.0300, 76.9700",
        industrialZone: "Coimbatore Industrial Area",
        industrialZoneCoords: "11.0000, 76.9300",
        solarPotential: 40,
        solarSiteCoords: "10.9900, 76.9200",
        windPotential: 30,
        windSiteCoords: "10.9850, 76.9150",
        amenities: "Restaurant, Fuel, Rest Area, Repair",
        state: "Tamil Nadu"
    },
    {
        route: "Kochi-Bangalore",
        siteName: "Hosur Electronics Hub",
        siteCoords: "12.7409, 77.8253",
        distanceToHighway: 2.4,
        nearestSubstation: "Hosur 132kV Substation",
        substationCoords: "12.7550, 77.8400",
        industrialZone: "Hosur Industrial Area",
        industrialZoneCoords: "12.7250, 77.8100",
        solarPotential: 37,
        solarSiteCoords: "12.7150, 77.8000",
        windPotential: 27,
        windSiteCoords: "12.7100, 77.7950",
        amenities: "Hotel, Canteen, Fuel, Workshop, Medical",
        state: "Tamil Nadu"
    },

    // Route 15: Coimbatore-Chennai Corridor
    {
        route: "Coimbatore-Chennai",
        siteName: "Tirupur Textile Hub",
        siteCoords: "11.1085, 77.3411",
        distanceToHighway: 1.9,
        nearestSubstation: "Tirupur 220kV Substation",
        substationCoords: "11.1200, 77.3550",
        industrialZone: "Tirupur Export Park",
        industrialZoneCoords: "11.0950, 77.3200",
        solarPotential: 42,
        solarSiteCoords: "11.0850, 77.3100",
        windPotential: 32,
        windSiteCoords: "11.0800, 77.3050",
        amenities: "Hotel, Restaurant, Fuel, Workshop, ATM",
        state: "Tamil Nadu"
    },
    {
        route: "Coimbatore-Chennai",
        siteName: "Erode Transport Center",
        siteCoords: "11.3410, 77.7172",
        distanceToHighway: 2.3,
        nearestSubstation: "Erode 132kV Substation",
        substationCoords: "11.3550, 77.7300",
        industrialZone: "Erode Industrial Area",
        industrialZoneCoords: "11.3250, 77.7000",
        solarPotential: 41,
        solarSiteCoords: "11.3150, 77.6900",
        windPotential: 31,
        windSiteCoords: "11.3100, 77.6850",
        amenities: "Restaurant, Fuel, Rest Area, Medical",
        state: "Tamil Nadu"
    },
    {
        route: "Coimbatore-Chennai",
        siteName: "Namakkal Logistics Hub",
        siteCoords: "11.2189, 78.1677",
        distanceToHighway: 2.1,
        nearestSubstation: "Namakkal 132kV Substation",
        substationCoords: "11.2300, 78.1800",
        industrialZone: "Namakkal Industrial Park",
        industrialZoneCoords: "11.2050, 78.1500",
        solarPotential: 43,
        solarSiteCoords: "11.1950, 78.1400",
        windPotential: 33,
        windSiteCoords: "11.1900, 78.1350",
        amenities: "Dhaba, Parking, Basic Repair, ATM",
        state: "Tamil Nadu"
    },
    {
        route: "Coimbatore-Chennai",
        siteName: "Trichy Junction Hub",
        siteCoords: "10.7905, 78.7047",
        distanceToHighway: 2.0,
        nearestSubstation: "Trichy 400kV Substation",
        substationCoords: "10.8050, 78.7200",
        industrialZone: "Trichy Industrial Estate",
        industrialZoneCoords: "10.7750, 78.6850",
        solarPotential: 44,
        solarSiteCoords: "10.7650, 78.6750",
        windPotential: 34,
        windSiteCoords: "10.7600, 78.6700",
        amenities: "Restaurant, Fuel, Rest Area, Repair",
        state: "Tamil Nadu"
    },
    {
        route: "Coimbatore-Chennai",
        siteName: "Villupuram Transport Terminal",
        siteCoords: "11.9401, 79.4861",
        distanceToHighway: 2.5,
        nearestSubstation: "Villupuram 132kV Substation",
        substationCoords: "11.9550, 79.5000",
        industrialZone: "Villupuram Industrial Area",
        industrialZoneCoords: "11.9250, 79.4700",
        solarPotential: 45,
        solarSiteCoords: "11.9150, 79.4600",
        windPotential: 35,
        windSiteCoords: "11.9100, 79.4550",
        amenities: "Hotel, Canteen, Fuel, Workshop",
        state: "Tamil Nadu"
    },

    // Route 16: Surat-Delhi Corridor
    {
        route: "Surat-Delhi",
        siteName: "Bharuch Chemical Hub",
        siteCoords: "21.7051, 72.9959",
        distanceToHighway: 1.7,
        nearestSubstation: "Bharuch 220kV Substation",
        substationCoords: "21.7150, 73.0100",
        industrialZone: "Bharuch Industrial Area",
        industrialZoneCoords: "21.6900, 72.9800",
        solarPotential: 44,
        solarSiteCoords: "21.6800, 72.9700",
        windPotential: 34,
        windSiteCoords: "21.6750, 72.9650",
        amenities: "Hotel, Restaurant, Fuel, Workshop, ATM",
        state: "Gujarat"
    },
    {
        route: "Surat-Delhi",
        siteName: "Udaipur Royal Hub",
        siteCoords: "24.5854, 73.7125",
        distanceToHighway: 2.1,
        nearestSubstation: "Udaipur 220kV Substation",
        substationCoords: "24.5900, 73.7200",
        industrialZone: "Udaipur Industrial Area",
        industrialZoneCoords: "24.5700, 73.7000",
        solarPotential: 40,
        solarSiteCoords: "24.5600, 73.6800",
        windPotential: 30,
        windSiteCoords: "24.5500, 73.6600",
        amenities: "Restaurant, Fuel, Rest Area, Medical",
        state: "Rajasthan"
    },
    {
        route: "Surat-Delhi",
        siteName: "Ajmer Transport Center",
        siteCoords: "26.4499, 74.6399",
        distanceToHighway: 2.4,
        nearestSubstation: "Ajmer 220kV Substation",
        substationCoords: "26.4650, 74.6550",
        industrialZone: "Ajmer Industrial Area",
        industrialZoneCoords: "26.4300, 74.6200",
        solarPotential: 38,
        solarSiteCoords: "26.4200, 74.6100",
        windPotential: 28,
        windSiteCoords: "26.4150, 74.6050",
        amenities: "Dhaba, Parking, Basic Repair, ATM",
        state: "Rajasthan"
    },
    {
        route: "Surat-Delhi",
        siteName: "Hisar Logistics Hub",
        siteCoords: "29.1492, 75.7217",
        distanceToHighway: 2.8,
        nearestSubstation: "Hisar 400kV Substation",
        substationCoords: "29.1650, 75.7400",
        industrialZone: "Hisar Industrial Estate",
        industrialZoneCoords: "29.1300, 75.7000",
        solarPotential: 35,
        solarSiteCoords: "29.1200, 75.6900",
        windPotential: 25,
        windSiteCoords: "29.1150, 75.6850",
        amenities: "Restaurant, Fuel, Rest Area, Repair",
        state: "Haryana"
    },
    {
        route: "Surat-Delhi",
        siteName: "Rohtak Transport Terminal",
        siteCoords: "28.8955, 76.6066",
        distanceToHighway: 2.2,
        nearestSubstation: "Rohtak 132kV Substation",
        substationCoords: "28.9100, 76.6200",
        industrialZone: "Rohtak Industrial Area",
        industrialZoneCoords: "28.8800, 76.5900",
        solarPotential: 32,
        solarSiteCoords: "28.8700, 76.5800",
        windPotential: 22,
        windSiteCoords: "28.8650, 76.5750",
        amenities: "Hotel, Canteen, Fuel, Workshop",
        state: "Haryana"
    },

    // Route 17: Indore-Mumbai Corridor
    {
        route: "Indore-Mumbai",
        siteName: "Dewas Industrial Hub",
        siteCoords: "22.9676, 76.0534",
        distanceToHighway: 2.0,
        nearestSubstation: "Dewas 132kV Substation",
        substationCoords: "22.9800, 76.0650",
        industrialZone: "Dewas Industrial Area",
        industrialZoneCoords: "22.9550, 76.0400",
        solarPotential: 39,
        solarSiteCoords: "22.9450, 76.0300",
        windPotential: 29,
        windSiteCoords: "22.9400, 76.0250",
        amenities: "Restaurant, Fuel, Rest Area, Medical",
        state: "Madhya Pradesh"
    },
    {
        route: "Indore-Mumbai",
        siteName: "Ujjain Transport Center",
        siteCoords: "23.1765, 75.7885",
        distanceToHighway: 2.3,
        nearestSubstation: "Ujjain 132kV Substation",
        substationCoords: "23.1900, 75.8000",
        industrialZone: "Ujjain Industrial Estate",
        industrialZoneCoords: "23.1600, 75.7700",
        solarPotential: 37,
        solarSiteCoords: "23.1500, 75.7600",
        windPotential: 27,
        windSiteCoords: "23.1450, 75.7550",
        amenities: "Hotel, Restaurant, Fuel, Workshop, ATM",
        state: "Madhya Pradesh"
    },
    {
        route: "Indore-Mumbai",
        siteName: "Dhule Logistics Park",
        siteCoords: "20.9042, 74.7749",
        distanceToHighway: 2.7,
        nearestSubstation: "Dhule 132kV Substation",
        substationCoords: "20.9200, 74.7900",
        industrialZone: "Dhule Industrial Area",
        industrialZoneCoords: "20.8900, 74.7600",
        solarPotential: 41,
        solarSiteCoords: "20.8800, 74.7500",
        windPotential: 31,
        windSiteCoords: "20.8750, 74.7450",
        amenities: "Dhaba, Parking, Basic Repair, Medical",
        state: "Maharashtra"
    },
    {
        route: "Indore-Mumbai",
        siteName: "Nashik Wine Hub",
        siteCoords: "19.9975, 73.7898",
        distanceToHighway: 2.1,
        nearestSubstation: "Nashik 220kV Substation",
        substationCoords: "20.0050, 73.8000",
        industrialZone: "Ambad Industrial Area",
        industrialZoneCoords: "19.9800, 73.7600",
        solarPotential: 36,
        solarSiteCoords: "19.9900, 73.7700",
        windPotential: 26,
        windSiteCoords: "19.9850, 73.7650",
        amenities: "Restaurant, Fuel, Rest Area, ATM",
        state: "Maharashtra"
    },
    {
        route: "Indore-Mumbai",
        siteName: "Kalyan Junction Hub",
        siteCoords: "19.2403, 73.1305",
        distanceToHighway: 1.8,
        nearestSubstation: "Kalyan 220kV Substation",
        substationCoords: "19.2550, 73.1450",
        industrialZone: "Kalyan Industrial Complex",
        industrialZoneCoords: "19.2250, 73.1150",
        solarPotential: 34,
        solarSiteCoords: "19.2150, 73.1050",
        windPotential: 24,
        windSiteCoords: "19.2100, 73.1000",
        amenities: "Hotel, Canteen, Fuel, Workshop",
        state: "Maharashtra"
    },

    // Route 18: Lucknow-Delhi Corridor
    {
        route: "Lucknow-Delhi",
        siteName: "Sitapur Transport Hub",
        siteCoords: "27.5669, 80.6777",
        distanceToHighway: 2.2,
        nearestSubstation: "Sitapur 132kV Substation",
        substationCoords: "27.5800, 80.6900",
        industrialZone: "Sitapur Industrial Area",
        industrialZoneCoords: "27.5500, 80.6600",
        solarPotential: 30,
        solarSiteCoords: "27.5400, 80.6500",
        windPotential: 20,
        windSiteCoords: "27.5350, 80.6450",
        amenities: "Restaurant, Fuel, Rest Area, Medical",
        state: "Uttar Pradesh"
    },
    {
        route: "Lucknow-Delhi",
        siteName: "Bareilly Logistics Center",
        siteCoords: "28.3670, 79.4304",
        distanceToHighway: 2.5,
        nearestSubstation: "Bareilly 220kV Substation",
        substationCoords: "28.3800, 79.4450",
        industrialZone: "Bareilly Industrial Estate",
        industrialZoneCoords: "28.3500, 79.4150",
        solarPotential: 28,
        solarSiteCoords: "28.3400, 79.4050",
        windPotential: 18,
        windSiteCoords: "28.3350, 79.4000",
        amenities: "Hotel, Restaurant, Fuel, Workshop, ATM",
        state: "Uttar Pradesh"
    },
    {
        route: "Lucknow-Delhi",
        siteName: "Moradabad Transport Terminal",
        siteCoords: "28.8386, 78.7733",
        distanceToHighway: 2.1,
        nearestSubstation: "Moradabad 132kV Substation",
        substationCoords: "28.8500, 78.7850",
        industrialZone: "Moradabad Industrial Area",
        industrialZoneCoords: "28.8250, 78.7600",
        solarPotential: 29,
        solarSiteCoords: "28.8150, 78.7500",
        windPotential: 19,
        windSiteCoords: "28.8100, 78.7450",
        amenities: "Dhaba, Parking, Basic Repair, Medical",
        state: "Uttar Pradesh"
    },
    {
        route: "Lucknow-Delhi",
        siteName: "Meerut Industrial Hub",
        siteCoords: "28.9845, 77.7064",
        distanceToHighway: 1.9,
        nearestSubstation: "Meerut 220kV Substation",
        substationCoords: "29.0000, 77.7200",
        industrialZone: "Meerut Industrial Area",
        industrialZoneCoords: "28.9700, 77.6900",
        solarPotential: 27,
        solarSiteCoords: "28.9600, 77.6800",
        windPotential: 17,
        windSiteCoords: "28.9550, 77.6750",
        amenities: "Restaurant, Fuel, Rest Area, ATM",
        state: "Uttar Pradesh"
    },
    {
        route: "Lucknow-Delhi",
        siteName: "Ghaziabad Gateway Hub",
        siteCoords: "28.6692, 77.4538",
        distanceToHighway: 2.0,
        nearestSubstation: "Ghaziabad 220kV Substation",
        substationCoords: "28.6750, 77.4600",
        industrialZone: "Ghaziabad Industrial Area",
        industrialZoneCoords: "28.6500, 77.4300",
        solarPotential: 25,
        solarSiteCoords: "28.6400, 77.4200",
        windPotential: 15,
        windSiteCoords: "28.6350, 77.4150",
        amenities: "Hotel, Canteen, Fuel, Workshop",
        state: "Uttar Pradesh"
    },

    // Route 19: Jaipur-Ahmedabad Corridor
    {
        route: "Jaipur-Ahmedabad",
        siteName: "Kishangarh Marble Hub",
        siteCoords: "26.5829, 74.8648",
        distanceToHighway: 2.3,
        nearestSubstation: "Kishangarh 132kV Substation",
        substationCoords: "26.5950, 74.8800",
        industrialZone: "Kishangarh Industrial Area",
        industrialZoneCoords: "26.5700, 74.8500",
        solarPotential: 41,
        solarSiteCoords: "26.5600, 74.8400",
        windPotential: 31,
        windSiteCoords: "26.5550, 74.8350",
        amenities: "Restaurant, Fuel, Rest Area, Medical",
        state: "Rajasthan"
    },
    {
        route: "Jaipur-Ahmedabad",
        siteName: "Jodhpur Transport Center",
        siteCoords: "26.2389, 73.0243",
        distanceToHighway: 2.8,
        nearestSubstation: "Jodhpur 400kV Substation",
        substationCoords: "26.2550, 73.0400",
        industrialZone: "Jodhpur Industrial Area",
        industrialZoneCoords: "26.2200, 72.9900",
        solarPotential: 45,
        solarSiteCoords: "26.2100, 72.9800",
        windPotential: 35,
        windSiteCoords: "26.2050, 72.9750",
        amenities: "Hotel, Restaurant, Fuel, Workshop, ATM",
        state: "Rajasthan"
    },
    {
        route: "Jaipur-Ahmedabad",
        siteName: "Pali Textile Hub",
        siteCoords: "25.7711, 73.3234",
        distanceToHighway: 2.1,
        nearestSubstation: "Pali 132kV Substation",
        substationCoords: "25.7850, 73.3400",
        industrialZone: "Pali Industrial Estate",
        industrialZoneCoords: "25.7550, 73.3000",
        solarPotential: 43,
        solarSiteCoords: "25.7450, 73.2900",
        windPotential: 33,
        windSiteCoords: "25.7400, 73.2850",
        amenities: "Dhaba, Parking, Basic Repair, ATM",
        state: "Rajasthan"
    },
    {
        route: "Jaipur-Ahmedabad",
        siteName: "Palanpur Junction Hub",
        siteCoords: "24.1722, 72.4281",
        distanceToHighway: 2.4,
        nearestSubstation: "Palanpur 132kV Substation",
        substationCoords: "24.1850, 72.4450",
        industrialZone: "Palanpur Industrial Area",
        industrialZoneCoords: "24.1600, 72.4100",
        solarPotential: 44,
        solarSiteCoords: "24.1500, 72.4000",
        windPotential: 34,
        windSiteCoords: "24.1450, 72.3950",
        amenities: "Restaurant, Fuel, Rest Area, Repair",
        state: "Gujarat"
    },
    {
        route: "Jaipur-Ahmedabad",
        siteName: "Mehsana Industrial Hub",
        siteCoords: "23.5880, 72.3693",
        distanceToHighway: 2.0,
        nearestSubstation: "Mehsana 220kV Substation",
        substationCoords: "23.6000, 72.3850",
        industrialZone: "Mehsana Industrial Estate",
        industrialZoneCoords: "23.5750, 72.3500",
        solarPotential: 42,
        solarSiteCoords: "23.5650, 72.3400",
        windPotential: 32,
        windSiteCoords: "23.5600, 72.3350",
        amenities: "Hotel, Canteen, Fuel, Workshop",
        state: "Gujarat"
    },

    // Route 20: Chandigarh-Delhi Corridor
    {
        route: "Chandigarh-Delhi",
        siteName: "Ambala Cantonment Hub",
        siteCoords: "30.3752, 76.7821",
        distanceToHighway: 1.8,
        nearestSubstation: "Ambala 220kV Substation",
        substationCoords: "30.3900, 76.7950",
        industrialZone: "Ambala Industrial Area",
        industrialZoneCoords: "30.3600, 76.7650",
        solarPotential: 28,
        solarSiteCoords: "30.3500, 76.7550",
        windPotential: 18,
        windSiteCoords: "30.3450, 76.7500",
        amenities: "Hotel, Restaurant, Fuel, Workshop, ATM",
        state: "Haryana"
    },
    {
        route: "Chandigarh-Delhi",
        siteName: "Kurukshetra Transport Center",
        siteCoords: "29.9647, 76.8781",
        distanceToHighway: 2.2,
        nearestSubstation: "Kurukshetra 132kV Substation",
        substationCoords: "29.9800, 76.8950",
        industrialZone: "Kurukshetra Industrial Estate",
        industrialZoneCoords: "29.9500, 76.8600",
        solarPotential: 30,
        solarSiteCoords: "29.9400, 76.8500",
        windPotential: 20,
        windSiteCoords: "29.9350, 76.8450",
        amenities: "Restaurant, Fuel, Rest Area, Medical",
        state: "Haryana"
    },
    {
        route: "Chandigarh-Delhi",
        siteName: "Karnal Logistics Park",
        siteCoords: "29.6857, 76.9905",
        distanceToHighway: 2.5,
        nearestSubstation: "Karnal 220kV Substation",
        substationCoords: "29.7000, 77.0050",
        industrialZone: "Karnal Industrial Area",
        industrialZoneCoords: "29.6700, 76.9750",
        solarPotential: 29,
        solarSiteCoords: "29.6600, 76.9650",
        windPotential: 19,
        windSiteCoords: "29.6550, 76.9600",
        amenities: "Dhaba, Parking, Basic Repair, ATM",
        state: "Haryana"
    },
    {
        route: "Chandigarh-Delhi",
        siteName: "Panipat Refinery Hub",
        siteCoords: "29.3909, 76.9635",
        distanceToHighway: 2.1,
        nearestSubstation: "Panipat 400kV Substation",
        substationCoords: "29.4050, 76.9800",
        industrialZone: "Panipat Refinery Complex",
        industrialZoneCoords: "29.3750, 76.9450",
        solarPotential: 31,
        solarSiteCoords: "29.3650, 76.9350",
        windPotential: 21,
        windSiteCoords: "29.3600, 76.9300",
        amenities: "Restaurant, Fuel, Rest Area, Repair",
        state: "Haryana"
    },
    {
        route: "Chandigarh-Delhi",
        siteName: "Sonipat Transport Terminal",
        siteCoords: "28.9931, 77.0151",
        distanceToHighway: 1.9,
        nearestSubstation: "Sonipat 132kV Substation",
        substationCoords: "29.0100, 77.0300",
        industrialZone: "Sonipat Industrial Area",
        industrialZoneCoords: "28.9800, 77.0000",
        solarPotential: 27,
        solarSiteCoords: "28.9700, 76.9900",
        windPotential: 17,
        windSiteCoords: "28.9650, 76.9850",
        amenities: "Hotel, Canteen, Fuel, Workshop",
        state: "Haryana"
    },

    // Route 21: Bhubaneswar-Kolkata Corridor
    {
        route: "Bhubaneswar-Kolkata",
        siteName: "Balasore Port Hub",
        siteCoords: "21.4942, 86.9336",
        distanceToHighway: 2.0,
        nearestSubstation: "Balasore 132kV Substation",
        substationCoords: "21.5100, 86.9500",
        industrialZone: "Balasore Industrial Area",
        industrialZoneCoords: "21.4800, 86.9150",
        solarPotential: 32,
        solarSiteCoords: "21.4700, 86.9050",
        windPotential: 22,
        windSiteCoords: "21.4650, 86.9000",
        amenities: "Restaurant, Fuel, Rest Area, Medical",
        state: "Odisha"
    },
    {
        route: "Bhubaneswar-Kolkata",
        siteName: "Jaleswar Transport Center",
        siteCoords: "21.4017, 87.2219",
        distanceToHighway: 2.3,
        nearestSubstation: "Jaleswar 132kV Substation",
        substationCoords: "21.4150, 87.2400",
        industrialZone: "Jaleswar Industrial Estate",
        industrialZoneCoords: "21.3900, 87.2000",
        solarPotential: 30,
        solarSiteCoords: "21.3800, 87.1900",
        windPotential: 20,
        windSiteCoords: "21.3750, 87.1850",
        amenities: "Hotel, Restaurant, Fuel, Workshop, ATM",
        state: "Odisha"
    },
    {
        route: "Bhubaneswar-Kolkata",
        siteName: "Digha Coastal Hub",
        siteCoords: "21.6269, 87.5069",
        distanceToHighway: 2.7,
        nearestSubstation: "Digha 132kV Substation",
        substationCoords: "21.6400, 87.5250",
        industrialZone: "Digha Tourism Complex",
        industrialZoneCoords: "21.6150, 87.4900",
        solarPotential: 28,
        solarSiteCoords: "21.6050, 87.4800",
        windPotential: 25,
        windSiteCoords: "21.6000, 87.4750",
        amenities: "Dhaba, Parking, Basic Repair, Medical",
        state: "West Bengal"
    },
    {
        route: "Bhubaneswar-Kolkata",
        siteName: "Haldia Petrochemical Hub",
        siteCoords: "22.0582, 88.0603",
        distanceToHighway: 2.1,
        nearestSubstation: "Haldia 220kV Substation",
        substationCoords: "22.0750, 88.0800",
        industrialZone: "Haldia Petrochemical Complex",
        industrialZoneCoords: "22.0400, 88.0400",
        solarPotential: 26,
        solarSiteCoords: "22.0300, 88.0300",
        windPotential: 18,
        windSiteCoords: "22.0250, 88.0250",
        amenities: "Restaurant, Fuel, Rest Area, ATM",
        state: "West Bengal"
    },
    {
        route: "Bhubaneswar-Kolkata",
        siteName: "Kharagpur Railway Hub",
        siteCoords: "22.3460, 87.2320",
        distanceToHighway: 1.9,
        nearestSubstation: "Kharagpur 132kV Substation",
        substationCoords: "22.3550, 87.2400",
        industrialZone: "Kharagpur Industrial Area",
        industrialZoneCoords: "22.3300, 87.2200",
        solarPotential: 24,
        solarSiteCoords: "22.3200, 87.2100",
        windPotential: 16,
        windSiteCoords: "22.3150, 87.2050",
        amenities: "Hotel, Canteen, Fuel, Workshop",
        state: "West Bengal"
    },

    // Route 22: Vijayawada-Chennai Corridor
    {
        route: "Vijayawada-Chennai",
        siteName: "Guntur Transport Hub",
        siteCoords: "16.3067, 80.4365",
        distanceToHighway: 2.2,
        nearestSubstation: "Guntur 220kV Substation",
        substationCoords: "16.3200, 80.4500",
        industrialZone: "Guntur Industrial Park",
        industrialZoneCoords: "16.2900, 80.4200",
        solarPotential: 46,
        solarSiteCoords: "16.2800, 80.4100",
        windPotential: 36,
        windSiteCoords: "16.2750, 80.4050",
        amenities: "Restaurant, Fuel, Rest Area, Medical",
        state: "Andhra Pradesh"
    },
    {
        route: "Vijayawada-Chennai",
        siteName: "Ongole Logistics Center",
        siteCoords: "15.5057, 80.0499",
        distanceToHighway: 2.5,
        nearestSubstation: "Ongole 132kV Substation",
        substationCoords: "15.5200, 80.0650",
        industrialZone: "Ongole Industrial Area",
        industrialZoneCoords: "15.4900, 80.0300",
        solarPotential: 47,
        solarSiteCoords: "15.4800, 80.0200",
        windPotential: 37,
        windSiteCoords: "15.4750, 80.0150",
        amenities: "Hotel, Restaurant, Fuel, Workshop, ATM",
        state: "Andhra Pradesh"
    },
    {
        route: "Vijayawada-Chennai",
        siteName: "Nellore Port Terminal",
        siteCoords: "14.4426, 79.9865",
        distanceToHighway: 2.3,
        nearestSubstation: "Nellore 220kV Substation",
        substationCoords: "14.4500, 79.9950",
        industrialZone: "Nellore Industrial Park",
        industrialZoneCoords: "14.4200, 79.9700",
        solarPotential: 48,
        solarSiteCoords: "14.4300, 79.9600",
        windPotential: 38,
        windSiteCoords: "14.4100, 79.9500",
        amenities: "Dhaba, Parking, Basic Repair, Medical",
        state: "Andhra Pradesh"
    },
    {
        route: "Vijayawada-Chennai",
        siteName: "Chittoor Transport Hub",
        siteCoords: "13.2172, 79.1003",
        distanceToHighway: 2.0,
        nearestSubstation: "Chittoor 132kV Substation",
        substationCoords: "13.2300, 79.1150",
        industrialZone: "Chittoor Industrial Estate",
        industrialZoneCoords: "13.2050, 79.0850",
        solarPotential: 45,
        solarSiteCoords: "13.1950, 79.0750",
        windPotential: 35,
        windSiteCoords: "13.1900, 79.0700",
        amenities: "Restaurant, Fuel, Rest Area, ATM",
        state: "Andhra Pradesh"
    },
    {
        route: "Vijayawada-Chennai",
        siteName: "Kanchipuram Heritage Hub",
        siteCoords: "12.8342, 79.7036",
        distanceToHighway: 1.8,
        nearestSubstation: "Kanchipuram 132kV Substation",
        substationCoords: "12.8450, 79.7150",
        industrialZone: "Kanchipuram Industrial Area",
        industrialZoneCoords: "12.8200, 79.6850",
        solarPotential: 44,
        solarSiteCoords: "12.8100, 79.6750",
        windPotential: 34,
        windSiteCoords: "12.8050, 79.6700",
        amenities: "Hotel, Canteen, Fuel, Workshop",
        state: "Tamil Nadu"
    },

    // Route 23: Nashik-Pune Corridor
    {
        route: "Nashik-Pune",
        siteName: "Manmad Junction Hub",
        siteCoords: "20.2528, 74.4442",
        distanceToHighway: 2.1,
        nearestSubstation: "Manmad 132kV Substation",
        substationCoords: "20.2650, 74.4600",
        industrialZone: "Manmad Industrial Area",
        industrialZoneCoords: "20.2400, 74.4300",
        solarPotential: 38,
        solarSiteCoords: "20.2300, 74.4200",
        windPotential: 28,
        windSiteCoords: "20.2250, 74.4150",
        amenities: "Restaurant, Fuel, Rest Area, Medical",
        state: "Maharashtra"
    },
    {
        route: "Nashik-Pune",
        siteName: "Shirdi Transport Center",
        siteCoords: "19.7645, 74.4777",
        distanceToHighway: 2.4,
        nearestSubstation: "Shirdi 132kV Substation",
        substationCoords: "19.7800, 74.4950",
        industrialZone: "Shirdi Industrial Estate",
        industrialZoneCoords: "19.7500, 74.4600",
        solarPotential: 36,
        solarSiteCoords: "19.7400, 74.4500",
        windPotential: 26,
        windSiteCoords: "19.7350, 74.4450",
        amenities: "Hotel, Restaurant, Fuel, Workshop, ATM",
        state: "Maharashtra"
    },
    {
        route: "Nashik-Pune",
        siteName: "Sangamner Logistics Hub",
        siteCoords: "19.5707, 74.2089",
        distanceToHighway: 2.0,
        nearestSubstation: "Sangamner 132kV Substation",
        substationCoords: "19.5850, 74.2250",
        industrialZone: "Sangamner Industrial Area",
        industrialZoneCoords: "19.5550, 74.1900",
        solarPotential: 37,
        solarSiteCoords: "19.5450, 74.1800",
        windPotential: 27,
        windSiteCoords: "19.5400, 74.1750",
        amenities: "Dhaba, Parking, Basic Repair, ATM",
        state: "Maharashtra"
    },
    {
        route: "Nashik-Pune",
        siteName: "Narayangaon Transport Terminal",
        siteCoords: "19.1000, 73.9833",
        distanceToHighway: 2.3,
        nearestSubstation: "Narayangaon 132kV Substation",
        substationCoords: "19.1150, 74.0000",
        industrialZone: "Narayangaon Industrial Park",
        industrialZoneCoords: "19.0850, 73.9650",
        solarPotential: 35,
        solarSiteCoords: "19.0750, 73.9550",
        windPotential: 25,
        windSiteCoords: "19.0700, 73.9500",
        amenities: "Restaurant, Fuel, Rest Area, Repair",
        state: "Maharashtra"
    },
    {
        route: "Nashik-Pune",
        siteName: "Chakan Industrial Hub",
        siteCoords: "18.7606, 73.8636",
        distanceToHighway: 1.7,
        nearestSubstation: "Chakan 132kV Substation",
        substationCoords: "18.7750, 73.8800",
        industrialZone: "Chakan Industrial Area",
        industrialZoneCoords: "18.7450, 73.8450",
        solarPotential: 34,
        solarSiteCoords: "18.7350, 73.8350",
        windPotential: 24,
        windSiteCoords: "18.7300, 73.8300",
        amenities: "Hotel, Canteen, Fuel, Workshop",
        state: "Maharashtra"
    },

    // Route 24: Vadodara-Surat Corridor
    {
        route: "Vadodara-Surat",
        siteName: "Ankleshwar Chemical Hub",
        siteCoords: "21.6279, 73.0143",
        distanceToHighway: 1.9,
        nearestSubstation: "Ankleshwar 220kV Substation",
        substationCoords: "21.6400, 73.0300",
        industrialZone: "Ankleshwar Industrial Estate",
        industrialZoneCoords: "21.6150, 72.9950",
        solarPotential: 43,
        solarSiteCoords: "21.6050, 72.9850",
        windPotential: 33,
        windSiteCoords: "21.6000, 72.9800",
        amenities: "Hotel, Restaurant, Fuel, Workshop, ATM",
        state: "Gujarat"
    },
    {
        route: "Vadodara-Surat",
        siteName: "Bharuch Port Terminal",
        siteCoords: "21.7051, 72.9959",
        distanceToHighway: 1.7,
        nearestSubstation: "Bharuch 220kV Substation",
        substationCoords: "21.7150, 73.0100",
        industrialZone: "Bharuch Industrial Area",
        industrialZoneCoords: "21.6900, 72.9800",
        solarPotential: 44,
        solarSiteCoords: "21.6800, 72.9700",
        windPotential: 34,
        windSiteCoords: "21.6750, 72.9650",
        amenities: "Restaurant, Fuel, Rest Area, Medical",
        state: "Gujarat"
    },
    {
        route: "Vadodara-Surat",
        siteName: "Navsari Transport Center",
        siteCoords: "20.9463, 72.9270",
        distanceToHighway: 2.2,
        nearestSubstation: "Navsari 132kV Substation",
        substationCoords: "20.9600, 72.9450",
        industrialZone: "Navsari Industrial Area",
        industrialZoneCoords: "20.9300, 72.9100",
        solarPotential: 42,
        solarSiteCoords: "20.9200, 72.9000",
        windPotential: 32,
        windSiteCoords: "20.9150, 72.8950",
        amenities: "Dhaba, Parking, Basic Repair, ATM",
        state: "Gujarat"
    },
    {
        route: "Vadodara-Surat",
        siteName: "Valsad Logistics Hub",
        siteCoords: "20.5992, 72.9342",
        distanceToHighway: 2.0,
        nearestSubstation: "Valsad 132kV Substation",
        substationCoords: "20.6150, 72.9500",
        industrialZone: "Valsad Industrial Estate",
        industrialZoneCoords: "20.5850, 72.9200",
        solarPotential: 41,
        solarSiteCoords: "20.5750, 72.9100",
        windPotential: 31,
        windSiteCoords: "20.5700, 72.9050",
        amenities: "Restaurant, Fuel, Rest Area, Repair",
        state: "Gujarat"
    },
    {
        route: "Vadodara-Surat",
        siteName: "Surat Diamond City Hub",
        siteCoords: "21.1702, 72.8311",
        distanceToHighway: 1.6,
        nearestSubstation: "Surat 400kV Substation",
        substationCoords: "21.1800, 72.8400",
        industrialZone: "Hazira Industrial Area",
        industrialZoneCoords: "21.1000, 72.6500",
        solarPotential: 45,
        solarSiteCoords: "21.1600, 72.8200",
        windPotential: 35,
        windSiteCoords: "21.1550, 72.8150",
        amenities: "Hotel, Canteen, Fuel, Workshop",
        state: "Gujarat"
    }
];

// Initialize the map
function initMap() {
    // Create map centered on India
    map = L.map('map').setView([20.5937, 78.9629], 5);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Create markers layer group
    markersLayer = L.layerGroup().addTo(map);

    // Load and display all sites
    allSites = chargingSitesData;
    displaySites(allSites);
}

// Display sites on the map
function displaySites(sites) {
    // Clear existing markers
    markersLayer.clearLayers();

    sites.forEach(site => {
        const coords = site.siteCoords.split(', ');
        const lat = parseFloat(coords[0]);
        const lng = parseFloat(coords[1]);

        if (!isNaN(lat) && !isNaN(lng)) {
            // Get route color
            const color = routeColors[site.route] || routeColors.default;

            // Create custom icon
            const customIcon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="
                    background-color: ${color};
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 3px solid white;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 10px;
                ">⚡</div>`,
                iconSize: [26, 26],
                iconAnchor: [13, 13]
            });

            // Create popup content
            const popupContent = `
                <div class="popup-content">
                    <div class="popup-title">${site.siteName}</div>
                    <div class="popup-info">
                        <strong>Route:</strong> ${site.route}<br>
                        <strong>State:</strong> ${site.state}<br>
                        <strong>Distance to Highway:</strong> ${site.distanceToHighway} km<br>
                        <strong>Amenities:</strong> ${site.amenities}
                    </div>
                    <div class="popup-renewable">
                        🌞 Solar: ${site.solarPotential} MW | 💨 Wind: ${site.windPotential} MW
                    </div>
                </div>
            `;

            // Create marker and add to layer
            const marker = L.marker([lat, lng], { icon: customIcon })
                .bindPopup(popupContent)
                .addTo(markersLayer);

            // Store route info for filtering
            marker.routeName = site.route;
        }
    });
}

// Filter sites by route
function filterRoute(routeName) {
    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter and display sites
    if (routeName === 'all') {
        displaySites(allSites);
    } else {
        const filteredSites = allSites.filter(site => site.route === routeName);
        displaySites(filteredSites);
    }
}

// Export map data function
function exportMapData() {
    // Create CSV content
    const headers = [
        'Route', 'Site Name', 'Site Coordinates', 'Distance to Highway (km)',
        'Nearest Substation', 'Substation Coordinates', 'Industrial Zone',
        'Industrial Zone Coordinates', 'Solar Potential (MW)', 'Solar Site Coordinates',
        'Wind Potential (MW)', 'Wind Site Coordinates', 'Nearby Amenities', 'State'
    ];

    let csvContent = headers.join(',') + '\n';

    allSites.forEach(site => {
        const row = [
            `"${site.route}"`,
            `"${site.siteName}"`,
            `"${site.siteCoords}"`,
            site.distanceToHighway,
            `"${site.nearestSubstation}"`,
            `"${site.substationCoords}"`,
            `"${site.industrialZone}"`,
            `"${site.industrialZoneCoords}"`,
            site.solarPotential,
            `"${site.solarSiteCoords}"`,
            site.windPotential,
            `"${site.windSiteCoords}"`,
            `"${site.amenities}"`,
            `"${site.state}"`
        ];
        csvContent += row.join(',') + '\n';
    });

    // Download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'charging_sites_map_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initMap();
});

// Handle window resize
window.addEventListener('resize', function() {
    if (map) {
        map.invalidateSize();
    }
});