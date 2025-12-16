const produtos = []

class Produto {
    constructor(nome,tipo){
        this.nome = nome
        this.tipo = tipo
        this.horaEntrada = null
        this.horaSaida = null
    }
}

class Estoque {
    constructor(){
        this.disponiveis = []
        this.historico = []
    }

    entrada(prod){
        prod.horaEntrada = new Date().toLocaleTimeString()
        this.disponiveis.push(prod)
        this.historico.push({...prod})
    }

    saida(nome){
        const prod = this.disponiveis.find(p=>p.nome===nome)
        if(prod){
            prod.horaSaida = new Date().toLocaleTimeString()
            const hist = this.historico.find(h=>h.nome===nome && !h.horaSaida)
            hist.horaSaida = prod.horaSaida
            this.disponiveis.splice(this.disponiveis.indexOf(prod),1)
        }
    }
}

const estoque = new Estoque()

function cadastrar(){
    produtos.push(new Produto(nome.value,tipo.value))
}
function entrada(){
    const p = produtos.find(p=>p.nome===nomeEntrada.value)
    if(p) estoque.entrada(p)
}
function saidaProduto(){
    estoque.saida(nomeSaida.value)
}
function listarAtuais(){
    saida.innerText = JSON.stringify(estoque.disponiveis,null,2)
}
function listarHistorico(){
    saida.innerText = JSON.stringify(estoque.historico,null,2)
}
