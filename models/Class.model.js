const { Schema, model } = require("mongoose")

const classSchema = new Schema(
  {
    videoLink: {
      type: String,
      required: true,
      trim: true
    },
    videoCover: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
    style: {
      type: [String],
      enum: ['All', 'Ashtanga', 'Facial', 'Hatha', 'Integral', 'Iyengar', 'Jivamukti', 'Meditation', 'Power', 'Philosophy', 'Pregnant', 'Rocket', 'Vinyasa', 'Yin'],
      required: true
    },
    objective: {
      type: [String],
      enum: ['All', 'Lose weight', 'Gain flexibility', 'Get strong', 'Relaxation'],
      required: true,
    },
    intensity: {
      type: [String],
      required: true,
      enum: ['All', 'L', 'M', 'H']
    },
    level: {
      type: [String],
      required: true,
      enum: ['All', '1', '2', '3']
    },
    duration: {
      type: Number,
      require: true
    }
  },
  {
    timestamps: true
  }
);

const Class = model("Class", classSchema);

module.exports = Class;
