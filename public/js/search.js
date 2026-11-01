const button = document.querySelector("#pesquisa")
button.addEventListener("click", () => {
    const query = document.querySelector("#search").value.trim()
    if(query !== "") {
        window.location.href = `/search/${encodeURIComponent(query)}`
    }
})