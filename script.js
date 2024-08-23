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
        <div class="card-bg">
            ${input}

            <div>
                <svg class="active" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.50008 10L9.16675 11.6667L12.5001 8.33335M18.3334 10C18.3334 14.6024 14.6025 18.3334 10.0001 18.3334C5.39771 18.3334 1.66675 14.6024 1.66675 10C1.66675 5.39765 5.39771 1.66669 10.0001 1.66669C14.6025 1.66669 18.3334 5.39765 18.3334 10Z" stroke="#BEF264" style="stroke:#BEF264;stroke:color(display-p3 0.7451 0.9490 0.3922);stroke-opacity:1;" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg class="inactive" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.41664 1.81836C9.46249 1.61597 10.5374 1.61597 11.5833 1.81836M11.5833 18.1817C10.5374 18.3841 9.46249 18.3841 8.41664 18.1817M14.6741 3.10086C15.5587 3.70022 16.3197 4.46409 16.9158 5.35086M1.8183 11.5834C1.6159 10.5375 1.6159 9.46255 1.8183 8.4167M16.8991 14.6742C16.2998 15.5588 15.5359 16.3198 14.6491 16.9159M18.1816 8.4167C18.384 9.46255 18.384 10.5375 18.1816 11.5834M3.1008 5.32586C3.70016 4.44131 4.46403 3.68026 5.3508 3.0842M5.3258 16.8992C4.44124 16.2998 3.6802 15.536 3.08414 14.6492" stroke="#A1A1AA" style="stroke:#A1A1AA;stroke:color(display-p3 0.6314 0.6314 0.6667);stroke-opacity:1;" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>${atividade.nome}</span>
            </div>

            <time class="short">
            ${formatar.dia.semana.curto}.
            ${formatar.dia.numerico} <br>
            ${formatar.hora}
            </time>
            <time class="full">${formatar.dia.semana.longo}, dia ${formatar.dia.numerico} de ${formatar.mes} às ${formatar.hora}h </time>
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