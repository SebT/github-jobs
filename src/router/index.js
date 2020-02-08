import Vue from "vue";
import VueRouter from "vue-router";
import JobList from "../views/JobList";
import JobDetails from "../views/JobDetails";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/jobs" },
  {
    path: "/jobs",
    name: "jobList",
    component: JobList
  },
  {
    path: "/jobs/:id",
    name: "jobDetails",
    component: JobDetails,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
