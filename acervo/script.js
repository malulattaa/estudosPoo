// ========================
// LISTAS GERAIS
// ========================
const acervo = []

// ========================
// FUNÇÕES HTML
// ========================
function cadastrarItem(){
    const codigo = document.getElementById('codigo').value
    const titulo = document.getElementById('titulo').value
    const tipo = document.getElementById('tipo').value
    const extra = document.getElementById('extra').value

    let item

    if(tipo === 'livro'){
        item = new Livro(codigo, titulo, extra)
    }else if(tipo === 'revista'){
        item = new Revista(codigo, titulo, extra)
    }else{
        item = new DVD(codigo, titulo, extra)
    }

    acervo.push(item)
    alert("Item cadastrado com sucesso!")
}

function registrarEmprestimo(){
    const codigo = document.getElementById('codigoEmprestimo').value
    const item = acervo.find(i => i.codigo === codigo)

    if(item){
        biblioteca.registrarEmprestimo(item)
    }else{
        alert("Item não encontrado")
    }
}

function registrarDevolucao(){
    const codigo = document.getElementById('codigoDevolucao').value
    biblioteca.registrarDevolucao(codigo)
}

function listarEmprestados(){
    const saida = document.getElementById('saida')
    const lista = biblioteca.listarEmprestados()

    saida.innerHTML = ""
    for(let i of lista){
        saida.innerHTML += `
Código: ${i.codigo}
Título: ${i.titulo}
Tipo: ${i.tipo}
Hora empréstimo: ${i.horaEmprestimo}

-----------------------
`
    }
}

function listarHistorico(){
    const saida = document.getElementById('saida')
    const lista = biblioteca.listarHistorico()

    saida.innerHTML = ""
    for(let h of lista){
        saida.innerHTML += `
Código: ${h.codigo}
Título: ${h.titulo}
Tipo: ${h.tipo}
Entrada: ${h.horaEmprestimo}
Saída: ${h.horaDevolucao}

-----------------------
`
    }
}

// ========================
// CLASSES
// ========================
class ItemAcervo{
    constructor(codigo, titulo){
        this.codigo = codigo
        this.titulo = titulo
        this.horaEmprestimo = null
        this.horaDevolucao = null
    }
}

class Livro extends ItemAcervo{
    constructor(codigo, titulo, autor){
        super(codigo, titulo)
        this.autor = autor
        this.tipo = "Livro"
    }
}

class Revista extends ItemAcervo{
    constructor(codigo, titulo, edicao){
        super(codigo, titulo)
        this.edicao = edicao
        this.tipo = "Revista"
    }
}

class DVD extends ItemAcervo{
    constructor(codigo, titulo, duracao){
        super(codigo, titulo)
        this.duracao = duracao
        this.tipo = "DVD"
    }
}

class Biblioteca{
    constructor(){
        this.itensEmprestados = []
        this.historico = []
    }

    registrarEmprestimo(item){
        if(this.itensEmprestados.includes(item)){
            alert("Item já emprestado")
            return
        }

        item.horaEmprestimo = new Date().toLocaleTimeString()
        item.horaDevolucao = null

        this.itensEmprestados.push(item)

        const hist = {
            codigo: item.codigo,
            titulo: item.titulo,
            tipo: item.tipo,
            horaEmprestimo: item.horaEmprestimo,
            horaDevolucao: null
        }

        this.historico.push(hist)
        alert("Empréstimo registrado")
    }

    registrarDevolucao(codigo){
        const item = this.itensEmprestados.find(i => i.codigo === codigo)

        if(item){
            const hora = new Date().toLocaleTimeString()
            item.horaDevolucao = hora

            const hist = this.historico.find(h => h.codigo === codigo && h.horaDevolucao === null)
            if(hist){
                hist.horaDevolucao = hora
            }

            const index = this.itensEmprestados.indexOf(item)
            this.itensEmprestados.splice(index, 1)

            alert("Devolução registrada")
        }else{
            alert("Item não está emprestado")
        }
    }

    listarEmprestados(){
        return this.itensEmprestados
    }

    listarHistorico(){
        return this.historico
    }
}

// ========================
const biblioteca = new Biblioteca()
