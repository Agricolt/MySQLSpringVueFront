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
          <span class="input-group-text" id="basic-addon1">Job Name</span>
        </div>
        <div class="form-group col-md-4">
          <select
            v-model="selectedJob"
            id="inputState"
            class="form-control"
            ref="selection"
          >
            <option disabled value="">Choose...</option>
            <option v-for="job in jobs" :key="job.id" :value="job">
              {{ job.jobName }}
            </option>
          </select>
        </div>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Manager</span>
        </div>
        <div class="form-group col-md-4">
          <select
            v-model="selectedManager"
            id="inputState"
            class="form-control"
            ref="selection"
          >
            <option disabled value="">Choose...</option>
            <option v-for="manager in managers" :key="manager.id" :value="manager">
              {{ manager.surname + ", " + manager.firstName }}
            </option>
          </select>
        </div>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Is a manager?</span>
        </div>
        <div class="input-group-text">
          <input type="checkbox" v-model="editedEmployee.isManager" />
        </div>
      </div>

      <button type="submit" v-on:click="saveEditedEmployee()">
        Save Changes
      </button>
    </form>
  </div>
</template>

<script>
import EmployeeService from "../services/EmployeeService";
import JobService from "../services/JobService";
import Employee from "@/dto/Employee";

export default {
  components: {},
  name: "EditEmployee",
  data() {
    return {
      managers: [],
      jobs: [],
      editedEmployee: {},
      selectedManager: {},
      selectedJob : {}
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
          this.selectedJob = this.jobs.find((element) => element.id === this?.editedEmployee?.job?.id)
          this.selectedManager = this.managers.find((element) => element.id === this?.editedEmployee?.managingEmployee?.id)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    saveEditedEmployee() {
      if (this.editedEmployee.id != null) {
        EmployeeService.saveEditedEmployee(this.editedEmployee, this.selectedJob, this.selectedManager)
          .then(() => {
            this.$router.push("/employees");
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
          this.selectedJob.id,
          this.selectedManager.id
        );
        EmployeeService.createEmployee(dto)
          .then(() => {
            this.$router.push("/employees");
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    getManagers() {
      EmployeeService.getManagers()
        .then((response) => {
          this.managers = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getJobs() {
      JobService.getJobs()
        .then((response) => {
          this.jobs = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.getManagers();
    this.getJobs();
    this.getEmployee();
  },
};
</script>

<style></style>
