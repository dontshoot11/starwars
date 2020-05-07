import axios from "axios";

const swData = {
  state: {
    characterData: [],

    nextPage: 2,
    isLoading: true,
    isAdditionalLoading: false,
    isAdditionalLoadingAvailable: true
  },

  mutations: {
    getData(state) {
      axios
        .get("https://swapi.dev/api/people/")
        .then(response =>
          setTimeout(
            () => (
              (state.characterData = response.data), (state.isLoading = false)
            ),
            2000
          )
        );
    },
    loadNextPage(state) {
      function additionalDraw(response) {
        for (let i = 0; i < response.data.results.length; i++) {
          state.characterData.results.push(response.data.results[i]);

          console.log(state.isAdditionalLoading);
        }
      }

      axios
        .get(`https://swapi.dev/api/people/?page=${state.nextPage}`, {
          validateStatus: function(status) {
            return status === 200;
          }
        })
        .then(response => {
          state.isAdditionalLoading = true;

          setTimeout(() => additionalDraw(response), 500);
        })
        .catch(error => {
          console.log(error);
          state.isAdditionalLoading = false;
          state.isAdditionalLoadingAvailable = false;
        });
      state.nextPage++;
    },
    searchCharacters(state, inquiry) {
      axios
        .get(`https://swapi.dev/api/people/?search=${inquiry}`)
        .then(response => (state.characterData = response.data));
    }
  }
};

export default swData;
