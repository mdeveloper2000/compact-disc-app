const img = document.querySelector("img")
const right_arrow = document.querySelector(".right-arrow")
const left_arrow = document.querySelector(".left-arrow")

right_arrow.addEventListener("mouseover", () => {
    img.classList.remove("left")
    img.classList.add("right")
})

left_arrow.addEventListener("mouseover", () => {
    img.classList.remove("right")
    img.classList.add("left")
})