// Desenvolva um sistema simples de controle de um estacionamento rotativo. O objetivo é registrar a entrada e saída de veículos, bem como listar:
// Veiculos que estão atualmente no estacionamento;
// veiculos que já passaram pelo estacionamento (histórico), incluindo os que já saíram.
// Para facilitar, o  sistema será feito em HTML + JavaScript, nosso foco é POO.
// O sistema deve ter um controle do veiculo com os dados de  placa, modelo, horaEntrada, horaSaida (pode ser null enquanto o carro estiver no estacionamento).

// Estacionamento: lista de veículos atualmente estacionados, lista de veículos que já passaram pelo estacionamento.

// Deve ter as funcionalidades de a) registrarEntrada(veiculo) b) registrarSaida(placa) c) listarVeiculosAtuais() e d)listarHistorico() 
// O estacionamento recebe diferentes tipos de veículos, e cada tipo possui características próprias: Carro, Moto e Caminhão

// Todos são veículos, compartilham atributos e comportamentos comuns, mas possuem regras específicas, como: Tipo de vaga ocupada; Valor de cobrança por hora; Informação adicional (ex.: número de eixos do caminhão).

//as entradas devem ser obrigatoriamente pelo html mas o resultado pode ser mostrado no terminal


const veiculosCadastrados = []

function cadastrarVeiculo(){
    const placa = document.getElementById('placa').value
    const modelo = document.getElementById('modelo').value
    const cor = document.getElementById('cor').value
    const ano = document.getElementById('ano').value
    const tipo = document.getElementById('tipo').value
    const eixo = document.getElementById('eixo').value
    
    let veiculo
    
    if (tipo === 'carro'){
        veiculo = new Carro(placa, modelo, cor, ano)
    }else if(tipo === 'moto'){
        veiculo = new Moto(placa, modelo, cor, ano)
    }else{
        veiculo = new Caminhao(placa, modelo, cor, ano, eixo)
    }
    
    veiculosCadastrados.push(veiculo)
    alert(`Veiculo de placa: ${placa} cadastrado com sucesso!`)
}

function registroEntrada(){
    const placa = document.getElementById('placaEntrada').value
    const encontrarVeiculo = veiculosCadastrados.find(v => v.placa === placa)

    if (encontrarVeiculo){
        estacionar.registrarEntrada(encontrarVeiculo)
        alert(`O veiculo placa ${placa} entrou no estacionamento`)
    }
}
function registroSaida(){
    const placa = document.getElementById('placaSaida').value
    const encontrarVeiculo = veiculosCadastrados.find(v => v.placa === placa)

    if (encontrarVeiculo){
        estacionar.registrarSaida(placa)
        alert(`O veiculo de placa ${placa} saiu do estacionamento`)
    }
}
function listarAtuais(){
    const mostrar = document.getElementById('saida')
    const vAtuais = estacionar.listarVeiculosAtuais()
    //mostrar.innerText = JSON.stringify(estacionar.listarVeiculosAtuais(), null, 2)
    mostrar.innerHTML = ""

    for (let i of vAtuais){
        mostrar.innerHTML += `
        <p>
        <strong>Placa:</strong> ${i.placa}
        <strong>modelo:</strong> ${i.modelo}
        <strong>cor</strong> ${i.cor}
        <strong>ano</strong> ${i.ano}
        <strong>hora de entrada</strong> ${i.horaEntrada}
        <strong>horaSaida</strong> ${i.horaSaida}
        <strong>Tipo da vaga</strong> ${i.tipoVaga}
        <strong>Valor cobrança </strong> ${i.valorCobranca}
        <strong>Eixo (se caminhão) </strong> ${i.eixo}
        </p>
        `
    }
}
function listarHistorico(){
    const mostrar = document.getElementById('saida')
    const vHistorico = estacionar.listarHistorico()
    //mostrar.innerText = JSON.stringify(estacionar.listarHistorico(), null, 2)

    mostrar.innerHTML = ""

    for (let i of vHistorico){
        mostrar.innerHTML += `
        <p>
        <strong>Placa:</strong> ${i.placa}
        <strong>modelo:</strong> ${i.modelo}
        <strong>cor</strong> ${i.cor}
        <strong>ano</strong> ${i.ano}
        <strong>hora de entrada</strong> ${i.horaEntrada}
        <strong>horaSaida</strong> ${i.horaSaida}
        <strong>Tipo da vaga</strong> ${i.tipoVaga}
        <strong>Valor cobrança </strong> ${i.valorCobranca}
        <strong>Eixo (se caminhão) </strong> ${i.eixo}
        </p>
        `
    }
}
class Veiculo{
    placa
    modelo
    cor
    ano
    horaEntrada
    horaSaida

    constructor(placa, modelo, cor, ano){
        this.placa = placa;
        this.modelo = modelo;
        this.cor = cor;
        this.ano = ano;
        this.horaEntrada = null;
        this.horaSaida = null;
    }
}

class Carro extends Veiculo{
    tipoVaga
    valorCobranca

    constructor(placa, modelo, cor, ano){
        super(placa, modelo, cor, ano)
        this.tipoVaga = 'carro'
        this.valorCobranca = 6.00
    }
}

class Moto extends Veiculo{
    tipoVaga
    valorCobranca

    constructor(placa, modelo, cor, ano){
        super(placa, modelo, cor, ano)
        this.tipoVaga = 'moto'
        this.valorCobranca = 2.00
    }
}
class Caminhao extends Veiculo{
    tipoVaga
    valorCobranca
    eixo

    constructor(placa, modelo, cor, ano, eixo){
        super(placa, modelo, cor, ano)
        this.tipoVaga = 'caminhao'
        this.valorCobranca = 3.00
        this.eixo = eixo
    }
}

class Estacionamento{
    constructor(){
        this.veiculosEstacionados = []
        this.historicoVeiculos = []
    }
    registrarEntrada(veiculo){
        veiculo.horaEntrada = new Date().toLocaleTimeString()
        
        this.veiculosEstacionados.push(veiculo)
        // this.historicoVeiculos.push(veiculo)
        const hist = {
            placa: veiculo.placa,
            modelo: veiculo.modelo,
            cor: veiculo.cor,
            ano: veiculo.ano,
            horaEntrada: veiculo.horaEntrada,
            horaSaida: null,
            tipoVaga: veiculo.tipoVaga,
            valorCobranca: veiculo.valorCobranca,
            eixo: veiculo.eixo
        }
        this.historicoVeiculos.push(hist)
    }
    registrarSaida(placa){
        const busca = this.veiculosEstacionados.find(v => v.placa === placa && v.horaSaida === null)

        if(busca){
            const horaSaida = new Date().toLocaleTimeString()
            busca.horaSaida = horaSaida

            const hist = this.historicoVeiculos.find(h => h.placa === placa && h.horaSaida === null)

            if(hist){
                hist.horaSaida = horaSaida
            }

            const index = this.veiculosEstacionados.indexOf(busca)

            this.veiculosEstacionados.splice(index, 1)

        }
    }
    listarVeiculosAtuais(){
        return this.veiculosEstacionados
        
    }
    listarHistorico(){
        return this.historicoVeiculos
    }
}

const estacionar = new Estacionamento()