let tg = window.Telegram.WebApp
tg.expand()

let btnBasket = document.querySelector("#click")
btnBasket.onclick = () => {

    if (tg.MainButton.isVisible) {
        tg.MainButton.hide()
        
    } else {
        tg.MainButton.setText("Корзина пуста")
        tg.MainButton.show()
    }
}

let item = ""
let btnTV = document.querySelector("#btn1")
let btnHairDryer = document.querySelector("#btn2")
let btnVacuumCleaner = document.querySelector("#btn3")
let btnMacbook = document.querySelector("#btn4")
let btnMicrowave = document.querySelector("#btn5")
let username = document.querySelector('#username')
let phone = document.querySelector('#phoneNumber')
let list = document.querySelector('#itemlist')
let resultDiv = document.querySelector("#res")
let items = {
    TV: 0,
    HairDryer: 0,
    VacuumCleaner: 0,
    Macbook: 0,
    Microwave: 0
}
username.onchange = () => {
    name = username.value
}
phone.onchange = () => {
    phoneNumber = phone.value
}

function getInfo(data) {
    let li = document.createElement('li')
    li.innerHTML = data
    list.appendChild(li)
}
function changeItems(itemName, changeName, dictName) {
    items[dictName] += 1

    list.innerHTML = ""

    if (name != "") {
        getInfo("Ваше имя - " + name)
    }
    if (phoneNumber != "") {
        getInfo("Ваш телефон - " + phoneNumber)
    }

     for (let item in items) {
        getInfo(item + ":" + items[item])
    }
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide()
    } else {
        tg.MainButton.setText("теперь вы обладатель " + changeName)
        tg.MainButton.show()
    }
}

btnTV.onclick = () => {
    changeItems('Телевизор', 'Телевизор', 'TV')
}
btnHairDryer.onclick = () => {
    changeItems('Фен', 'Фен', 'HairDryer')
}
btnVacuumCleaner.onclick = () => {
    changeItems('Пылесос', 'Пылесос', 'VacuumCleaner')
}
btnMacbook.onclick = () => {
    changeItems('ноутбук', 'ноутбук', 'Macbook')
}
btnMicrowave.onclick = () => {
    changeItems('Микроволновка', 'Микроволновка', 'Microwave')
}

Telegram.WebApp.onEvent('mainButtonClicked', function() {
    result = ''
    if (name != "") {
        result += "ваше имя - " + name + "\n"
    }
    if (phoneNumber != "") {
        result += "Ваш телефон - " + phoneNumber + "\n"
    }
    result += "Ваш заказ: " + "\n"
    for (let item in items) {
        if (items[item] > 0) {
            result += item + ": " + items[item] + "\n"
        }
    }

    tg.sendData(result)
})
