const atividade = {
    nome: "Almoço",
    data: new Date("2024-07-08 10:00"),
    finalizada: false
}

const atividades = [
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

const criarItemAtividade = (atividade) => {

    let input = '<input type="checkbox" '

    if(atividade.finalizada) {
        input += input + 'checked'
    }

    input += input + '>'

    return `
        <div>
            ${input}
            <span>${atividade.nome}</span>
            <time>${atividade.data}</time>
        </div>
    `
}


const section = document.querySelector('section')

for(let atividade of atividades) {
    section.innerHTML += criarItemAtividade(atividade)
}