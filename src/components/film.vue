<template>
  <div>{{ film }}</div>
</template>

<script>
export default {
  props: {
    film: String
  },

  data() {
    return {
      filmTitle: ""
    };
  }
};
</script>
