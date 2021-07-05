const mongoose = require("mongoose");
const { typeValidation, typeValidationError } = require("./utils/validations");
const petSchema = new mongoose.Schema({
  breed: {
    type: String,
    required: true,
  },
  race: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    validate: {
      validator: typeValidation,
      message: typeValidationError,
    },
  },
  image: {
    type: String, // For now a single image per pet.
    required: true,
  },
  price: {
    type: Number,
    min: [2000, "Price is always greater than 2000 "],
  },
  count: {
    type: Number,
    required: true,
    min: [0, "Pets cannot be negative"],
  },
});

module.exports = mongoose.model("Pet", petSchema);
