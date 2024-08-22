
print('Initializing script is running...\n');

db = db.getSiblingDB('admin');

db.createCollection('roasts');

// Controls how many rows we initialize with dummy data
const initRows = 2500;

for (var i = 0; i < initRows; i++) {
    db.roasts.insertOne(
        {
            "bean": "Ethiopia Misty Valley Grade 1 Yirgacheffe Natural",
            "roastDate": new Date(),
            "description": "Sample data log!",
            "targetRoastLevel": "Full City",
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
                "roastLevel": "Full City",
                "startWeight": 455,
                "endWeight": 400,
                "firstCrack": "8:00",
                "rollingFirstCrack": "8:30",
                "secondCrack": "12:00",
                "totalRoastTime": "12:30",
                "color": "Dark Brown",
                "roastImageUrl": "example.jpg",
                "roastNotes": "This is generated sample data"
            }
        }
    );
    
print('Initializing script is complete...\n');
print(`Added [${initRows}] rows to [roasts] collection\n`);
}