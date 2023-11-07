function displayAutores(Autores) {
    const tbody = document.getElementById("listaAutores");
    tbody.innerHTML = ""; // Limpar a tabela

    autores.forEach(autores => {
        const row = tbody.insertRow();

        const nomeCell = row.insertCell(0);
        tituloCell.textContent = Autores.Nome;

        const biografiaCell = row.insertCell(1);
        autorCell.textContent = Autores.biografia;

        const dataCell = row.insertCell(2);
        dataCell.textContent = new Date(Autores.dataNascimento).toLocaleDateString();

        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `<button class="icon-btn" onclick='editarAutores(${JSON.stringify(autores)})'>
        <i class="fas fa-edit"></i> Editar
    </button>
    <button class="icon-btn" onclick="deleteAutores(${autores.id})">
    <i class="fas fa-trash"></i> Excluir
    </button>`;
    });
}

function fetchAutores() {
    fetch("/api/autores")
        .then(res => res.json())
        .then(data => {
            displayAutores(data);
        })
        .catch(error => {
            console.error("Erro ao buscar autores:", error);
        });
}

function deleteAutores(id) {
    fetch(`/api/autores/${id}`, {
        method: "DELETE"
    })
    .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        fetchAutores();
    })
    .catch(error => {
        console.error("Erro ao deletar autores:", error);
    });
}

function editarAutores(autores) {
    const addBookBtn = document.getElementById("addBookBtn");
    const nome = document.getElementById("nome ");
    const biografia = document.getElementById("biografia");
    const datadeNascimento = document.getElementById("datadeNascimento");
    const autoresId= document.getElementById("id_autores");
    nome.value = livro.titulo;
    biografia.value = livro.autor;
    datadeNascimento.value = new Date(autores.datadeNascimento).toISOString().split('T')[0];
    autoresId.value = autores.id;
    addBookBtn.click();
/**/
}

function limparFormulario(){
    const nome = document.getElementById("nome");
    const biografia = document.getElementById("biografia");
    const datadeNascimento = document.getElementById("datadeNascimento");
    const autoresId= document.getElementById("id_autores");

    nome.value = "";
    biografia.value = "";
    datadeNascimento.value = "";
    autoresId.value = "";
}

document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "/api/autores";
    const bookForm = document.getElementById("bookForm");
    const bookPopup = document.getElementById("bookPopup");
    const addBookBtn = document.getElementById("addBookBtn");
    const closePopupBtn = document.getElementById("closePopupBtn");

    // Carregar livros ao carregar a página
    fetchAutores()

    // Mostrar popup ao clicar no botão "Adicionar Livro"
    addBookBtn.addEventListener("click", function() {
        bookPopup.classList.add("show");
        bookPopup.classList.remove("hidden");
    });

    // Fechar popup
    closePopupBtn.addEventListener("click", function() {
        bookPopup.classList.add("hidden");
        bookPopup.classList.remove("show");
        limparFormulario();
    });

    // Adicionar novo livro ou atualizar um existente
    bookForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const biografia = document.getElementById("biografia").value;
        const datadeNascimento = document.getElementById("datadeNascimento").value;
        const autoresId= document.getElementById("id_autores").value;

        let methodSalvar = "POST";
        let apiUrlSalvar = apiUrl;
        if(autoresId != "" && autoresId > 0){
            methodSalvar = "PUT";
            apiUrlSalvar += "/" + autoresId;
        }
    
        fetch(apiUrlSalvar, {
            method: methodSalvar,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, biografia, datadeNascimento })
        })
        .then(res => {
            if (res.ok && res.status == "201") return res.json();
            else if (res.ok && res.status == "204") return;
            throw new Error(res.statusText);
        })
        .then(data => {
            fetchAutores();
            limparFormulario();
            closePopupBtn.click();
        })
        .catch(error => {
            console.error("Erro ao adicionar/atualizar autor:", error);
        });
    
    });
});
