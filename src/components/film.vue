<template>
  <div>{{ filmTitle }}</div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    film: String,
    isOpened: Boolean
  },

  data() {
    return {
      filmTitle: ""
    };
  },

  mounted() {
    let SecureFilm = this.film.replace("http://", "https://");
    axios
      .get(`${SecureFilm}`)
      .then(response => (this.filmTitle = response.data.title));
  }
};
</script>
