const passageiros = []

function cadastrarPassageiro(){
    const nome = document.getElementById('nome').value
    const doc = document.getElementById('doc').value

    const p = new Passageiro(nome, doc)
    passageiros.push(p)

    alert("Passageiro cadastrado")
}

function embarcar(){
    const doc = document.getElementById('docMov').value
    const p = passageiros.find(p => p.doc === doc)

    if(p){
        viagem.embarcar(p)
    }
}

function desembarcar(){
    const doc = document.getElementById('docMov').value
    viagem.desembarcar(doc)
}

function listarAtuais(){
    const out = document.getElementById('saida')
    out.innerHTML = ""

    for(let p of viagem.passageirosAtuais){
        out.innerHTML += `
        <p>
        ${p.nome} - Entrada: ${p.horaEntrada}
        </p>
        `
    }
}

function listarHistorico(){
    const out = document.getElementById('saida')
    out.innerHTML = ""

    for(let h of viagem.historico){
        out.innerHTML += `
        <p>
        ${h.nome} <br>
        Entrada: ${h.horaEntrada} <br>
        Saída: ${h.horaSaida}
        </p>
        `
    }
}

class Passageiro{
    constructor(nome, doc){
        this.nome = nome
        this.doc = doc
        this.horaEntrada = null
        this.horaSaida = null
    }
}

class Onibus{
    constructor(){
        this.passageirosAtuais = []
        this.historico = []
    }

    embarcar(p){
        p.horaEntrada = new Date().toLocaleTimeString()
        this.passageirosAtuais.push(p)

        this.historico.push({
            nome: p.nome,
            horaEntrada: p.horaEntrada,
            horaSaida: null
        })
    }

    desembarcar(doc){
        const p = this.passageirosAtuais.find(p => p.doc === doc)

        if(p){
            const hora = new Date().toLocaleTimeString()
            p.horaSaida = hora

            const h = this.historico.find(h => h.nome === p.nome && h.horaSaida === null)
            if(h) h.horaSaida = hora

            this.passageirosAtuais.splice(this.passageirosAtuais.indexOf(p), 1)
        }
    }
}

class OnibusInterestadual extends Onibus{
    embarcar(p){
        super.embarcar(p)
        console.log("Taxa interestadual aplicada")
    }
}

const viagem = new OnibusInterestadual()
