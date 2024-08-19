
print('Initializing script is running...\n');

db = db.getSiblingDB('admin');

db.createCollection('roasts');

// Controls how many rows we initialize with dummy data
const initRows = 25;

for (var i = 0; i < initRows; i++) {
    db.roasts.insertOne(
        {
            "bean": "Dummy Bean",
            "roastDate": new Date(),
            "description": "Dummy data log!",
            "targetRoastLevel": "Dark Roast!",
            "phTemp": 500,
            "phTime": 20,
            "roastProfile": {
                "tempOverTime": [{
                "time": "00:30",
                "temp": 480
                },
                {
                "time":"01:00",
                "temp": 480
                }],
                "roastLevel": "dark",
                "startWeight": 455,
                "endWeight": 400,
                "firstCrack": "8:00",
                "rollingFirstCrack": "8:30",
                "secondCrack": "12:00",
                "totalRoastTime": "12:30",
                "color": "med-brown",
                "roastImageUrl": "example.jpg",
                "roastNotes": "This is dummy data"
            }
        }
    );
    
print('Initializing script is complete...\n');
print(`Added [${initRows}] rows to [roasts] collection\n`);
}