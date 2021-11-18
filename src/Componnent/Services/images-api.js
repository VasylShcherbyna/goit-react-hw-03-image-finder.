export const fetchImages = (query = '', pageNumber = 1) => {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${pageNumber}&key=22516391-185885990a61958acb3a57b33&image_type=photo&orientation=horizontal&per_page=12`,
  )
    .then(res => res.json())
    .then(data => {
      if (data.hits.length === 0) {
        throw new Error(`No photo on search query "${query}"`);
      } else {
        return data.hits;
      }
    });
};

export { fetchImages as default };
