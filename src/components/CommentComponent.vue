<template>
  <div class="container">
    <div class="mb-4 text-left">
      <router-link to="/newComment" class="btn btn-secondary"
        >New Comment</router-link
      >
    </div>
    <h1 class="text-center">Comments List</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Comment Id</th>
          <th>Comment Name</th>
          <th>Comment Text</th>
          <th>Employee</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comment in comments" v-bind:key="comment.id">
          <td>{{ comment.id }}</td>
          <td>{{ comment.commentName }}</td>
          <td>{{ comment.commentText }}</td>
          <td>{{ comment.employee.surname + ', ' + comment.employee.firstName }}</td>
          <td>
            <router-link
              :to="{ name: 'EditComment', params: { id: comment.id } }"
              >Edit</router-link
            >
            <router-view />
          </td>
          <td>
            <a href="#" class="link-danger" v-on:click="deleteComment(comment.id)">Delete</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CommentService from "../services/CommentService";

export default {
  components: {},
  name: "CommentComponent",
  data() {
    return {
      comments: [],
    };
  },
  methods: {
    getComments() {
      CommentService.getComments().then((response) => {
        this.comments = response.data;
      });
    },
    deleteComment(id) {
      CommentService.deleteComment(id)
        .then(() => {
          this.getComments();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.getComments();
  },
};
</script>
