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
    axios
      .get(`${this.film}`)
      .then(response => (this.filmTitle = response.data.title));
  }
};
</script>
