// https://pixabay.com/api/?key=23046575-92d847e59fe9fc6af83501ff5&q=yellow+flowers&image_type=photo
import axios from 'axios'
export { fetchImages, resetPages }


axios.defaults.baseURL = 'https://pixabay.com/api/'
      
// const KEY = '23046575-92d847e59fe9fc6af83501ff5'

let page = 1;
async function fetchImages(query) {

    const optionParam = new URLSearchParams(
    {
        key: '23046575-92d847e59fe9fc6af83501ff5',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: 40,
},
) 
//  `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,

    const {data} = await axios.get(
        `?${optionParam}`
    );
    page += 1;
    
    return data;
}

function resetPages() {
    page = 1;
}