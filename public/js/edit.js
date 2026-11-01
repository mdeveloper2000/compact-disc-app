const selectimage = document.querySelector(".button")
const fileinput = document.querySelector(".file")
const message = document.querySelector(".message")

selectimage.addEventListener("click", () => {
    fileinput.click()
})

fileinput.addEventListener("change", event => {
    const file = event.target.files[0]
    if(file) {
        const reader = new FileReader()
        reader.onload = function(e) {
            document.getElementById("preview").src = e.target.result
        }
        reader.readAsDataURL(file)
    }
})

const form = document.querySelector("form")
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const id = form.id.value
    const name = form.name.value.trim()
    const description = form.description.value.trim()
    const MAX_FILE_SIZE = 1024 * 1024            
    const file = form.image
    if(name === "") {
        message.innerHTML = "<span>Informe um nome para o disco</span>"
        return
    }
    else if(description === "") {
        message.innerHTML = "<span>Informe uma descrição para o disco</span>"
        return
    }
    if(file.files[0] !== undefined && file.files[0].size > MAX_FILE_SIZE) {
        message.innerHTML = "<span>Tamanho da imagem não pode ser maior que 1 MB</span>"
        return
    }
    else {
        try {
            const formData = new FormData()                    
            formData.append("id", id)
            formData.append("image", file.files[0])
            formData.append("name", name)
            formData.append("description", description)
            const response = await fetch("/update", {
                method: "POST",
                body: formData,                
                headers: {
                    "Accept": "application/json",
                }
            })
            const json = await response.json()            
            if(json.error === 0) {
                window.location.href = "/"
            }
            else {
                message.innerHTML = `<span>${json.message}</span>`                        
            }
        }
        catch(error) {
            message.innerHTML = "<span>Erro ao atualizar disco</span>"
        }
    }
})