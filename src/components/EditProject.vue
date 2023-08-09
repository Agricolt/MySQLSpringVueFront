<template>
  <div>
    <h2>Edit Project</h2>
    <form @submit.prevent="saveChanges">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Project Name</span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Project Name"
          aria-label="Project Name"
          aria-describedby="basic-addon1"
          v-model="editedProject.projectName"
        />
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Start Date</span>
        </div>
        <input
          type="date"
          class="form-control"
          placeholder="Stard Date"
          aria-label="Stard Date"
          aria-describedby="basic-addon1"
          v-model="editedProject.startDate"
        />
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">End Date</span>
        </div>
        <input
          type="date"
          class="form-control"
          placeholder="End Date"
          aria-label="End Date"
          aria-describedby="basic-addon1"
          v-model="editedProject.endDate"
        />
      </div>
      <button class="save" type="submit" v-on:click="saveEditedProject()">
        Save Changes
      </button>
    </form>
    <employee-under-project-component :projectId="this.$route.params.id"></employee-under-project-component>
  </div>
</template>

<script>
import ProjectService from "../services/ProjectService";
import EmployeeUnderProjectComponent from './EmployeeUnderProjectComponent.vue';

export default {
  components: {EmployeeUnderProjectComponent},
  name: "EditProject",
  data() {
    return {
      editedProject: {},
      employees : [],
    };
  },
  methods: {
    getProject() {
      if (this.$route.params.id == null) {
        return;
      }
      ProjectService.getProject(this.$route.params.id)
        .then((response) => {
          this.editedProject = response.data;
          this.editedProject.startDate = new Date(this.editedProject.startDate).toISOString().slice(0, 10)
          this.editedProject.endDate = new Date(this.editedProject.endDate).toISOString().slice(0, 10)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    saveEditedProject() {
      if (this.editedProject.id != null) {
        ProjectService.saveEditedProject(this.editedProject)
          .then(() => {
            this.$router.push("/projects");
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        ProjectService.createProject(this.editedProject)
          .then(() => {
            this.$router.push("/projects");
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
  created() {
    this.getProject();
  },
};
</script>

<style>

.save {
  margin-bottom: 100px;
}

</style>
