<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col md="4">
        <b-card img-src="https://placekitten.com/1000/300" img-alt="Card image" img-top>
          <b-card-text>Some quick example text to build on the card and make up the bulk of the card's content.</b-card-text>
        </b-card>
      </b-col>
      <b-col  md="4">
        <b-card img-src="https://placekitten.com/1000/300" img-alt="Card image" img-top>
          <b-card-text>Some quick example text to build on the card and make up the bulk of the card's content.</b-card-text>
        </b-card>
      </b-col>
      <b-col  md="4">
        <b-card img-src="https://placekitten.com/1000/300" img-alt="Card image" img-top>
          <b-card-text>Some quick example text to build on the card and make up the bulk of the card's content.</b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
 
</template>

<script>
export default {
  name: "MovieComponent",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
