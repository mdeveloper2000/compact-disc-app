const message = document.querySelector(".message")
document.querySelectorAll(".button-danger").forEach(button => {
    button.addEventListener("click", async () => {
        try {
            const response = await fetch("/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: button.dataset.id })
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
            message.innerHTML = "<span>Erro ao excluir disco</span>"
        }
    })
})