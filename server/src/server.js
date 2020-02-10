const express = require("express");
const cors = require("cors");
const githubApi = require("./github-api");

function setupGithubJobsProxy(app) {
  app.get("/api/jobs", async (req, res) => {
    const location = req.query.location;
    if (!location) {
      const error = new Error("location query parameter is required");
      error.statusCode = 400;
      error.code = "LOCATION_REQUIRED";
      res.send(error);
      return;
    }

    const jobs = await githubApi.searchJobs(location);
    res.send(jobs);
  });

  app.get("/api/jobs/:id", async (req, res) => {
    const id = req.params.id;
    if (!id) {
      res.status(400).send(new Error("id parameter is required"));
      return;
    }

    githubApi
      .fetchJob(id)
      .then(job => {
        res.send(job);
      })
      .catch(err => res.status(500).send(err));
  });
}

function setupCors(app) {
  app.use(cors({ origin: true }));
}

module.exports = function({ port }) {
  const app = express();

  setupCors(app);
  setupGithubJobsProxy(app);

  return Promise.resolve(app.listen(port));
};
