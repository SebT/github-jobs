const axios = require("axios");
const GITHUB_JOBS_API_URL = "https://jobs.github.com/";

module.exports.searchJobs = async location => {
  const proxiedUrl =
    GITHUB_JOBS_API_URL + "positions.json?location=" + location;

  const { data: jobs } = await axios.get(proxiedUrl);
  return jobs;
};

module.exports.fetchJob = async id => {
  const { data: job } = await axios.get(
    GITHUB_JOBS_API_URL + "positions/" + id + ".json"
  );
  return job;
};
