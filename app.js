const searchForm = document.querySelector('#searchForm')
const deleteBtn = document.querySelector('#deleteBtn')
const imgContainer = document.querySelector('#imgContainer')

searchForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const searchKey = searchForm.query.value
    const config = {params: {q: searchKey} }
    const res = await axios.get('https://api.tvmaze.com/search/shows', config)
    tvImages(res.data)
    searchForm.query.value = '';

})

deleteBtn.addEventListener('click', function(e) {
    let container = document.getElementById('imgContainer');
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }

})
const tvImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            //document.body.append(img)
            document.getElementById('imgContainer').appendChild(img)

        }
    }
}

