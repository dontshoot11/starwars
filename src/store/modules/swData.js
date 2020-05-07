import axios from "axios";

const swData = {
  state: {
    characterData: [],

    nextPage: 2,
    isLoading: true,
    isAdditionalLoading: false,
    isAdditionalLoadingAvailable: true,
    isThisIsTheEnd: false
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
          state.isAdditionalLoadingAvailable = true;
        }
      }
      state.isAdditionalLoading = true;
      state.isAdditionalLoadingAvailable = false;

      axios
        .get(`https://swapi.dev/api/people/?page=${state.nextPage}`, {
          validateStatus: function(status) {
            return status === 200;
          }
        })
        .then(response => {
          setTimeout(() => additionalDraw(response), 1000);
        })
        .catch(error => {
          console.log(error);
          state.isAdditionalLoading = false;
          state.isThisIsTheEnd = true;
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
