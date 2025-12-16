const animaisCadastrados = []

class Animal {
    constructor(nome, tipo){
        this.nome = nome
        this.tipo = tipo
        this.horaEntrada = null
        this.horaSaida = null
    }
}

class Clinica {
    constructor(){
        this.animaisAtendimento = []
        this.historico = []
    }

    registrarEntrada(animal){
        animal.horaEntrada = new Date().toLocaleTimeString()
        this.animaisAtendimento.push(animal)

        this.historico.push({
            nome: animal.nome,
            tipo: animal.tipo,
            horaEntrada: animal.horaEntrada,
            horaSaida: null
        })
    }

    registrarSaida(nome){
        const animal = this.animaisAtendimento.find(a => a.nome === nome)

        if(animal){
            const horaSaida = new Date().toLocaleTimeString()
            animal.horaSaida = horaSaida

            const hist = this.historico.find(h => h.nome === nome && h.horaSaida === null)
            hist.horaSaida = horaSaida

            this.animaisAtendimento.splice(this.animaisAtendimento.indexOf(animal),1)
        }
    }

    listarAtuais(){ return this.animaisAtendimento }
    listarHistorico(){ return this.historico }
}

const clinica = new Clinica()

function cadastrarAnimal(){
    const nome = document.getElementById('nome').value
    const tipo = document.getElementById('tipo').value
    animaisCadastrados.push(new Animal(nome,tipo))
}

function registrarEntrada(){
    const nome = document.getElementById('nomeEntrada').value
    const animal = animaisCadastrados.find(a => a.nome === nome)
    if(animal) clinica.registrarEntrada(animal)
}

function registrarSaida(){
    const nome = document.getElementById('nomeSaida').value
    clinica.registrarSaida(nome)
}

function listarAtuais(){
    document.getElementById('saida').innerText =
    JSON.stringify(clinica.listarAtuais(),null,2)
}

function listarHistorico(){
    document.getElementById('saida').innerText =
    JSON.stringify(clinica.listarHistorico(),null,2)
}
