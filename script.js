// Formatar a data para algo mais legível
const formatador = (data) => {
    return {
        dia: {
            numerico: dayjs(data).format('DD'),
            semana: {
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd'),
            }
        },
        mes: dayjs(data).format('MMMM'),
        hora: dayjs(data).format('HH:mm'),
    }
}

// objeto
const atividade = {
    nome: "Almoço",
    data: new Date("2024-07-08 10:00"),
    finalizada: false
    //nome, data e finalizado são propriedades do objeto
}

// array/lista de objetos "atividade"
let atividades = [
    atividade,
    {
        nome: 'Academia em grupo',
        data: new Date("2024-07-09 10:00"),
        finalizada: false
    },
    {
        nome: 'Gamming Session',
        data: new Date("2024-07-08 14:00"),
        finalizada: false
    }
]

//função
const criarItemAtividade = (atividade) => {
    let input = `<input
    onchange="concluirAtividade(event)"
    value="${atividade.data}"
    type="checkbox"
    `

    //verifica se a atividade foi finalizada e atribui propriedade "checked"
    if(atividade.finalizada) {
        input += input + 'checked'
    }
    input += input + '>'

    const formatar = formatador(atividade.data); //prepara a data pra apresentar em tela

    //Monta a string de tags html
    //ex: Almoço segunda-feira, dia 08 de julho às 10:00h
    return `
        <div>
            ${input}
            <span>${atividade.nome}</span>
            <time>${formatar.dia.semana.longo}, dia ${formatar.dia.numerico} de ${formatar.mes} às ${formatar.hora}h </time>
        </div>
    `
}

const atualizarListaDeAtividades = () => {
    //busca a tag section no html
    const section = document.querySelector('section')
    //limpa a lista pra evitar duplicatas
    section.innerHTML = ''


    //verificar se a lista de "atividade" está vazia
    if(atividades.length == 0) {
        section.innerHTML = `<p> Nenhuma atividade cadastrada.</p>`
        return;
    }
    //se tiver conteúdo chamar função "criarItemAtividade" passando cada atividade como parâmetro
    for(let atividade of atividades) {
        section.innerHTML += criarItemAtividade(atividade)
    }
}
atualizarListaDeAtividades()

//Evento vem do Html da tag "form"
//O Evento "event" é composto basicamente pelo nome da atividade, data e hora
const salvarAtividade = (event) => {
    event.preventDefault(); 
    
    //"new FormData" transforma o evento de html em algo inteligível para javascript
    const dadosDoFormulario = new FormData(event.target)

    //busca cada uma das propriedades do html
    const nome = dadosDoFormulario.get('atividade')
    const dia = dadosDoFormulario.get('dia')
    const hora = dadosDoFormulario.get('hora')
    const data = `${dia} ${hora}`

    //cria um objeto "atividade" com as propriedades recebidas
    const novaAtividade = {
        nome: nome,
        data: data,
        finalizada: false
    }

    //Procura na lista se há alguma data igual a atividade recem cadastrada
    const atividadeExiste = atividades.find((atividadeExistente) => {
        return atividadeExistente.data == novaAtividade.data
    })

    //Cria um alert pra informar que o dia ou hora estão ocupados
    if(atividadeExiste) {
        return alert('Dia ou hora não disponível')
    }

    //Insre a nova atividade a lista já existente
    atividades = [novaAtividade, ...atividades]
    atualizarListaDeAtividades()
}

//Cria os dias da seleção do botão de escolher dia
//Ex: 28 de fevereiro
const criarDiasSelecao = () => {
    //array/lista de dias
    const dias = [
        "2024-02-28",
        "2024-02-29",
        "2024-03-01",
        "2024-03-02",
        "2024-03-03",
    ]

    let diasSelecao = ''

    //Deixa o dia apresentável (formatador) e monta a string do html
    for(let dia of dias) {
        const formatar = formatador(dia)

        const diaFormatado = `
        ${formatar.dia.numerico} de
        ${formatar.mes}
        `

        diasSelecao += `
        <option value ="${dia}">${diaFormatado}</option>
        `
    }

    //Busca a tag Select[name="dia"] no html e insere a string entre a tag (inner)
    document
    .querySelector('select[name="dia"]')
    .innerHTML = diasSelecao

}
criarDiasSelecao()

const criarHorasSelecao = () => {
    let horasDisponiveis = ''

    //cria um for no lugar de uma lista/array com strings que vão determinar a diferença de horário.
    for(let i = 6; i< 23; i++) {

        //Adciona um "0" antes de numeros que não possuam dois dígitos
        const hora = String(i).padStart(2, '0')
        horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`
        horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`
    }

    //Busca a tag Select[name="dia"] no html e insere a string entre a tag (inne
    document
    .querySelector('select[name="hora"]')
    .innerHTML = horasDisponiveis
}
criarHorasSelecao()

const concluirAtividade = (event) => {
    const input = event.target
    const dataDesteInput = input.value

    const atividadeCheckbox = atividades.find((atividade) => {
        return atividade.data == dataDesteInput
    })

    if(!atividadeCheckbox) {
        return
    }

    atividadeCheckbox.finalizada = !atividadeCheckbox.finalizada
}