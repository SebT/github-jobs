const fastify = require("fastify");
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

function setupCors(app) {
  app.register(require("fastify-cors"));
}

module.exports = function({ port }) {
  const app = fastify({ logger: true });

  setupCors(app);
  setupGithubJobsProxy(app);

  return app.listen(port, "0.0.0.0");
};
