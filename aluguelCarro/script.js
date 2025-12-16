const veiculosCadastrados = []

class Veiculo {
    constructor(placa, modelo) {
        this.placa = placa
        this.modelo = modelo
        this.horaInicio = null
        this.horaFim = null
    }
}

class Popular extends Veiculo {
    constructor(placa, modelo) {
        super(placa, modelo)
        this.valorHora = 20
        this.tipo = "Popular"
    }
}

class SUV extends Veiculo {
    constructor(placa, modelo) {
        super(placa, modelo)
        this.valorHora = 40
        this.tipo = "SUV"
    }
}

class Luxo extends Veiculo {
    constructor(placa, modelo) {
        super(placa, modelo)
        this.valorHora = 80
        this.tipo = "Luxo"
    }
}

class Locadora {
    constructor() {
        this.disponiveis = []
        this.historico = []
    }

    alugar(veiculo) {
        veiculo.horaInicio = new Date().toLocaleTimeString()
        this.disponiveis.push(veiculo)

        this.historico.push({
            placa: veiculo.placa,
            modelo: veiculo.modelo,
            tipo: veiculo.tipo,
            horaInicio: veiculo.horaInicio,
            horaFim: null
        })
    }

    devolver(placa) {
        const v = this.disponiveis.find(v => v.placa === placa)
        if (!v) return

        const horaFim = new Date().toLocaleTimeString()
        v.horaFim = horaFim

        const h = this.historico.find(h => h.placa === placa && h.horaFim === null)
        if (h) h.horaFim = horaFim

        this.disponiveis.splice(this.disponiveis.indexOf(v), 1)
    }
}

const locadora = new Locadora()

function cadastrarVeiculo() {
    const placa = placa.value
    const modelo = modelo.value
    const tipo = tipo.value

    let v
    if (tipo === "popular") v = new Popular(placa, modelo)
    if (tipo === "suv") v = new SUV(placa, modelo)
    if (tipo === "luxo") v = new Luxo(placa, modelo)

    veiculosCadastrados.push(v)
}

function alugar() {
    const p = placaAlugar.value
    const v = veiculosCadastrados.find(v => v.placa === p)
    if (v) locadora.alugar(v)
}

function devolver() {
    locadora.devolver(placaDevolver.value)
}

function listarDisponiveis() {
    saida.innerText = JSON.stringify(locadora.disponiveis, null, 2)
}

function listarHistorico() {
    saida.innerText = JSON.stringify(locadora.historico, null, 2)
}
