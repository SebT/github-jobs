const fastify = require("fastify");
const fastifyStatic = require("fastify-static");
const path = require("path");
const githubApi = require("./github-api");

function setupGithubJobsProxy(app) {
  app.get("/api/jobs", async (request, reply) => {
    const location = request.query.location;
    if (!location) {
      const error = new Error("location query parameter is required");
      error.statusCode = 400;
      error.code = "LOCATION_REQUIRED";
      reply.send(error);
      return;
    }

    const jobs = await githubApi.searchJobs(location);
    reply.send(jobs);
  });

  app.get("/api/jobs/:id", async (request, reply) => {
    const id = request.params.id;
    if (!id) {
      const error = new Error("id parameter is required");
      error.statusCode = 400;
      error.code = "ID_REQUIRED";
      reply.send(error);
      return;
    }

    const job = await githubApi.fetchJob(id);
    reply.send(job);
  });
}

function setupStaticFilesServer(app) {
  app.register(fastifyStatic, { root: path.join(__dirname, "../dist") });
}

function setupCorsInDevelopmentMode(app) {
  if (process.env.NODE_ENV === "development") {
    app.log.info("Enabling CORS in development mode");
    app.register(require("fastify-cors"));
  }
}

module.exports = function({ port }) {
  const app = fastify({ logger: true });

  setupCorsInDevelopmentMode(app);
  setupGithubJobsProxy(app);
  setupStaticFilesServer(app);

  return app.listen(port);
};
