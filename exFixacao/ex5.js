const historico = []
function registrarAcao(registro){
    historico.push(registro)


}

registrarAcao({nome: 'maria', acao: 'entrou'})
registrarAcao({nome: 'joão', acao: 'saiu'})

for (let obj of historico){
    console.log(`Nome: ${obj.nome} | Ação: ${obj.acao}`)
}
console.log(historico)