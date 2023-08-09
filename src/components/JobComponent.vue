<template>
  <div class="container">
    <div class="mb-4 text-left">
      <router-link to="/newJob" class="btn btn-secondary"
        >New Job</router-link
      >
    </div>
    <h1 class="text-center">Jobs List</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Job Id</th>
          <th>Job Name</th>
          <th>Job Salary</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="job in jobs" v-bind:key="job.id">
          <td>{{ job.id }}</td>
          <td>{{ job.jobName }}</td>
          <td>{{ job.salary }}</td>
          <td>
            <router-link
              :to="{ name: 'EditJob', params: { id: job.id } }"
              >Edit</router-link
            >
            <router-view />
          </td>
          <td>
            <a href="#" class="link-danger" v-on:click="deleteJob(job.id)">Delete</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import JobService from "../services/JobService";

export default {
  components: {},
  name: "EmployeeComponent",
  data() {
    return {
      jobs: [],
    };
  },
  methods: {
    getJobs() {
      JobService.getJobs().then((response) => {
        this.jobs = response.data;
      });
    },
    deleteJob(id) {
      JobService.deleteJob(id)
        .then((response) => {
          console.log(response);
          this.getJobs();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.getJobs();
  },
};
</script>
