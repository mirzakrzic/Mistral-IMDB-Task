<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark" class="navbar">
        <b-navbar-nav class="ml-auto col-md-12">
          <b-form-input size="sm" class="mr-sm" v-model="search" placeholder="Search Movies"></b-form-input>
        </b-navbar-nav>
    </b-navbar>

    <b-container>
      <b-row>
        <b-col class="movieCard" md="4" v-bind:key="movie.product_id" v-for="movie in orderedMovies"> 
            <MovieComponent v-bind:movie="movie" v-bind:key="movie.product_id" v-on:setRate="setReview"/>
        </b-col>
        </b-row>
    </b-container>

    <b-container>
      <b-row md="12">
        <b-col md="12"> 
          <b-button class="col-md-12  loadMoreButton" variant="outline-primary"  @click="loadMoreMovies(pageNum+1)">Load More</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import MovieComponent from '../../components/MovieComponent.vue'

export default {
  name: "app",
  components: {
    MovieComponent
  },
  data() {
    return {
      movies: [],
      reviews: [],
      search: "",
      pageNum: 1
    }
  },
  created() {
    this.loadMovies();
    this.getRatings();
  },
  computed: {
    filteredMovies: function(){
      return this.movies.filter((movie) => {
        return movie.title.toLowerCase().match(this.search);
      });
    },
    orderedMovies: function(){
      if (this.filteredMovies.product_id === this.reviews.product_id) {
        return this._.orderBy(this.filteredMovies, this.reviews.review);
      }
      return this._.orderBy(this.filteredMovies, 'title');
    }
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
    },
    getRatings() {
      let self = this;
      axios.get('http://localhost:5000/api/imdb/reviews/')
      .then((res) => {
        self.reviews = res.data;
      })
      .catch((error) => {
        throw error;
      });
    },
    loadMovies(pageNo = 1){
      let self = this;
      axios.get('http://localhost:5000/api/imdb/movies', {
        params: {
          pageNo
        }
      })
      .then((res) => {
        self.movies = res.data;
      })
      .catch((error) => {
        throw error;
      });
    },
    loadMoreMovies(pageNo){
      let self = this;
      axios.get('http://localhost:5000/api/imdb/movies', {
        params: {
          pageNo
        }
      })
      .then((res) => {
        self.movies.push(...res.data);
        self.pageNum++;
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

.loadMoreButton {
  margin-top: 15px;
  margin-bottom: 40px;
}
</style>
