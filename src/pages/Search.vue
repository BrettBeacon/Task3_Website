<!-- src/pages/Search.vue -->
<template>
    <div>
      <!-- Gives the user the ability to search the database using a word, it will match closely to what they typed. -->
      <h1>Search Films</h1>
      <form @submit.prevent="searchData">
        <label for="name">Film Title:</label>
        <input type="text" v-model="title" id="title" required>
        <button type="submit">Search</button>
        <button type="button" @click="clearData">Clear</button> <!-- Clearing the input -->
      </form>
      <table v-if="results.length">
        <thead>
          <tr>
            <!-- Building the table with the revelant information from the database -->
            <th>Film ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Release Year</th>
            <th>Length in Minutes</th>
          </tr>
        </thead>
        <tbody>
          <!-- Filling the table with the information from the request. -->
          <tr v-for="item in results" :key="item.film_id">
            <td>{{ item.film_id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.release_year }}</td>
            <td>{{ item.length }}</td>
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
        results: []
      };
    },
    methods: {
      async searchData() {
        try {
          // Getting the data from the database to present to the user.
          const response = await axios.post('http://localhost:3000/api/search', { title: this.title });
          console.log(response.data); // Log the fetched data to the console
          this.results = response.data; // Update the results property to display on the webpage
        } catch (error) {
          console.error(error);
        }
      },
      clearData() {
        this.title = ''; // Clear the input field
        this.results = []; // Clear the search results
      }
    }
  }
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #42b983;
  }
  
  form {
    margin-bottom: 20px;
  }
  
  input {
    margin-right: 10px;
  }
  </style>