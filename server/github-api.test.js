const test = require("ava");
const { searchJobs } = require("./github-api");

test("ensure jobs from github API are sorted by creation date (desc)", async t => {
  const jobs = await searchJobs("new york");
  const sortedJobs = jobs.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  t.deepEqual(jobs, sortedJobs);
});
