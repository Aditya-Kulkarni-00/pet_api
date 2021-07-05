const Pet = require("../models/schema.pet.js");

// Create and Save a new pet
exports.create = (req, res) => {
  // Create a pet
  const pet = new Pet({
    breed: req.body.breed,
    race: req.body.race,
    type: req.body.type,
    price: req.body.price,
    image: req.body.image,
    count: req.body.count,
  });

  // Save Pet in the database
  pet
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the pet.",
      });
    });
};

// Retrieve and return all Pets from the database.
exports.findAll = (req, res) => {
  Pet.find()
    .then((pets) => {
      res.send(pets);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving pets.",
      });
    });
};

// Find a single pet with a petId
exports.findOne = (req, res) => {
  Pet.findById(req.params.petId)
    .then((pet) => {
      if (!pet) {
        return res.status(404).send({
          message: "pet not found with id " + req.params.petId,
        });
      }
      res.send(pet);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "pet not found with id " + req.params.petId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving pet with id " + req.params.petId,
      });
    });
};

// Update a Pet identified by the petId in the request
exports.update = (req, res) => {
  // Find pet and update it with the request body
  Pet.findByIdAndUpdate(
    req.params.petId,
    {
      breed: req.body.breed,
      race: req.body.race,
      type: req.body.type,
      price: req.body.price,
      image: req.body.image,
      count: req.body.count,
    },
    { new: true }
    //return a new pet instead of an old one
  )
    .then((pet) => {
      if (!pet) {
        return res.status(404).send({
          message: "pet not found with id " + req.params.petId,
        });
      }
      res.send(pet);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Pet not found with id " + req.params.petId,
        });
      }
      return res.status(500).send({
        message: "Error updating Pet with id " + req.params.petId,
      });
    });
};

// Delete a pet with the specified petId in the request
exports.delete = (req, res) => {
  Pet.findByIdAndRemove(req.params.petId)
    .then((pet) => {
      if (!pet) {
        return res.status(404).send({
          message: "pet not found with id " + req.params.petId,
        });
      }
      res.send({ message: "Pet deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Pet not found with id " + req.params.petId,
        });
      }
      return res.status(500).send({
        message: "Could not delete Pet with id " + req.params.petId,
      });
    });
};
