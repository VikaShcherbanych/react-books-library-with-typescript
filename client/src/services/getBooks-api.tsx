const API_KEY = 'AIzaSyCdKkZkP9Nhs2RAnhVWdIsglXs0atKxwiU';
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

interface IRequest {
    request: string,
    page?: number,
}

async function getPopularBooks () {
    //const url='https://www.googleapis.com/books/v1/volumes?q=${name}&key=AIzaSyCdKkZkP9Nhs2RAnhVWdIsglXs0atKxwiU'
    const url= 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=pjDx1UgcbMBBNQg7RGulL8yTvwUeGYgc'
    const response = await fetch(url)
    return response.ok ?  await response.json(): Promise.reject(new Error("No response from server"));
};

async function getBookByRequest({request, page=1}:IRequest) {
    request = request.trim();
    console.log(request)
    const url=`${BASE_URL}?q=${request}&startIndex=${page * 20+1}&maxResults=20&key=${API_KEY}`

    if (!request) { return };
  
    const response =  await fetch(url);
    return response.ok ? await response.json(): Promise.reject(new Error(`No results on request ${request}`));
};
  
async function getBookInfoById(id: string) {
    const url = `${BASE_URL}/${id}/?api_key=${API_KEY}`;
    if(!id){return}
    const response = await fetch(url)
    return response.ok ?  await response.json(): Promise.reject(new Error("No response from server"));
};
    
const getBookAPI = {
    getPopularBooks,
    getBookByRequest,
    getBookInfoById,
};
  
export default getBookAPI;