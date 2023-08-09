<template>
  <div class="container">
    <div class="mb-4 text-left"></div>
    <h1 class="text-center">Employees assigned to a project</h1>
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
          <td v-if="employee.job != null">{{ employee.job.jobName }}</td>
          <td v-else>None</td>
          <td v-if="employee.managingEmployee != null">
            {{
              employee.managingEmployee.surname +
              ", " +
              employee.managingEmployee.firstName
            }}
          </td>
          <td v-else>None</td>
          <td>
            <router-link
              :to="{ name: 'EditEmployee', params: { id: employee.id } }"
              >View Related / Edit</router-link
            >
            <router-view />
          </td>
          <td>
            <a
              href="#"
              class="link-danger"
              v-on:click="removeEmployeeFromProject(employee.id)"
              >Remove employee from a project</a
            >
          </td>
        </tr>
      </tbody>
    </table>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">Employee</span>
      </div>
      <div class="form-group col-md-4">
        <select
          v-model="selectedCandidateEmployee"
          id="inputState"
          class="form-control"
          ref="selection"
        >
          <option disabled value="">Choose...</option>
          <option
            v-for="candidateEmployee in candidateEmployees"
            :key="candidateEmployee.id"
            :value="candidateEmployee"
          >
            {{ candidateEmployee.surname + ", " + candidateEmployee.firstName }}
          </option>
        </select>
      </div>
      <button v-on:click="assignEmployee(selectedCandidateEmployee)">
        Add employee to a project
      </button>
    </div>
  </div>
</template>

<script>
import EmployeeService from "../services/EmployeeService";
import ProjectService from "../services/ProjectService";

export default {
  props: ["projectId"],
  components: {},
  name: "EmployeeUnderProjectComponent",
  data() {
    return {
      employees: [],
      candidateEmployees: [],
      selectedCandidateEmployee: {},
    };
  },
  methods: {
    getEmployees() {
      EmployeeService.getEmployeesByProjectId(this.projectId).then(
        (response) => {
          this.employees = response.data;
        }
      );
      EmployeeService.getEmployeesWithoutThisProject(this.projectId).then(
        (response) => {
          this.candidateEmployees = response.data;
        }
      );
    },
    removeEmployeeFromProject(employeeId) {
      ProjectService.removeEmployeeFromProject(
        this.projectId,
        employeeId
      )
        .then(() => {
          this.getEmployees();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    assignEmployee() {
      ProjectService.assignEmployeeToProject(
        this.projectId,
        this.selectedCandidateEmployee.id
      ).then((response) => {
        console.log(response);
        this.getEmployees();
      });
    },
  },
  created() {
    if (this.projectId != null) {
      this.getEmployees();
    }
  },
};
</script>

<style>
.addEmployeeToProject {
  margin-left: 30px;
}
</style>
