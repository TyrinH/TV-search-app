const searchForm = document.querySelector('#searchForm')

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();

    console.dir(searchForm.query.value)
})
const getTvShows = async () => {
    try {
        const res = await axios.get('https://api.tvmaze.com/search/shows?q=girls')
        console.log(res.data[0].show.name)

    } catch (e){
        console.log(e)

    }
}