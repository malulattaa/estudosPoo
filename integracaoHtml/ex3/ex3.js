
const veiculosAtualmenteEstacionados = []
const historicoVeiculosEstacionados = []

function entrarVeiculo(){
    const placa = document.getElementById('placa').value
    const modelo = document.getElementById('modelo').value
    const horaEntrada = new Date().toLocaleTimeString()
    const veiculo = {placa, modelo, horaEntrada, horaSaida: null}

    veiculosAtualmenteEstacionados.push(veiculo)
    historicoVeiculosEstacionados.push({
        placa,
        modelo,
        horaEntrada,
        horaSaida: null

    })

    mostrar()
}

function sairVeiculo(){
    const placa = document.getElementById('placa').value
    const horaSaida = new Date().toLocaleTimeString()

    for (let v of veiculosAtualmenteEstacionados){
        if(v.placa===placa){
            v.horaSaida = horaSaida

            const registro = historicoVeiculosEstacionados.find(h => h.placa === placa && horaSaida === null)
            if(registro){
                registro.horaSaida = horaSaida
            }
            veiculosAtualmenteEstacionados.splice(veiculosAtualmenteEstacionados.indexOf(v),1)
            break
        }
    }
    mostrar()
}

function mostrar(){
    const at = document.getElementById('listaAtuais')
    const hi = document.getElementById('listaHistorico')
    at.innerHTML = ""
    hi.innerHTML = ""
    for (v of veiculosAtualmenteEstacionados){
        at.innerHTML += `<li>Placa: ${v.placa} | Modelo: ${v.modelo} | Hora de entrada: ${v.horaEntrada}</li>`
    }
    for (h of historicoVeiculosEstacionados){
        hi.innerHTML += `<li>Placa: ${h.placa} | Modelo: ${h.modelo} | Hora de entrada: ${v.horaEntrada} | Hora de saída: ${v.horaSaida}</li>`
    }

}
