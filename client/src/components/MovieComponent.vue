<template> 
<div>
  <b-card img-src="https://placekitten.com/1000/300" img-alt="Card image" img-top>
    <b-card-title>{{movie.title}}</b-card-title>
    <b-card-text>Released: {{movie.release_date}}</b-card-text>
    <b-card-text>Cast: {{movie.cast[0]}},  {{movie.cast[1]}}</b-card-text>
    <b-button variant="outline-secondary" size="sm" id="show-btn" @click="viewMore">View more</b-button>
  </b-card>

  <b-modal ref="my-modal" hide-footer hide-header>
      <div class="d-block">
        <b-img src="https://placekitten.com/1000/300" fluid alt="Responsive image" class="moviePoster" img-alt="Movie Poster"></b-img>
        <h3>{{movie.title}}</h3>
        <h5>Released: {{movie.release_date}}</h5>
        <h5>Cast: {{movie.cast[0]}}, {{movie.cast[1]}}</h5>
        <p>{{movie.overview}}</p>
      </div>

      <star-rating v-model="review"
            v-bind:increment="0.5"
            v-bind:max-rating="5"
            v-bind:star-size="40">
      </star-rating>
      <b-button class="sm col-sm-4 modalButton" variant="outline-primary"  @click="trasferRate(review, movie.product_id)">Rate</b-button>

      <b-button class="sm col-sm-4 modalButton closeButton" variant="outline-danger"  @click="hideModal">Close</b-button>
    </b-modal>
</div>
</template>

<script>
export default {
  name: "MovieComponent",
  props: ["movie"],
  data () {
    return {
      review: 0
    }
  },
  methods: {
    viewMore() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    trasferRate(review, product_id) {
      this.$emit("setRate", review, product_id);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .moviePoster {
    margin-bottom: 10px;
  }

 .modalButton {
   margin-top: 15px;
 }

 .closeButton {
   float: right;
 }
</style>
