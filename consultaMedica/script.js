const pacientes = []

class Paciente {
    constructor(nome) {
        this.nome = nome
        this.entrada = null
        this.saida = null
    }
}

class Consultorio {
    constructor() {
        this.atendendo = []
        this.historico = []
    }

    entrada(p) {
        p.entrada = new Date().toLocaleTimeString()
        this.atendendo.push(p)
        this.historico.push({ nome: p.nome, entrada: p.entrada, saida: null })
    }

    saida(nome) {
        const p = this.atendendo.find(x => x.nome === nome)
        if (p) {
            const hora = new Date().toLocaleTimeString()
            p.saida = hora
            const h = this.historico.find(x => x.nome === nome && x.saida === null)
            if (h) h.saida = hora
            this.atendendo.splice(this.atendendo.indexOf(p), 1)
        }
    }
}

const cons = new Consultorio()

function cadastrar() {
    pacientes.push(new Paciente(nome.value))
}

function entrada() {
    const p = pacientes.find(x => x.nome === nomeEntrada.value)
    if (p) cons.entrada(p)
}

function saidaPaciente() {
    cons.saida(nomeSaida.value)
}

function atuais() {
    out.innerText = JSON.stringify(cons.atendendo, null, 2)
}

function historico() {
    out.innerText = JSON.stringify(cons.historico, null, 2)
}
