// https://pixabay.com/api/?key=23046575-92d847e59fe9fc6af83501ff5&q=yellow+flowers&image_type=photo
import axios from 'axios'
export { fetchImages }

axios.defaults.baseURL = 'https://pixabay.com/api/'
      
const KEY = '23046575-92d847e59fe9fc6af83501ff5'

async function fetchImages(query, page, perPage) {

const optionParam = {
    params: {
        key: '23046575-92d847e59fe9fc6af83501ff5',
        q: currentQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page,
        per_page: 40,
},
}
//  `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,

  const response = await axios.get(
    , optionParam
  )
  return response
}