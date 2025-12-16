// O sistema deve registrar:
// livros disponíveis
// livros emprestados
// Cada Livro deve ter:
// título
// autor
// código
// dataEmprestimo (null se estiver disponível)
// dataDevolucao (null enquanto emprestado)
// Classes obrigatórias
// Livro
// atributos comuns
// métodos simples (constructor)
// Biblioteca
// lista de livros disponíveis
// lista de histórico (todos os livros)
// métodos:
// registrarLivro(livro)
// emprestarLivro(codigo)
// devolverLivro(codigo)
// listarDisponiveis()
// listarHistorico()

function cadastrarLivro(){
    const titulo = document.getElementById('titulo').value
    const autor = document.getElementById('autor').value
    const codigo = document.getElementById('codigo').value

    const verificar = biblio.historicoLivros.find(v => v.codigo === codigo)
    if (verificar){
        alert("Um livro com este código já foi cadastrado.")
    }else{
        let livro = new Livro(titulo, autor, codigo)
        biblio.registrarLivro(livro)
        alert(`Livro ${titulo} cadastrado com sucesso!`)
    }
}

function emprestarLivro(){
    const codigo = document.getElementById('codigoEmprestimo').value
    // const procurarLivro = biblio.livrosDisponiveis.find(l => l.codigo === codigo)
        
    //     if(procurarLivro){
        biblio.emprestarLivro(codigo)
        
        // }


}
function devolverLivro(){
    const codigo = document.getElementById('codigoDevolucao').value
    // const procurarLivro = biblio.historicoLivros.find(l => l.codigo === codigo)

    // if (procurarLivro){
        biblio.devolverLivro(codigo)
        
    // }
}
function listarDisponiveis(){
    const saida = document.getElementById(`saida`)
    const livros = biblio.listarDisponiveis()

    saida.innerHTML = ""

    for (let i of livros){
        saida.innerHTML += 
        `
        <p>
        <strong>Título:</strong> ${i.titulo} |
        <strong>Autor:</strong> ${i.autor} |
        <strong>Código:</strong> ${i.codigo}
        </p>
        `
    }
    // saida.innerText = JSON.stringify(biblio.listarDisponiveis())
}

function listarHistorico(){
    const saida = document.getElementById('saida')
    // saida.innerText = JSON.stringify(biblio.listarHistorico())
    const livros = biblio.listarHistorico()

    saida.innerHTML = ""

    for (let i of livros){
        saida.innerHTML +=
        `
        <p>
        <strong>Título:</strong> ${i.titulo} |
        <strong>Autor:</strong> ${i.autor} |
        <strong>Código:</strong> ${i.codigo}
        <strong>Data empréstimo:</strong> ${i.dataEmprestimo}
        <strong>Dat devolução:</strong> ${i.dataDevolucao}
        </p>
        `
    }
}
class Livro{
    titulo
    autor
    codigo
    dataEmprestimo
    dataDevolucao

    constructor(titulo, autor, codigo){
        this.titulo = titulo;
        this.autor = autor;
        this.codigo = codigo;
        this.dataEmprestimo = null
        this.dataDevolucao = null
    }
}

class Biblioteca{
    constructor(){
        this.livrosDisponiveis = []
        this.historicoLivros = []
    }
    registrarLivro(livro){
        this.livrosDisponiveis.push(livro)
        this.historicoLivros.push(livro)
    }
    emprestarLivro(codigo){
        const procurarLivro = this.livrosDisponiveis.find(v=> v.codigo === codigo)
        
        if (procurarLivro){
            procurarLivro.dataEmprestimo = new Date().toLocaleDateString()
            procurarLivro.dataDevolucao = null
            const index = this.livrosDisponiveis.indexOf(procurarLivro)
            this.livrosDisponiveis.splice(index, 1)
            alert("Livro emprestado!")
        }else{
            alert("Livro não encontrado")
        }
        }
    devolverLivro(codigo){
        const procurarLivro = this.historicoLivros.find(v => v.codigo === codigo && v.dataDevolucao === null)

        if(procurarLivro){
            procurarLivro.dataDevolucao = new Date().toLocaleDateString()
            this.livrosDisponiveis.push(procurarLivro)
            alert(`O livro foi devolvido`)
        }else{
            alert("Livro não encontrado ou já devolvido")
        }
    }
    listarDisponiveis(){
        return this.livrosDisponiveis
    }
    listarHistorico(){
        return this.historicoLivros
    }
}
const biblio = new Biblioteca()