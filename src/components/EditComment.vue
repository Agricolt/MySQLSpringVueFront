<template>
  <div>
    <h2>Edit Comment</h2>
    <form @submit.prevent="saveChanges">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Comment Name</span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Comment Name"
          aria-label="Comment Name"
          aria-describedby="basic-addon1"
          v-model="editedComment.commentName"
        />
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Comment Text</span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Comment Text"
          aria-label="Comment Text"
          aria-describedby="basic-addon1"
          v-model="editedComment.commentText"
        />
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Employee</span>
        </div>
        <div class="form-group col-md-4">
          <select
            v-model="selectedEmployee"
            id="inputState"
            class="form-control"
          >
            <option disabled value="">Choose...</option>
            <option v-for="employee in employees" :key="employee.id" :value="employee">
              {{ employee.surname + ", " + employee.firstName }}
            </option>
          </select>
        </div>
      </div>

      <button type="submit" v-on:click="saveEditedComment()">
        Save Changes
      </button>
    </form>
  </div>
</template>

<script>
import CommentService from "../services/CommentService";
import EmployeeService from "../services/EmployeeService"

export default {
  components: {},
  name: "EditComment",
  data() {
    return {
      employees : [],
      editedComment: {},
      selectedEmployee : {}
    };
  },
  methods: {
    getComment() {
      if (this.$route.params.id == null) {
        return;
      }
      CommentService.getComment(this.$route.params.id)
        .then((response) => {
          this.editedComment = response.data;
          this.selectedEmployee = this.employees.find((element) => element.id === this?.editedComment?.employee?.id)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    saveEditedComment() {
      if (this.editedComment.id != null) {
        CommentService.saveEditedComment(this.editedComment, this.selectedEmployee)
          .then(() => {
            this.$router.push('/comments')
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        CommentService.createComment(this.editedComment, this.selectedEmployee)
          .then(() => {
            this.$router.push('/comments')
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
      getEmployees() {
      EmployeeService.getEmployees().then((response) => {
        this.employees = response.data;
      });
    },
  },
  created() {
    this.getEmployees();
    this.getComment();
  },
};
</script>

<style></style>
