const fastify = require("fastify");
const axios = require("axios");
const querystring = require("querystring");

const GITHUB_JOBS_API_URL = "https://jobs.github.com/positions.json";

module.exports = function({ port }) {
  const app = fastify({ logger: true });

  app.get("/api/jobs", async (request, reply) => {
    const proxiedUrl =
      GITHUB_JOBS_API_URL + "?" + querystring.stringify(request.query);
    request.log.info("Calling GET " + proxiedUrl);

    const { data: jobs } = await axios.get(proxiedUrl);
    reply.send(jobs);
  });

  return app.listen(port);
};
