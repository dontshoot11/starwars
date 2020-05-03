import axios from "axios";

const characterData = {
    state: {
        data: [],
        nextPage: 2,
        isLoading: true
    },
    actions: {},
    getters: {},
    mutations: {
        getData(state) {
            axios
                .get("https://swapi.dev/api/people/")
                .then(
                    response => ((state.data = response.data), (state.isLoading = false))
                );
        },
        loadNextPage(state) {
            let c = [];
            axios
                .get(`https://swapi.dev/api/people/?page=${state.nextPage}`)
                .then(response => {
                    if (response.status === 200) {
                        (c = response.data.results),
                        (state.data.results.push(c[0]),
                            state.data.results.push(c[1]),
                            state.data.results.push(c[2]),
                            state.data.results.push(c[3]),
                            state.data.results.push(c[4]),
                            state.data.results.push(c[5]),
                            state.data.results.push(c[6]),
                            state.data.results.push(c[7]),
                            state.data.results.push(c[8]),
                            state.data.results.push(c[9]));
                    }
                });

            state.nextPage++;
        },
        searchCharacters(state, inquiry) {
            axios
                .get(`https://swapi.dev/api/people/?search=${inquiry}`)
                .then(response => (state.data = response.data));
        },
    }
};

export default characterData;