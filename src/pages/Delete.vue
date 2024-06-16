<template>
    <div>
      <h1>Delete Films</h1>
      <form @submit.prevent="searchData">
        <label for="name">Film Title:</label>
        <input type="text" v-model="title" id="title" required>
        <button type="submit">Search</button>
      </form>
      <p v-if="showSuccessMessage" class="success-message">Film successfully removed!</p>
      <table v-if="results.length">
        <thead>
          <tr>
            <th>Film ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Release Year</th>
            <th>Length in Minutes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in results" :key="item.film_id">
            <td>{{ item.film_id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.release_year }}</td>
            <td>{{ item.length }}</td>
            <button @click="confirmDelete(item.film_id)">Delete</button>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    name: 'SearchFilms',
    data() {
      return {
        title: '',
        results: [],
        showSuccessMessage: false
      };
    },
    methods: {
      async searchData() {
        try {
          const response = await axios.post('http://localhost:3000/api/search', { title: this.title });
          console.log(response.data); // Log the fetched data to the console
          this.results = response.data; // Update the results property to display on the webpage
        } catch (error) {
          console.error(error);
        }
      },
      async confirmDelete(filmId) {
      const confirmed = confirm('Are you sure you want to delete this item?');
      if (confirmed) {
        try {
          await axios.delete(`http://localhost:3000/api/delete/${filmId}`);
          alert('Item deleted successfully');
          this.searchData();
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
  }  

  </script>
  
  <style scoped>
  form {
    margin-bottom: 20px;
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