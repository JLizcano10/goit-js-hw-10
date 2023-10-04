import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_DHlp5NGvRs5fnEoXhrr0F8v2vDc8TRHXsd1tbJIS65MtuSnC7X4u7l9MTcYMn8DF';
const url = 'https://api.thecatapi.com/v1/';
const urlBreeds = `${url}breeds`;
const urlImages = `${url}images/search`;

function fetchBreeds() {
  return axios.get(urlBreeds).then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  return axios.get(`${urlImages}?breed_ids=${breedId}`).then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }

    return response.data;
  });
}

export { fetchBreeds, fetchCatByBreed };
