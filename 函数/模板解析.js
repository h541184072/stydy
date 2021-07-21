// const render = (template, data) => template.replace(/{{([\d\D]*?)}}/g, ($0, $1) => eval(`with(data){${$1}}`))
const render = (template, data) => template.replace(/{{([\d\D]*?)}}/g, ($0, $1) => {
    console.log($1)
    console.log(eval(`with(data){${$1}}`))
    return eval(`with(data){${$1}}`)
})


const template = '嗨，{{ info.name.value }}您好，今天是星期 {{ day.value }}';

const data = {
    info: {
        name: {
            value: '张三'
        }
    },
    day: {
        value: '三'
    }
};



const a = render(template, data); // 嗨，张三您好，今天是星期三
console.log(a)