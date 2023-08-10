// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import processupload from "./routes/process_upload";
import trackmanager from "./routes/track_manager";
import ledcontroller from "./routes/led_controller";
import playlistmanager from "./routes/playlist_manager";

const app = express();

// Disable caching and set appropriate headers
app.set('etag', false);
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
});

// Serve static resources from specified directories
app.use(express.static(__dirname + "/../src"));
app.use(express.static(__dirname + "/../files"));

// Configure bodyParser for handling POST requests
app.use(bodyParser.json({limit: '50MB'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '50MB' }));

// Add subroutes for handling different endpoints
app.use("/file-upload", processupload);
app.use("/tracks", trackmanager);
app.use("/led", ledcontroller);
app.use("/playlists", playlistmanager);

// Start the server and listen on the specified port
const port = process.env.NODE_ENV == "production" ? 3000 : 3000;
app.listen(port, () =>
  console.log(`Server (${process.env.NODE_ENV}) is listening on port ${port}`)
);
