<template>
  <div>
    <h1>Films Page</h1>
    <p>Welcome to the films page!</p>
    <button @click="fetchData">Fetch Films</button> <!-- Fetches every row from the films table within the database. -->
    <table v-if="data.length">
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
        <tr v-for="item in data" :key="item.film_id">
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
  name: 'Films',
  data() {
    return {
      data: []
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/data');
        console.log('Fetched data:', response.data); // Log the fetched data to the console

        // Log each item in the data array
        response.data.forEach(item => console.log('Item:', item));
        
        this.data = response.data; // Update the data property to display on the webpage
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>