const initServer = require("./server");

const PORT = process.env.PORT || 9000;

initServer({ port: PORT })
  .then(() => {
    console.log("Server running on port " + PORT);
  })
  .catch(error => {
    console.error("FATAL: Could not start server, exiting.", error);
    process.exit(1);
  });
