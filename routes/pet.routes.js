module.exports = (app) => {
  const pets = require("../controllers/pet.controller.js");

  // Create a new Note
  app.post("/pets", pets.create);

  // Retrieve all Notes
  app.get("/pets", pets.findAll);

  // Retrieve a single Note with noteId
  app.get("/pets/:petId", pets.findOne);

  // Update a Note with noteId
  app.put("/pets/:petId", pets.update);

  // Delete a Note with noteId
  app.delete("/pets/:petId", pets.delete);
};
