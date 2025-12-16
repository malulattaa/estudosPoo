const pessoas = []

class Pessoa {
    constructor(cpf, nome) {
        this.cpf = cpf
        this.nome = nome
    }
}

class Evento {
    constructor() {
        this.presentes = []
        this.historico = []
    }

    entrar(p) {
        const hora = new Date().toLocaleTimeString()
        this.presentes.push(p)
        this.historico.push({ cpf: p.cpf, nome: p.nome, entrada: hora, saida: null })
    }

    sair(cpf) {
        const p = this.presentes.find(x => x.cpf === cpf)
        if (p) {
            const hora = new Date().toLocaleTimeString()
            const h = this.historico.find(x => x.cpf === cpf && x.saida === null)
            if (h) h.saida = hora
            this.presentes.splice(this.presentes.indexOf(p), 1)
        }
    }
}

const ev = new Evento()

function cadastrar() {
    pessoas.push(new Pessoa(cpf.value, nome.value))
}

function entrada() {
    const p = pessoas.find(x => x.cpf === cpfEntrada.value)
    if (p) ev.entrar(p)
}

function saida() {
    ev.sair(cpfSaida.value)
}

function listar() {
    res.innerText = JSON.stringify(ev.presentes, null, 2)
}

function historico() {
    res.innerText = JSON.stringify(ev.historico, null, 2)
}
