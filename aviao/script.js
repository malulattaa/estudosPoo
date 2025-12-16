const voosCadastrados = []

class Voo {
    constructor(codigo,tipo){
        this.codigo = codigo
        this.tipo = tipo
        this.horaDecolagem = null
        this.horaPouso = null
    }
}

class Aeroporto {
    constructor(){
        this.voosAtivos = []
        this.historico = []
    }

    decolar(voo){
        voo.horaDecolagem = new Date().toLocaleTimeString()
        this.voosAtivos.push(voo)
        this.historico.push({...voo})
    }

    pousar(codigo){
        const voo = this.voosAtivos.find(v => v.codigo === codigo)
        if(voo){
            voo.horaPouso = new Date().toLocaleTimeString()
            const hist = this.historico.find(h => h.codigo===codigo && !h.horaPouso)
            hist.horaPouso = voo.horaPouso
            this.voosAtivos.splice(this.voosAtivos.indexOf(voo),1)
        }
    }
}

const aeroporto = new Aeroporto()

function cadastrarVoo(){
    voosCadastrados.push(new Voo(
        codigo.value, tipo.value
    ))
}

function decolar(){
    const voo = voosCadastrados.find(v=>v.codigo===codigoEntrada.value)
    if(voo) aeroporto.decolar(voo)
}

function pousar(){
    aeroporto.pousar(codigoSaida.value)
}

function listarAtivos(){
    saida.innerText = JSON.stringify(aeroporto.voosAtivos,null,2)
}
function listarHistorico(){
    saida.innerText = JSON.stringify(aeroporto.historico,null,2)
}
