<!-- src/pages/Add.vue -->
<template>
    <div>
      <h1>Add Film</h1>
      <!-- Gives the user the ability to add films to the database, however, this form is not complete
            and is only asking for the bare minimum of information, but it shows the concept. -->
      <p>This is where you can add a film to the database.</p>
      <form @submit.prevent="submitForm">
        <label for="title">Film Title:</label>
        <input type="text" v-model="title" id="name" required>
        <label for="desc">Film Description: </label>
        <input type="text" v-model="desc" id="desc" required>
        <label for="year">Release Year: </label>
        <input type="number" v-model.number="year" id="year" required>
        <label for="length">Length: </label>
        <input type="number" v-model.number="length" id="length" required>
        <br>
        <button type="submit">Add Film</button>
      </form>
      <p v-if="showSuccessMessage" class="success-message">Film added successfully!</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AddFilm',
    data() {
      return {
        title: '',
        desc: '',
        year: null,
        language: 1,
        length: null,
        showSuccessMessage: false
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await axios.post('http://localhost:3000/api/add-film', { title: this.title, desc: this.desc, year: this.year, language: this.language, length: this.length });
          console.log(response.data); // Log the response from the server
          this.title = '';
          this.desc = '';
          this.year = null;
          this.length = null;
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  form {
    margin-top: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    margin-bottom: 10px;
  }

  .success-message {
  color: green;
  margin-top: 10px;
}
  </style>
