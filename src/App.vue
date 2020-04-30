<template>
  <div id="app">
    <div class="container">
      <transition name="fade">
        <div class="loading-screen" v-if="isLoading">
          <div class="loading-screen__path">
            <div class="loading-screen__starship">
              <div class="loading-screen__fire">
                <div
                  class="loading-screen__flame loading-screen__flame--1"
                ></div>
                <div
                  class="loading-screen__flame loading-screen__flame--2"
                ></div>
                <div
                  class="loading-screen__flame loading-screen__flame--3"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <section class="maincontent">
        <form v-on:submit="search" class="searchbar" action="">
          <input
            placeholder="Search by Name"
            type="text"
            class="searchbar__input"
            v-model="inquiry"
            v-on:keyup="debouncedGetCharacters"
          />
          <button type="submit" class="searchbar__button"></button>
        </form>

        <ul class="characters-list">
          <li
            class="characters-list__character"
            v-for="character in currentData.results"
            :key="character.name"
          >
            <card :char="character" />
          </li>
          <div class="charactets-list__error" v-if="isErrored">вот и всё!</div>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import card from "./components/card.vue";
import axios from "axios";
import throttle from "./throttle";

export default {
  name: "App",
  components: {
    card
  },

  data() {
    return {
      data: [],
      nextPage: 2,

      inquiry: "",
      isPreviousAvailable: false,
      isNextAvailable: true,
      isLoading: true,
      isErrored: false
    };
  },

  computed: {
    currentData: function() {
      return this.data;
    },
    debouncedGetCharacters: function() {
      return throttle(this.delayedSearch, 1000);
    },
    bottomOfWindow: function() {
      return document.documentElement.scrollTop + window.innerHeight;
    },
    computedNewData: function() {
      return this.newData;
    }
  },

  mounted() {
    axios
      .get("https://swapi.dev/api/people/")
      .then(
        response => ((this.data = response.data), (this.isLoading = false))
      );
    this.scroll();
  },

  methods: {
    forwards() {
      let nextData = this.data.next;
      axios.get(nextData).then(response => (this.data = response.data));
    },
    backwards() {
      let previousData = this.data.previous;
      axios.get(previousData).then(response => (this.data = response.data));
    },
    getCharacters() {
      axios
        .get(`https://swapi.dev/api/people/?search=${this.inquiry}`)
        .then(response => (this.data = response.data));
    },
    search(e) {
      e.preventDefault();
      this.getCharacters();
      this.nextPage = 2;
    },
    delayedSearch() {
      this.getCharacters();
      this.nextPage = 2;
    },
    scroll() {
      window.onscroll = () => {
        let a = Math.round(
          document.documentElement.scrollTop + window.innerHeight
        );
        let b = Math.round(document.documentElement.offsetHeight);

        if (a == b || a + 1 == b) {
          let c = [];
          axios
            .get(`https://swapi.dev/api/people/?page=${this.nextPage}`)
            .then(response => {
              (c = response.data.results),
                (this.data.results.push(c[0]),
                this.data.results.push(c[1]),
                this.data.results.push(c[2]),
                this.data.results.push(c[3]),
                this.data.results.push(c[4]),
                this.data.results.push(c[5]),
                this.data.results.push(c[6]),
                this.data.results.push(c[7]),
                this.data.results.push(c[8]),
                this.data.results.push(c[9]));
            })
            .catch(err => {
              console.log(err.response);
              this.isErrored = true;
            });

          this.nextPage++;
        }
      };
    }
  }
};
</script>

<style lang="scss">
@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}

@keyframes blink {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
body {
  font-family: "Roboto", sans-serif;
  margin: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-family: "Roboto";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.wrapper {
  min-height: 100vh;
  width: 100%;
  background: #333333;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 85%;
  margin: 0 auto;
  position: relative;
}

#app {
  height: 100%;
  width: 100%;
  flex: 1 0 auto;
}

.header {
  background: url("../src/assets/logo.png") no-repeat center;
  background-size: cover;
  width: 100%;
  height: 33vh;
  flex-shrink: 0;
}

.header__logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.header__logo-content {
  width: 400px;
  height: 90px;
}

.header__logo-content--star {
  background: url("../src/assets/star.png") no-repeat center;
  background-size: contain;
}

.header__logo-content--wars {
  background: url("../src/assets/wars.png") no-repeat center;
  background-size: contain;
}

.header__logo-content--text {
  background: none;
  height: unset;
  font-size: 25px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
}

.footer {
  background: #1a1a1a;
  margin-top: 160px;
  text-align: center;
  flex-shrink: 0;
}

.footer__copyright {
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  padding: 50px 0;
  font-family: "Roboto";
  text-transform: uppercase;
}

h1,
h2,
h3,
h4 {
  font-size: inherit;
  font-weight: inherit;
  padding: 0;
  margin: 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.characters-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  margin: 0 auto;
  grid-gap: 32px;
  position: relative;
}

.loading-screen {
  position: absolute;
  height: 100%;
  width: 120%;
  display: flex;
  justify-content: center;
  align-items: start;
  top: 0;
  left: -10%;
  z-index: 999;

  background: #333333;
}

.loading-screen__starship {
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  background: url("./assets/ship.png") no-repeat center;
  background-size: contain;
}

.loading-screen__fire {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: -3px;
  left: 10px;
}

.loading-screen__flame--1 {
  animation: blink 0.5s infinite linear;

  width: 14px;
  height: 2px;
  background: url("./assets/flame1.png") no-repeat center;
  background-size: contain;
}

.loading-screen__flame--2 {
  animation: blink 0.5s infinite linear;

  width: 12px;
  height: 2px;
  background: url("./assets/flame2.png") no-repeat center;
  background-size: contain;
}

.loading-screen__flame--3 {
  animation: blink 0.5s infinite linear;

  width: 9px;
  height: 2px;
  background: url("./assets/flame3.png") no-repeat center;
  background-size: contain;
}

.loading-screen__path {
  border-radius: 50%;

  width: 90px;
  height: 90px;
  margin: 20vh;
  animation: spin 2.5s infinite linear;

  position: relative;
}

.loaded {
  opacity: 0;

  transition: 2s;

  transition-property: all;
  transition-delay: 2s;
  height: 0;
}

.hidden {
  visibility: hidden;
}

.searchbar {
  position: relative;
  width: 50%;
  margin: 0 auto;
  padding: 80px 0;
}

.searchbar__input {
  background: inherit;
  border: none;
  color: #808080;
  border-bottom: 1px solid #808080;
  width: 100%;

  font-size: 18px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
  transition-delay: 2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.searchbar__input:focus {
  outline: none;
}

.searchbar__button {
  border: none;
  padding: 12px;
  background: inherit;
  background: url("./assets/magnifier.png") no-repeat center;
  background-size: contain;
  position: absolute;
  right: 0;
  bottom: 85px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .characters-list {
    grid-template-columns: 1fr;
  }

  .searchbar {
    width: 100%;
  }

  .header__logo-content {
    width: 220px;
    height: 50px;
  }

  .header__logo-content--text {
    font-size: 13px;
    height: unset;
  }
}
</style>
