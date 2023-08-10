<template>
  <div class="container">
    <div class="mb-4 text-left">
      <router-link v-if="!this.isShortened" to="/newEmployee" class="btn btn-secondary"
        >New Employee</router-link
      >
    </div>
    <h1 class="text-center">Employees List</h1>
    <table class="table table-striped table-bordered">
      <thead class="thead-light">
        <tr>
          <th>Employee Id</th>
          <th>Employee First Name</th>
          <th>Employee Surname</th>
          <th v-if="!this.isShortened">Employee Phone Number</th>
          <th v-if="!this.isShortened">Is a manager?</th>
          <div v-if="!this.isShortened">
          <th v-if="!this.isShortened">Job Name,</th>
          <th class="managing" v-if="!this.isShortened">Managing employee</th>
          </div>
          <th v-if="!this.isShortened">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" v-bind:key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.firstName }}</td>
          <td>{{ employee.surname }}</td>
          <td v-if="!this.isShortened">{{ employee.phoneNumber }}</td>
          <td v-if="!this.isShortened">
            <input type="checkbox" :checked="employee.isManager" disabled />
          </td>
          <div v-if="!this.isShortened">
          <td v-if="employee.job != null && !this.isShortened">{{ employee.job.jobName}}, </td>
          <td v-else>None</td>
          <td v-if="employee.managingEmployee != null" class="managing"> {{ employee.managingEmployee.surname + ', ' +  employee.managingEmployee.firstName}}</td>
          <td v-else class="managing">None</td>
          </div>
          <td v-if="!this.isShortened">
            <router-link
              :to="{ name: 'EditEmployee', params: { id: employee.id } }"
              >View Related / Edit</router-link
            >
            <router-view />
            <a href="#" class="link-danger" v-on:click="deleteEmployee(employee.id)">Delete</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import EmployeeService from "../services/EmployeeService";

export default {
  props : ['isShortened'],
  components: {},
  name: "EmployeeComponent",
  data() {
    return {
      employees: [],
    };
  },
  methods: {
    getEmployees() {
      EmployeeService.getEmployees().then((response) => {
        this.employees = response.data;
      });
    },
    deleteEmployee(id) {
      EmployeeService.deleteEmployee(id)
        .then(() => {
          this.getEmployees();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.getEmployees();
  },
};
</script>

<style>
.link-danger {
  margin-left: 10px;
}
</style>
