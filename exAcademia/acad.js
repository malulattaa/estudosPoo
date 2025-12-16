// Desenvolva um sistema simples de controle de uma academia, com o objetivo de:
// Registrar alunos matriculados
// Registrar entrada e saída dos alunos
// Listar:
// alunos que estão treinando no momento
// histórico de todas as entradas e saídas
// 👤 Classe Aluno
// Cada aluno deve ter:
// matricula
// nome
// plano (mensal / trimestral / anual)
// horaEntrada (null se não estiver treinando)
// horaSaida (null enquanto estiver treinando)
// 🏢 Classe Academia
// A academia deve manter:
// Lista de alunos treinando no momento
// Lista de histórico de acessos
// ⚙️ Métodos obrigatórios
// A classe Academia deve ter:
// registrarEntrada(aluno)
// registrarSaida(matricula)
// listarAlunosAtuais()
// listarHistorico()
// 📄 Regras importantes
// Um aluno só pode entrar se estiver matriculado
// Um aluno não pode entrar duas vezes seguidas
// O histórico não deve ser perdido, mesmo que o aluno entre e saia várias vezes
// As entradas devem ser feitas pelo HTML
// A saída pode ser exibida no HTML ou console

const alunosMatriculados = []

function cadastrarAluno(){
    const matricula = document.getElementById('matricula').value
    const nome = document.getElementById('nome').value
    const plano = document.getElementById('plano').value

    let aluno

    if(plano === 'mensal'){
        aluno = new Aluno(matricula, nome, 'mensal')
    }else if(plano === 'trimestral'){
        aluno = new Aluno(matricula, nome, 'trimestral')
    }else{
        aluno = new Aluno(matricula, nome, 'anual')
    }
    alunosMatriculados.push(aluno)
    alert(`Aluno: ${nome} cadastrado com sucesso.`)
}

function registrarEntrada(){
    const matricula = document.getElementById('matriculaEntrada').value
    const verificarMatricula = alunosMatriculados.find(m => m.matricula===matricula)

    if(verificarMatricula){
        const jaTreinando = acad.alunosTreinando.find(e => e.matricula === matricula)
        if (jaTreinando){
            alert("O aluno já entrou na academia.")
        }else{
            acad.registrarEntrada(verificarMatricula)
            alert(`Entrada registrada de: ${verificarMatricula.nome}`)
        }
    }else{
        alert("O aluno não está matriculado")
    }
}

function registrarSaida(){
    const matricula = document.getElementById('matriculaSaida').value
    
    acad.registrarSaida(matricula)
}

function listarAtuais(){
    const mostrar = document.getElementById('saida')
    const alunosTreinando = acad.listarAlunosAtuais()

    mostrar.innerHTML = ""

    for (let a of alunosTreinando){
        mostrar.innerHTML += `
        <p>
        Matricula: ${a.matricula} <br>
        Nome: ${a.nome} <br>
        Plano: ${a.plano} <br>
        Hora de Entrada: ${a.horaEntrada} 
        </p>
        `
    }
}
function listarHistorico(){
    const mostrar = document.getElementById('saida')
    const historico = acad.listarHistorico()

    mostrar.innerHTML = ""

    for (let a of historico){
        mostrar.innerHTML += 
        `
        <p>
        Matricula: ${a.matricula} <br>
        Nome: ${a.nome} <br>
        Plano: ${a.plano} <br>
        Hora de Entrada: ${a.horaEntrada} <br>
        Hora de saída: ${a.horaSaida} <br>
        </p>
        `
    }
}

class Aluno{
    matricula
    nome
    plano
    horaEntrada
    horaSaida

    constructor(matricula, nome, plano){
        this.matricula = matricula;
        this.nome = nome;
        this.plano = plano;
        this.horaEntrada = null;
        this.horaSaida = null;
    }
}

class Academia{
    constructor(){
        this.alunosTreinando = []
        this.historicoAcesso = []
    }

    registrarEntrada(aluno){
        aluno.horaEntrada = new Date().toLocaleTimeString()
        this.alunosTreinando.push(aluno)
        const hist = {
            matricula: aluno.matricula,
            nome: aluno.nome,
            plano: aluno.plano,
            horaEntrada: aluno.horaEntrada,
            horaSaida: aluno.horaSaida
        }
        this.historicoAcesso.push(hist)
    }
    registrarSaida(matricula){
        const encontrarAluno = this.alunosTreinando.find(a => a.matricula === matricula)

        if (encontrarAluno){
            const horaSaida = new Date().toLocaleTimeString()

            encontrarAluno.horaSaida = horaSaida

            const hist = this.historicoAcesso.find(h => h.matricula===matricula && h.horaSaida === null)
            if (hist){
                hist.horaSaida = horaSaida
            }

            const index = this.alunosTreinando.indexOf(encontrarAluno)
            this.alunosTreinando.splice(index, 1)
            alert(`${encontrarAluno.nome} saiu com sucesso.`)
        }else{
            alert("Matrícula não encontrada. Verifique se o aluno está treinando ou se existe.")
        }
    }
    listarAlunosAtuais(){
        return this.alunosTreinando
    }
    listarHistorico(){
        return this.historicoAcesso
    }
}

const acad = new Academia()