// Crie uma função que:
// Recebe um nome
// Procura a pessoa
// Se encontrar:
// altera a idade para 18
// retorna true
// Se não encontrar:
// retorna false

const pessoas = [
    { nome: "Maria", idade: 20 },
    { nome: "João", idade: 17 },
    { nome: "Ana", idade: 22 },
];

function encontrar(nome) {
    for (let p of pessoas) {
        if (p.nome === nome) {
            p.idade = 18;
            console.log(p)
            return true;
        } 
    }
    console.log("Não encontrado")
    return false;

    }


encontrar("JoãoP");
