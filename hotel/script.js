const hospedesCadastrados = []

function cadastrarHospede(){
    const documento = document.getElementById('documento').value
    const nome = document.getElementById('nome').value
    const tipo = document.getElementById('tipo').value

    let hospede

    if(tipo === 'simples'){
        hospede = new HospedeSimples(documento, nome)
    }else if(tipo === 'premium'){
        hospede = new HospedePremium(documento, nome)
    }else{
        hospede = new HospedeVip(documento, nome)
    }

    hospedesCadastrados.push(hospede)
    alert("Hóspede cadastrado!")
}

function registrarEntrada(){
    const doc = document.getElementById('docEntrada').value
    const hospede = hospedesCadastrados.find(h => h.documento === doc)

    if(hospede){
        hotel.registrarEntrada(hospede)
        alert("Check-in realizado")
    }
}

function registrarSaida(){
    const doc = document.getElementById('docSaida').value
    hotel.registrarSaida(doc)
}

function listarAtuais(){
    const saida = document.getElementById('saida')
    saida.innerHTML = ""

    for(let h of hotel.listarHospedesAtuais()){
        saida.innerHTML += `
        <p>
        Documento: ${h.documento}<br>
        Nome: ${h.nome}<br>
        Quarto: ${h.tipoQuarto}<br>
        Entrada: ${h.horaEntrada}
        </p>
        `
    }
}

function listarHistorico(){
    const saida = document.getElementById('saida')
    saida.innerHTML = ""

    for(let h of hotel.listarHistorico()){
        saida.innerHTML += `
        <p>
        Documento: ${h.documento}<br>
        Nome: ${h.nome}<br>
        Quarto: ${h.tipoQuarto}<br>
        Entrada: ${h.horaEntrada}<br>
        Saída: ${h.horaSaida}
        </p>
        `
    }
}

/* ===== CLASSES ===== */

class Hospede{
    constructor(documento, nome){
        this.documento = documento
        this.nome = nome
        this.horaEntrada = null
        this.horaSaida = null
    }
}

class HospedeSimples extends Hospede{
    constructor(documento, nome){
        super(documento, nome)
        this.tipoQuarto = 'Simples'
        this.valorDiaria = 100
    }
}

class HospedePremium extends Hospede{
    constructor(documento, nome){
        super(documento, nome)
        this.tipoQuarto = 'Premium'
        this.valorDiaria = 200
    }
}

class HospedeVip extends Hospede{
    constructor(documento, nome){
        super(documento, nome)
        this.tipoQuarto = 'VIP'
        this.valorDiaria = 350
    }
}

class Hotel{
    constructor(){
        this.hospedesAtuais = []
        this.historico = []
    }

    registrarEntrada(hospede){
        hospede.horaEntrada = new Date().toLocaleTimeString()
        this.hospedesAtuais.push(hospede)

        const hist = {
            documento: hospede.documento,
            nome: hospede.nome,
            tipoQuarto: hospede.tipoQuarto,
            horaEntrada: hospede.horaEntrada,
            horaSaida: null
        }

        this.historico.push(hist)
    }

    registrarSaida(documento){
        const h = this.hospedesAtuais.find(h => h.documento === documento)

        if(h){
            const horaSaida = new Date().toLocaleTimeString()
            h.horaSaida = horaSaida

            const hist = this.historico.find(
                x => x.documento === documento && x.horaSaida === null
            )

            if(hist){
                hist.horaSaida = horaSaida
            }

            const index = this.hospedesAtuais.indexOf(h)
            this.hospedesAtuais.splice(index, 1)
        }
    }

    listarHospedesAtuais(){
        return this.hospedesAtuais
    }

    listarHistorico(){
        return this.historico
    }
}

const hotel = new Hotel()
