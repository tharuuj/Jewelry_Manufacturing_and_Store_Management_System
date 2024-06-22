const express = require("express");
const routerCus = express.Router();

// Import controller functions
const CusControllers = require("../../controllers/Customize/CusControllers");

// Define routes
routerCus.get("/", CusControllers.getAllCus); // Display all customers
routerCus.post("/", CusControllers.addCus); // Insert a new customer
routerCus.get("/:id", CusControllers.getById); // Get a customer by ID
routerCus.put("/:id", CusControllers.updateCus); // Update a customer by ID
routerCus.delete("/:id", CusControllers.deleteCus); // Delete a customer by ID

// Export router
module.exports = routerCus;
