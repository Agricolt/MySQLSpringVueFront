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
        <input
          type="text"
          class="form-control"
          placeholder="Employee (choose)"
          aria-label="Employee"
          aria-describedby="basic-addon1"
          v-model="editedComment.employeeId"
        />
      </div>

      <button type="submit" v-on:click="saveEditedComment()">
        Save Changes
      </button>
    </form>
  </div>
</template>

<script>
import CommentService from "../services/CommentService";

export default {
  components: {},
  name: "EditComment",
  data() {
    return {
      editedComment: {},
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
        })
        .catch((e) => {
          console.log(e);
        });
    },
    saveEditedComment() {
      if (this.editedComment.id != null) {
        CommentService.saveEditedComment(this.editedComment)
          .then((response) => {
            console.log(response);
            this.$router.push('/comments')
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        CommentService.createComment(this.editedComment)
          .then((response) => {
            console.log(response);
            this.$router.push('/comments')
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
  created() {
    this.getComment();
  },
};
</script>

<style></style>
