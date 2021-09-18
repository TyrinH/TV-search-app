
const getTvShows = async () => {
    try {
        const res = await axios.get('https://api.tvmaze.com/search/shows?q=girls')
        console.log(res.data)

    } catch (e){
        console.log(e)

    }
}