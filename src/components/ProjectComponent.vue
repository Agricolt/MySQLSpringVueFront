<template>
  <div class="container">
    <div class="mb-4 text-left">
      <router-link v-if="!this.isShortened" to="/newProject" class="btn btn-secondary"
        >New Project</router-link
      >
    </div>
    <h1 class="text-center">Projects List</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Project Id</th>
          <th>Project Name</th>
          <th>Project Start Date</th>
          <th>Project End Date</th>
          <th>Employees Number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" v-bind:key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.projectName }}</td>
          <td>{{ new Date(project.startDate).toDateString() }}</td>
          <td>{{ new Date(project.endDate).toDateString() }}</td>
          <td>{{ project.employeesNumber }}</td>
          <td>
            <router-link
              :to="{ name: 'EditProject', params: { id: project.id } }"
              >View Related / Edit</router-link
            >
            <router-view />
          </td>
          <td>
            <a href="#" class="link-danger" v-on:click="deleteProject(project.id)">Delete</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ProjectService from "../services/ProjectService";

export default {
  props : ['isShortened'],
  components: {},
  name: "ProjectComponent",
  data() {
    return {
      projects: [],
    };
  },
  methods: {
    getProjects() {
      ProjectService.getProjects().then((response) => {
        this.projects = response.data;
      });
    },
    deleteProject(id) {
      ProjectService.deleteProject(id)
        .then(() => {
          this.getProjects();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.getProjects();
  },
};
</script>

<style>
.container {
  margin-bottom: 200px;
}
</style>
