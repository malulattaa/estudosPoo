const produtos = [
    { nome: 'Mouse', preco: 50 },
    { nome: 'Teclado', preco: 100 },
    { nome: 'Monitor', preco: 900 }
]

function encontrar(produto){
    for (let t of produtos){
        if (t.nome === produto){
            console.log(t)
            return t
        }
    }}


encontrar('Teclado')