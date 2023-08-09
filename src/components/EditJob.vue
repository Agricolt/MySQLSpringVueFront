<template>
  <div>
    <h2>Edit Job</h2>
    <form @submit.prevent="saveChanges">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Job Name</span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Job Name"
          aria-label="Job Name"
          aria-describedby="basic-addon1"
          v-model="editedJob.jobName"
        />
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Job Salary</span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Job Salary"
          aria-label="Job Salary"
          aria-describedby="basic-addon1"
          v-model="editedJob.salary"
        />
      </div>

      <button type="submit" v-on:click="saveEditedJob()">
        Save Changes
      </button>
    </form>
  </div>
</template>

<script>
import JobService from "../services/JobService";

export default {
  components: {},
  name: "EditJob",
  data() {
    return {
      editedJob: {},
    };
  },
  methods: {
    getJob() {
      if (this.$route.params.id == null) {
        return;
      }
      JobService.getJob(this.$route.params.id)
        .then((response) => {
          this.editedJob = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    saveEditedJob() {
      if (this.editedJob.id != null) {
        JobService.saveEditedJob(this.editedJob)
          .then((response) => {
            console.log(response);
            this.$router.push('/jobs')
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        JobService.createJob(this.editedJob)
          .then((response) => {
            console.log(response);
            this.$router.push('/jobs')
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
  created() {
    this.getJob();
  },
};
</script>

<style></style>
