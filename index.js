const express = require("express") // Import Express.js framework
const bodyParser = require("body-parser") // Import middleware for parsing body data
const admin_routes = require('./Routes/Admin_routes') // Import admin routes handler
const users_routes = require('./Routes/Users_routes') // Import user routes handler

// Creates an Express application with proper setup and configuration.

function createApp() {
    const app = express();
  
    // Middleware for parsing JSON body data from requests
    app.use(bodyParser.json());
  
    // Mount routes under specific prefix paths for organization
    app.use('/admin', admin_routes);
    app.use('/users', users_routes);
  
    // Set the port number for the application to listen on
    const port = 3000;
  
    // Start the application and log a message
    app.listen(port, () => {
      console.log(`The app is listening on port ${port}`);
    });
  
    return app;
  }
  
  // Create and start the Express application
  const app = createApp();