<template>
  <div id="app">
    <!-- Navigation bar -->
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-brand>MovieReviewer</b-navbar-brand>
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

    <MovieComponent/>
  </div>
</template>

<script>
import MovieComponent from './components/MovieComponent.vue'

export default {
  name: "app",
  components: {
    MovieComponent
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
