const pessoas = [
    { nome: 'Maria', idade: 20 },
    { nome: 'João', idade: 17 },
    { nome: 'Ana', idade: 22 }
]

// Recebe um nome

// Retorna o objeto da pessoa

// Se não encontrar, retorna null

let encontrado = null

function encontrar(nome){
    let encontrado = pessoas.find(pessoa => pessoa.nome === nome)
    

    if (!encontrado){
        console.log("pessoa n encontrada")
    }else{
        console.log(encontrado)
    }
    }

encontrar('Maria')