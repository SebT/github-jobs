import { shallowMount } from "@vue/test-utils";
import JobListView from "@/views/JobList";

describe("JobListView.vue", () => {
  it("uses cache on load if a search was already done", () => {
    const dispatchSpy = jest.fn(() => Promise.resolve([]));
    const wrapper = shallowMount(JobListView, {
      mocks: {
        $store: {
          state: {
            jobs: [{}, {}, {}],
            searchedLocation: "new york"
          },
          dispatch: dispatchSpy
        },
        $route: {
          query: {
            location: "new york"
          }
        }
      }
    });
    expect(dispatchSpy).toHaveBeenCalledTimes(0);
    expect(wrapper.contains("job-list-stub")).toBeTruthy();
  });

  it("uses query string to search jobs on load", () => {
    const dispatchSpy = jest.fn(() => Promise.resolve([]));
    shallowMount(JobListView, {
      mocks: {
        $store: {
          state: {
            jobs: []
          },
          dispatch: dispatchSpy
        },
        $route: {
          query: {
            location: "new york"
          }
        }
      }
    });
    expect(dispatchSpy).toHaveBeenCalledWith("searchJobs", "new york");
  });

  it("show placeholder if no search has been made", () => {
    const wrapper = shallowMount(JobListView, {
      mocks: {
        $store: {
          state: {
            jobs: []
          },
          dispatch: jest.fn()
        },
        $route: {
          query: {}
        }
      }
    });
    expect(wrapper.contains(".job-list-view__placeholder")).toBeTruthy();
  });

  it("show no result message if no search has no results", () => {
    const wrapper = shallowMount(JobListView, {
      mocks: {
        $store: {
          state: {
            jobs: [],
            searchedLocation: "paris"
          },
          dispatch: jest.fn()
        },
        $route: {
          query: {}
        }
      }
    });
    expect(wrapper.contains(".job-list-view__no-result")).toBeTruthy();
  });
});
