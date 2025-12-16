const nomes = []

function adicionarNome(){
    const nome = document.getElementById('nome').value

    nomes.push(nome)

    atualizarDados()
}

function atualizarDados(){
    const ul = document.getElementById('mostrar')
    for (let n of nomes){
        ul.innerHTML += `<li> ${n} </li>`
    }

}

// Pergunta 1: O usuário digitou algo?
// ➡️ .value

// Pergunta 2: O texto está entre as tags?
// ➡️ .innerHTML ou .textContent

// Pergunta 3: Quero mexer no elemento?
// ➡️ getElementById