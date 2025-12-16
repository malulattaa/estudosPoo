// 1️⃣ Criar um array pessoas
// 2️⃣ Criar um objeto { nome, idade }
// 3️⃣ Guardar no array
// 4️⃣ Listar corretamente

function adicionarPessoa(){
const pessoas = []

const nome = document.getElementById('nome').value
const idade = document.getElementById('idade').value

const pessoa = {nome: nome, idade: idade}
pessoas.push(pessoa)

const ul = document.getElementById('lista')

for (let p of pessoas){
    ul.innerHTML = `<li> Nome: ${p.nome} | Idade: ${p.idade} </li>`
}}
