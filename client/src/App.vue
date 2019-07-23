<template>
  <div id="app">
    <!-- Navigation bar -->
    <b-navbar toggleable="md" type="dark" variant="dark" class="navbar">
      <b-navbar-brand>MovieDB</b-navbar-brand>
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>Movies</b-nav-item>
          <b-nav-item>TV Series</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container>
      <b-row>
        <b-col class="movieCard" md="4" v-bind:key="movie.product_id" v-for="(movie, i) in movies"> 
            <MovieComponent v-bind:movie="movie" v-bind:key="movie.product_id" v-bind:index="i" v-on:setRate="setReview" />
        </b-col>
        </b-row>
    </b-container>

  </div>
</template>

<script>
import axios from 'axios'
import MovieComponent from './components/MovieComponent.vue'

export default {
  name: "app",
  components: {
    MovieComponent
  },
  data() {
    return {
      movies: [],
      review: 0
    }
  },
  created() {
    let self = this;
    axios.get('http://localhost:5000/api/imdb/movies')
    .then((res) => {
      self.movies = res.data;
    })
    .catch((error) => {
      throw error;
    });
  },
  methods: {
    setReview(reviewD, product_id) {
      axios.post('http://localhost:5000/api/imdb/movies/' + product_id + "/review", {
      review: reviewD
    })
    .then(() => {
      alert('Thank you on your review!')
    })
    .catch((error) => {
      throw error;
    });
    }
  }    
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.movieCard {
  padding-top: 15px;
  padding-bottom: 15px; 
}

.navbar {
  margin-bottom: 20px;
}
</style>
