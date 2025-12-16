const clientes = []

function cadastrarCliente(){
    const nome = document.getElementById('nome').value
    const numero = document.getElementById('numero').value
    const tipo = document.getElementById('tipo').value

    let conta

    if(tipo === 'corrente'){
        conta = new ContaCorrente(numero, nome)
    }else{
        conta = new ContaPoupanca(numero, nome)
    }

    clientes.push(conta)
    alert("Conta cadastrada com sucesso!")
}

function depositar(){
    const numero = document.getElementById('numeroMov').value
    const valor = Number(document.getElementById('valor').value)

    const conta = clientes.find(c => c.numero === numero)

    if(conta){
        banco.depositar(conta, valor)
    }
}

function sacar(){
    const numero = document.getElementById('numeroMov').value
    const valor = Number(document.getElementById('valor').value)

    banco.sacar(numero, valor)
}

function listarContas(){
    const out = document.getElementById('saida')
    out.innerHTML = ""

    for(let c of banco.contasAtivas){
        out.innerHTML += `
        <p>
        Conta: ${c.numero} <br>
        Cliente: ${c.nome} <br>
        Saldo: ${c.saldo}
        </p>
        `
    }
}

function listarHistorico(){
    const out = document.getElementById('saida')
    out.innerHTML = ""

    for(let h of banco.historico){
        out.innerHTML += `
        <p>
        Conta: ${h.numero} <br>
        Tipo: ${h.tipo} <br>
        Valor: ${h.valor}
        </p>
        `
    }
}

class Conta{
    constructor(numero, nome){
        this.numero = numero
        this.nome = nome
        this.saldo = 0
    }

    depositar(valor){
        this.saldo += valor
    }

    sacar(valor){
        this.saldo -= valor
    }
}

class ContaCorrente extends Conta{
    sacar(valor){
        super.sacar(valor + 2) // taxa
    }
}

class ContaPoupanca extends Conta{
    depositar(valor){
        super.depositar(valor * 1.01) // rendimento
    }
}

class Banco{
    constructor(){
        this.contasAtivas = []
        this.historico = []
    }

    depositar(conta, valor){
        conta.depositar(valor)
        this.contasAtivas.push(conta)

        this.historico.push({
            numero: conta.numero,
            tipo: 'Depósito',
            valor
        })
    }

    sacar(numero, valor){
        const conta = this.contasAtivas.find(c => c.numero === numero)

        if(conta){
            conta.sacar(valor)

            this.historico.push({
                numero,
                tipo: 'Saque',
                valor
            })
        }
    }
}

const banco = new Banco()
