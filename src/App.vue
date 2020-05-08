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
        <form v-on:submit="search" class="searchbar" v-if="!isLoading">
          <input
            placeholder="Search by Name"
            type="text"
            class="searchbar__input"
            v-model="inquiry"
            @input="debouncedGetCharacters"
          />
          <button type="submit" class="searchbar__button"></button>
        </form>

        <ul class="characters-list" v-if="!isLoading">
          <li
            class="characters-list__character"
            v-for="character in characterData.results"
            :key="character.name"
          >
            <card
              @openCard="openCard"
              :char="character"
              @closeCard="closeCard"
            />
          </li>
        </ul>
        <div v-if="isThisIsTheEnd" class="errormessage">
          Impossible. Perhaps the archieves are incomplete
        </div>
      </section>
      <transition name="fade" v-if="isAdditionalLoading">
        <div class="loading-screen loading-screen--additional">
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
      <a
        href="#top"
        class="link-to-top"
        v-if="(!isCardOpened, showLinkToTheTop)"
      ></a>
    </div>
  </div>
</template>

<script>
import card from "./components/card.vue";

import throttle from "./throttle";
import { mapMutations } from "vuex";

import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    card
  },

  data() {
    return {
      inquiry: "",
      showLinkToTheTop: false,
      isCardOpened: false
    };
  },

  computed: {
    ...mapState({
      characterData: state => state.swData.characterData,
      isLoading: state => state.swData.isLoading,
      isAdditionalLoading: state => state.swData.isAdditionalLoading,
      isAdditionalLoadingAvailable: state =>
        state.swData.isAdditionalLoadingAvailable,
      isThisIsTheEnd: state => state.swData.isThisIsTheEnd
    }),

    debouncedGetCharacters: function() {
      return throttle(this.delayedSearch, 1000);
    },
    bottomOfWindow: function() {
      return document.documentElement.scrollTop + window.innerHeight;
    }
  },

  mounted() {
    this.getAllData(), this.scroll();
  },

  methods: {
    ...mapMutations(["getData", "loadNextPage", "searchCharacters"]),

    getAllData() {
      this.getData();
    },

    openCard() {
      this.showLinkToTheTop = false;
      this.isCardOpened = true;

      document.documentElement.style.overflow = "hidden";
    },

    closeCard() {
      document.documentElement.style.overflow = "auto";
      this.isCardOpened = false;
    },

    search(e) {
      e.preventDefault();
      this.searchCharacters(this.inquiry);
    },
    delayedSearch() {
      this.searchCharacters(this.inquiry);
    },
    scroll() {
      window.onscroll = () => {
        let a = Math.round(
          document.documentElement.scrollTop + window.innerHeight
        );
        let b = Math.round(document.documentElement.offsetHeight);

        if (document.documentElement.scrollTop > window.innerHeight) {
          this.showLinkToTheTop = true;
        } else {
          this.showLinkToTheTop = false;
        }

        if (a == b || a + 1 == b) {
          if (!this.isLoading && this.isAdditionalLoadingAvailable) {
            this.loadNextPage();
          }
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

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Roboto", sans-serif;
  margin: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-family: "Roboto";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  scroll-behavior: smooth;
}

button {
  background: inherit;
  color: inherit;
  border: none;
  cursor: pointer;
}

a,
a:visited,
a:focus {
  text-decoration: none;
}

button:active,
button:focus {
  outline: none;
}
button::-moz-focus-inner {
  border: 0;
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
  margin-top: 100px;

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
  margin-bottom: 30px;
}

.loading-screen {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;

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
  bottom: -8px;
  left: 12px;
}

.loading-screen__flame--1 {
  animation: blink 0.8s infinite linear;

  width: 14px;
  height: 4px;
  background: url("./assets/flame1.png") no-repeat center;
  background-size: contain;
}

.loading-screen__flame--2 {
  animation: blink 0.9s infinite linear;

  width: 12px;
  height: 4px;
  background: url("./assets/flame2.png") no-repeat center;
  background-size: contain;
}

.loading-screen__flame--3 {
  animation: blink 1s infinite linear;

  width: 9px;
  height: 4px;
  background: url("./assets/flame3.png") no-repeat center;
  background-size: contain;
}

.loading-screen__path {
  border-radius: 50%;

  width: 120px;
  height: 90px;

  animation: spin 2.5s infinite linear;

  position: relative;

  margin-top: 20vh;
}

.loading-screen--additional {
  top: unset;
  position: relative;
  width: 100%;
  left: 0;
  margin-top: 20px;

  bottom: 0;
  height: auto;
}

.loading-screen--additional .loading-screen__starship {
  bottom: 0;
  top: unset;
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
  transition-delay: 0s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transition-delay: 0s;
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

.errormessage {
  width: 100%;

  color: #d2b833;
  font-size: 22px;
  font-weight: bold;
}

.link-to-top {
  position: fixed;
  top: 3%;
  right: 3%;
  color: #fff;
  font-weight: bold;
  width: 50px;
  height: 50px;
  background: url("./assets/arrow.png") no-repeat center;
  background-size: contain;
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
