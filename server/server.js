const fastify = require("fastify");
const fastifyStatic = require("fastify-static");
const axios = require("axios");
const querystring = require("querystring");
const path = require("path");

const GITHUB_JOBS_API_URL = "https://jobs.github.com/positions.json";

function setupGithubJobsProxy(app) {
  app.get("/api/jobs", async (request, reply) => {
    const proxiedUrl =
      GITHUB_JOBS_API_URL + "?" + querystring.stringify(request.query);
    request.log.info("Calling GET " + proxiedUrl);

    const { data: jobs } = await axios.get(proxiedUrl);
    reply.send(jobs);
  });
}

function setupStaticFilesServer(app) {
  app.register(fastifyStatic, { root: path.join(__dirname, "../dist") });
}

module.exports = function({ port }) {
  const app = fastify({ logger: true });

  setupGithubJobsProxy(app);
  setupStaticFilesServer(app);

  return app.listen(port);
};
