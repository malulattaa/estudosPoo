const numeros = [2, 5, 8, 10, 3]

let encontrado = false

function encontrar(numero){
    for (let i = 0; i<numeros.length; i++){
        if (numeros[i]===numero){
            console.log(`número encontrado na posição: ${i}`)
            return true
            break
        
        }}
        if(!encontrado){
            console.log(`numero ${numero} não encontrado`)
        }
    }
encontrar(63)