<template>
  <div class="container">
    <div class="mb-4 text-left">
      <router-link to="/newEmployee" class="btn btn-secondary"
        >New Employee</router-link
      >
    </div>
    <h1 class="text-center">Employees List</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Employee Id</th>
          <th>Employee First Name</th>
          <th>Employee Surname</th>
          <th>Employee Phone Number</th>
          <th>Is a manager?</th>
          <th>Job Name</th>
          <th>Managing employee</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" v-bind:key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.firstName }}</td>
          <td>{{ employee.surname }}</td>
          <td>{{ employee.phoneNumber }}</td>
          <td>
            <input type="checkbox" :checked="employee.isManager" disabled />
          </td>
          <td>{{ employee.job.jobName }}</td>
          <td>{{ employee.managingEmployee }}</td>
          <td>
            <router-link
              :to="{ name: 'EditEmployee', params: { id: employee.id } }"
              >Edit</router-link
            >
            <router-view />
          </td>
          <td>
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
        console.log(response.data);
        for (let index = 0; index < response.data.length; index++) {
          if (response.data[index].managingEmployee === null) {
            response.data[index].managingEmployee = "None";
          }
          if (response.data[index].job === null) {
            response.data[index].job = { jobName: "None" };
          }
        }
        this.employees = response.data;
      });
    },
    deleteEmployee(id) {
      EmployeeService.deleteEmployee(id)
        .then((response) => {
          console.log(response);
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
