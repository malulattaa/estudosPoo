// Sistema simples de pedidos de uma lanchonete

function fazerPedido(){
    const numero = document.getElementById('numero').value;
    const cliente = document.getElementById('cliente').value;
    const status = 'Aberto'; // Status do pedido

    // Criando um novo pedido
    const pedido = new Pedido(numero, cliente, status);

    // Chamar o método de adicionar o pedido
    lanchonete.novoPedido(pedido);

    alert(`Pedido ${numero} do cliente ${cliente} criado com sucesso!`);
}

function adicionarItem(){
    const item = document.getElementById('item').value;
    const numero = document.getElementById('numero').value;

    // Encontrando o pedido
    const pedido = lanchonete.pedidosAbertos.find(p => p.numero === numero);

    if(pedido) {
        pedido.adicionarItem(item);
        alert(`Item "${item}" adicionado ao pedido ${numero}.`);
    } else {
        alert(`Pedido ${numero} não encontrado!`);
    }
}

function finalizarPedido(){
    const numero = document.getElementById('numeroFinalizar').value;

    // Finalizando o pedido
    lanchonete.finalizarPedido(numero);
    alert(`Pedido ${numero} finalizado com sucesso!`);
}

function listarAbertos(){
    const mostrar = document.getElementById('saida');
    const pedidosAbertos = lanchonete.listarAbertos();

    mostrar.innerHTML = '';

    pedidosAbertos.forEach(pedido => {
        mostrar.innerHTML += `
            <p>
                Pedido Nº: ${pedido.numero} <br>
                Cliente: ${pedido.cliente} <br>
                Itens: ${pedido.itens.join(", ")} <br>
                Hora do Pedido: ${pedido.horaPedido} <br>
                Status: ${pedido.status}
            </p>
        `;
    });
}

function listarHistorico(){
    const mostrar = document.getElementById('saida');
    const historicoPedidos = lanchonete.listarHistorico();

    mostrar.innerHTML = '';

    historicoPedidos.forEach(pedido => {
        mostrar.innerHTML += `
            <p>
                Pedido Nº: ${pedido.numero} <br>
                Cliente: ${pedido.cliente} <br>
                Itens: ${pedido.itens.join(", ")} <br>
                Hora do Pedido: ${pedido.horaPedido} <br>
                Hora de Finalização: ${pedido.horaFinalizado} <br>
                Status: ${pedido.status}
            </p>
        `;
    });
}

class Pedido {
    numero
    cliente
    itens = []
    horaPedido
    horaFinalizado
    status

    constructor(numero, cliente, status) {
        this.numero = numero;
        this.cliente = cliente;
        this.itens = [];
        this.horaPedido = new Date().toLocaleTimeString();
        this.horaFinalizado = null;
        this.status = status;
    }

    adicionarItem(item) {
        this.itens.push(item);
    }
}

class Lanchonete {
    constructor() {
        this.pedidosAbertos = [];
        this.historicoPedidos = [];
    }

    novoPedido(pedido) {
        pedido.horaPedido = new Date().toLocaleTimeString();
        this.pedidosAbertos.push(pedido);
    }

    finalizarPedido(numero) {
        const pedido = this.pedidosAbertos.find(p => p.numero === numero);

        if (pedido) {
            pedido.horaFinalizado = new Date().toLocaleTimeString();
            pedido.status = 'Finalizado';

            // Mover para o histórico
            this.pedidosAbertos = this.pedidosAbertos.filter(p => p.numero !== numero);
            this.historicoPedidos.push(pedido);
        } else {
            alert(`Pedido de número ${numero} não encontrado.`);
        }
    }

    listarAbertos() {
        return this.pedidosAbertos;
    }

    listarHistorico() {
        return this.historicoPedidos;
    }
}

const lanchonete = new Lanchonete();
