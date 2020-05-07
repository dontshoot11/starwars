<template>
  <div :class="{ opened: isOpened }" class="card">
    <div class="card__information">
      <button v-on:click="close" v-if="isOpened" class="card__button">Х</button>
      <div v-on:click="open" class="card__visible">
        <div class="card__userpic" v-bind:style="{ background: activeColor }">
          {{ firstLetter }}
        </div>

        <h2 class="card__name">{{ char.name }}</h2>
        <div class="card__species" v-if="!isOpened">{{ species }}</div>
      </div>
      <div class="card__hidden" v-if="isOpened">
        <transition name="card__fade">
          <div class="loading-screen loading-screen--card" v-if="isLoading">
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
        <div class="card__hidden-element card__hidden-element--year">
          <div class="card__key">birth</div>
          <div class="card__value">{{ char.birth_year }}</div>
        </div>
        <div class="card__hidden-element card__hidden-element--homeplanet">
          <div class="card__key">homeplanet</div>
          <div class="card__value">{{ homeplanet }}</div>
        </div>

        <div class="card__hidden-element card__hidden-element--species">
          <div class="card__key">species</div>
          <div class="card__value">{{ species }}</div>
        </div>

        <div class="card__hidden-element card__hidden-element--gender">
          <div class="card__key">gender</div>
          <div class="card__value">{{ char.gender }}</div>
        </div>
        <div class=" card__hidden-element card__hidden-element--films">
          <div class="card__key">Movies</div>
          <ul class="card__film-list">
            <li
              class="card__films-item value"
              v-for="film in movies"
              :key="film.name"
            >
              <film :film="film" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import film from "././film";

export default {
  props: {
    char: {}
  },
  components: {
    film
  },
  data() {
    return {
      isOpened: false,
      homeplanet: "",
      homelink: "",
      species: "Human",
      isLoading: true,
      colors: [
        "#F08080",
        "#FF0000",
        "#FF69B4",
        "#FF6347",
        "#FF00FF",
        "#9932CC",
        "#6A5ACD",
        "#00FF00",
        "#FFFF00"
      ],
      activeColor: "",
      movies: [],
      filmLinks: []
    };
  },

  mounted() {
    this.getSpecies();
  },

  beforeMount() {
    this.setColor();
  },

  methods: {
    getSpecies() {
      if (this.char.species[0]) {
        let secureSpecies = this.char.species[0].replace("http://", "https://");
        if (secureSpecies) {
          axios
            .get(`${secureSpecies}`)
            .then(response => (this.species = response.data.name));
        }
      }
    },
    open() {
      this.isOpened = true;

      if (this.char.homeworld !== this.homelink) {
        this.getHomeworld();
      }
      if (this.char.films !== this.filmLinks) {
        this.getFilms();
      }
    },

    close() {
      this.isOpened = false;
    },

    getHomeworld() {
      let SecurePlanet = this.char.homeworld.replace("http://", "https://");
      axios.get(`${SecurePlanet}`).then(
        response => (this.homeplanet = response.data.name),
        setTimeout(() => (this.isLoading = false), 1000)
      );
      this.homelink = this.char.homeworld;
    },

    getFilms() {
      for (let i = 0; i <= this.char.films.length; i++) {
        if (this.char.films[i]) {
          let SecureFilm = this.char.films[i].replace("http://", "https://");

          axios
            .get(`${SecureFilm}`)

            .then(response => this.movies.push(response.data.title));
        }
      }
      this.filmLinks = this.char.films;
    },

    setColor() {
      let colorId = Math.floor(
        Math.random(0, this.colors.length) * Math.floor(this.colors.length)
      );

      this.colors[colorId];
      this.activeColor = this.colors[colorId];
    }
  },

  computed: {
    firstLetter: function() {
      return this.char.name.charAt(0);
    }
  }
};
</script>

<style lang="scss">
.card {
  cursor: pointer;
  color: #fff;
  height: 100%;
}

.card__name {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
}

.card__species {
  margin-top: 10px;
  color: #808080;
  font-size: 13px;
}

.opened :hover {
  filter: none;
}

.card__information {
  background: #1a1a1a;
  height: 100%;

  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.38);
  -moz-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.38);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.38);
}

.card__information:hover {
  -webkit-box-shadow: 0px 0px 20px 0px rgba(37, 136, 167, 0.38);
  -moz-box-shadow: 0px 0px 20px 0px rgba(37, 136, 167, 0.38);
  box-shadow: 0px 0px 20px 0px rgba(37, 136, 167, 0.38);
}

.card__button {
  position: absolute;
  right: 22px;
  top: 22px;
}

.card__key {
  color: #808080;
  font-size: 18px;
  margin-left: 30px;
}

.card__value {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}

.card__visible {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 90px;
  padding-bottom: 90px;
  width: 100%;
}

.opened {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
}

.opened .card__information {
  width: 55%;
  height: 85%;
  position: absolute;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

.opened .card__information:hover {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

.opened .card__visible {
  flex-direction: row;
  margin-top: 0;
  margin-bottom: 80px;

  border-bottom: 1px solid #808080;
  padding-bottom: 80px;
  width: 80%;
  justify-content: start;
  padding-top: 0;
}

.card__hidden {
  position: relative;
  width: 80%;
  display: grid;

  display: grid;
  grid-template-areas:
    "year homeplanet"
    "species films"
    "gender films"
    ". films"
    ". films"
    ". films"
    ". films"
    ". films"
    ". films"
    ". films"
    ". films";
  text-align: left;
}

.card__userpic {
  font-size: 48px;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background: #bb86fc;
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
}

.opened .card__userpic {
  margin-right: 16px;
}

.card__hidden-element {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
  position: relative;
  margin-bottom: 20px;
}

.card__hidden-element:last-child {
  margin-bottom: 0;
}

.card__hidden-element:before {
  content: "";
  position: absolute;
  height: 20px;
  width: 20px;
}

.card__hidden-element--year {
  grid-area: year;
}

.card__hidden-element--year::before {
  background: url("../assets/calendar.png") no-repeat center;
  background-size: cover;
}

.card__hidden-element--homeplanet {
  grid-area: homeplanet;
}

.card__hidden-element--homeplanet::before {
  background: url("../assets/planet.png") no-repeat center;
  background-size: cover;
}

.card__hidden-element--species {
  grid-area: species;
}

.card__hidden-element--species::before {
  background: url("../assets/alien.png") no-repeat center;
  background-size: cover;
}

.card__hidden-element--films {
  grid-area: films;
}

.card__hidden-element--films::before {
  background: url("../assets/film.png") no-repeat center;
  background-size: cover;
}

.card__hidden-element--gender {
  grid-area: gender;
}

.card__hidden-element--gender::before {
  background: url("../assets/gender.png") no-repeat center;
  background-size: cover;
}

.loading-screen--card {
  background: #1a1a1a !important;
}
.loading-screen--card .loading-screen__path {
  margin: 0;
}

.card__fade-enter-active,
.card__fade-leave-active {
  transition: opacity 0.5s;
  transition-delay: 0s;
}

.card__fade-enter,
.card__fade-leave-to {
  opacity: 0;
  transition-delay: 0s;
}

@media (max-width: 768px) {
  .opened .card__information {
    width: 100%;
    height: 100%;
  }

  .key,
  .value {
    font-size: 16px;
  }

  .card__hidden {
    position: relative;
    width: 80%;
    display: flex;
    flex-direction: column;

    text-align: left;
  }

  .opened .card__visible {
    margin-bottom: 50px;
    padding-bottom: 50px;
  }
}
</style>
