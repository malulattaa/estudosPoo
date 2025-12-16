const livrosCadastrados = []

class Livro {
    constructor(codigo, titulo) {
        this.codigo = codigo
        this.titulo = titulo
        this.horaEmprestimo = null
        this.horaDevolucao = null
    }
}

class LivroFisico extends Livro {
    constructor(codigo, titulo) {
        super(codigo, titulo)
        this.tipo = "Físico"
    }
}

class Ebook extends Livro {
    constructor(codigo, titulo) {
        super(codigo, titulo)
        this.tipo = "Ebook"
    }
}

class Biblioteca {
    constructor() {
        this.emprestados = []
        this.historico = []
    }

    emprestar(livro) {
        livro.horaEmprestimo = new Date().toLocaleTimeString()
        this.emprestados.push(livro)

        this.historico.push({
            codigo: livro.codigo,
            titulo: livro.titulo,
            tipo: livro.tipo,
            horaEmprestimo: livro.horaEmprestimo,
            horaDevolucao: null
        })
    }

    devolver(codigo) {
        const livro = this.emprestados.find(l => l.codigo === codigo)
        if (!livro) return alert("Livro não encontrado")

        const hora = new Date().toLocaleTimeString()
        livro.horaDevolucao = hora

        const hist = this.historico.find(h => h.codigo === codigo && h.horaDevolucao === null)
        hist.horaDevolucao = hora

        this.emprestados.splice(this.emprestados.indexOf(livro), 1)
    }

    listarEmprestados() {
        return this.emprestados
    }

    listarHistorico() {
        return this.historico
    }
}

const bib = new Biblioteca()

function cadastrarLivro() {
    const codigo = codigo.value
    const titulo = titulo.value
    const tipo = document.getElementById("tipo").value

    let livro = tipo === "fisico"
        ? new LivroFisico(codigo, titulo)
        : new Ebook(codigo, titulo)

    livrosCadastrados.push(livro)
}

function emprestar() {
    const cod = codigoEmprestimo.value
    const livro = livrosCadastrados.find(l => l.codigo === cod)
    if (livro) bib.emprestar(livro)
}

function devolver() {
    bib.devolver(codigoDevolucao.value)
}

function listarEmprestados() {
    saida.innerText = JSON.stringify(bib.listarEmprestados(), null, 2)
}

function listarHistorico() {
    saida.innerText = JSON.stringify(bib.listarHistorico(), null, 2)
}
