<template>
  <div>
    <h2>Edit Employee</h2>
    <form @submit.prevent="saveChanges">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Name</span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Name"
          aria-label="Name"
          aria-describedby="basic-addon1"
          v-model="editedEmployee.firstName"
        />
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Surname</span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Surname"
          aria-label="Surname"
          aria-describedby="basic-addon1"
          v-model="editedEmployee.surname"
        />
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Phone Number</span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Phone Number"
          aria-label="Phone Number"
          aria-describedby="basic-addon1"
          v-model="editedEmployee.phoneNumber"
        />
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Is a manager?</span>
        </div>
        <div class="input-group-text">
          <input type="checkbox" v-model="editedEmployee.isManager" />
        </div>
      </div>

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
      <button type="submit" v-on:click="saveEditedEmployee()">
        Save Changes
      </button>
    </form>
  </div>
</template>

<script>
import EmployeeService from "../services/EmployeeService";
import Employee from "@/dto/Employee";

export default {
  components: {},
  name: "EditEmployee",
  data() {
    return {
      editedEmployee: {},
      editedJob: {},
    };
  },
  methods: {
    getEmployee() {
      if (this.$route.params.id == null) {
        return;
      }
      EmployeeService.getEmployee(this.$route.params.id)
        .then((response) => {
          this.editedEmployee = response.data;
          this.editedJob = this.editedEmployee.job;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    saveEditedEmployee() {
      if (this.editedEmployee.id != null) {
        EmployeeService.saveEditedEmployee(this.editedEmployee, this.editedJob)
          .then((response) => {
            console.log(response);
            this.$router.push('/employees')
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        let dto = new Employee(
          this.editedEmployee.firstName,
          this.editedEmployee.surname,
          this.editedEmployee.phoneNumber,
          this.editedEmployee.isManager,
          null,
          null
        );
        EmployeeService.createEmployee(dto)
          .then((response) => {
            console.log(response);
            this.$router.push('/employees')
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
  created() {
    this.getEmployee();
  },
};
</script>

<style></style>
