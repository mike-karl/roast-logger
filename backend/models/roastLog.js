const mongoose = require("mongoose");

const roastSchema = new mongoose.Schema({
  bean: {
    type: String,
    required: true,
  },
  roastDate: {
    type: Date,
    required: true,
    immutable: true,
    default: Date.now,
  },
  description: {
    type: String,
    required: false,
  },
  targetRoastLevel: {
    type: String,
    required: true,
  },
  phTemp: {
    type: Number,
    required: true,
  },
  phTime: {
    type: Number,
    required: true,
  },
  roastProfile: {
    tempOverTime: [
      {
        time: {
          type: String,
          required: true,
        },
        temp: {
          type: Number,
          required: true,
        },
      },
    ],
    roastLevel: {
      type: String,
      required: true,
    },
    startWeight: {
      type: Number,
      required: true,
    },
    endWeight: {
      type: Number,
      required: true,
    },
    firstCrack: {
      type: String,
      required: true,
    },
    rollingFirstCrack: {
      type: String,
    },
    secondCrack: {
      type: String,
    },
    totalRoastTime: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    roastImageUrl: {
      type: String,
      required: false,
    },
    roastNotes: {
      type: String,
      required: false,
    },
  },
});

module.exports = mongoose.model("Roast", roastSchema);
