<template>
  <div>
    <h2>Edit Employee</h2>
    <form @submit.prevent="saveChanges">
      <label for="name">Name:</label>
      <input v-model="editedEmployee.name" type="text" id="name" />

      <label for="surname">Surname:</label>
      <input v-model="editedEmployee.surname" type="text" id="surname" />

      <label for="phoneNumber">Phone Number:</label>
      <input v-model="editedEmployee.phoneNumber" type="text" id="phoneNumber" />

      <label for="isManager">Is Manager:</label>
      <input v-model="editedEmployee.isManager" type="checkbox" id="isManager" />

      <label for="job">Job:</label>
      <input v-model="editedEmployee.job" type="text" id="job" />

      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  props: {
    record: Object
  },
  setup(props) {
    const editedEmployee = ref({ ...props.record });

    const saveChanges = () => {
      // Here, you can perform actions like saving changes to the backend
      // For this example, we'll just log the changes
      console.log('Edited Employee:', editedEmployee.value);
    };

    onMounted(() => {
      // You can perform additional setup here if needed
    });

    return {
      editedEmployee,
      saveChanges
    };
  }
};
</script>
