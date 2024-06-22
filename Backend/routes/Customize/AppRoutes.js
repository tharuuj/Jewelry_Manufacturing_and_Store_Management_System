const express = require("express");
const routerApp = express.Router();

// Import controller functions
const AppControllers = require("../../controllers/Customize/AppControllers");

// Define routes
routerApp.get("/", AppControllers.getAllApps); // Display all apps
routerApp.post("/", AppControllers.addApp); // Insert a new app
routerApp.get("/:id", AppControllers.getById); // Get an app by ID
routerApp.put("/:id", AppControllers.updateApp); // Update an app by ID
routerApp.delete("/:id", AppControllers.deleteApp); // Delete an app by ID

// Export router
module.exports = routerApp;
