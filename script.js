const form = document.querySelector(".form");
const btnSend = document.querySelector('.send-btn');

// блокируем отправку данных по нажатию на кнопку
form.addEventListener("submit", (event) => {
    // Предотвращает действие браузера по умолчанию. В данном случае — отправку формы
    // https://learn.javascript.ru/default-browser-action
    event.preventDefault();

    const name = document.querySelector("#name");
    const secondName = document.querySelector("#secondName");
    const phone = document.querySelector("#phone");
    const email = document.querySelector("#email");
    const agree = document.querySelector("#agree");
    //const photo = document.querySelector("#photo");

    fetch(`http://46.21.248.81:3001/user`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer: virkosha",
            },
            body: JSON.stringify({
                name: name.value,
                secondName: secondName.value,
                phone: phone.value,
                email: email.value,
                agree: agree.checked,
                //photo: photo.src,
            }),
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            // Креативим модальное окно
            if (data.message) {
                openModal();
            }
            form.reset();
        })
        .catch((e) => {
            // И тут
            alert("Произошла ошибка :(");
        });

});

const modal = document.querySelector('.modal');
const btnClose = document.querySelector('.close');

function openModal() {
    // открытие модального окна
    modal.style.display = "block";

    // закрытие модаьного окна при нажатие на крестик
    btnClose.addEventListener('click', () => {
        modal.style.display = "none";
    })


    // закрытие модального окна при щелчке в любом месте за его пределами
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    })
}

/*
// Вариант решения с использованием функции
const form = document.querySelector(".form");
// блокируем отправку данных по нажатию на кнопку
form.addEventListener("submit", (event) => {
    // Предотвращает действие браузера по умолчанию. В данном случае — отправку формы
    // https://learn.javascript.ru/default-browser-action
    event.preventDefault();

    // функция сбора данных с формы заполненной пользователям
    function сollectUserData(form) {
        // возвращаю заполненные поля пользователям
        return form.value;
    }

    fetch(`http://46.21.248.81:3001/user`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer: virkosha",
            },
            body: JSON.stringify(сollectUserData()),
        })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            // Креативим модальное окно
            if (data.message) {
                alert(data.message);
            }
            form.reset();
        })
        .catch((e) => {
            // И тут
            alert("Произошла ошибка :(");
        });

}); */




// Идеи модального окна с интернета
/* class CustomAlert {
    constructor() {}

    show(message) {
        const dialogOverlay = document.querySelector('.js-overlay');
        const dialogBox = document.querySelector('.js-box')

        dialogOverlay.style.display = 'block'
        dialogBox.style.display = 'block'

        document.querySelector('.js-header').innerHTML = 'Всплывающее диалоговое окно'
        document.querySelector('.js-body').innerHTML = message
        document.querySelector('.js-footer').innerHTML = '<button class="button" onclick="alert.ok()">Закрыть</button>'
    }

    ok() {
        this.hide()
    }

    hide() {
        document.querySelector('.js-box').style.display = 'none'
        document.querySelector('.js-overlay').style.display = 'none'
    }
}

const alert = new CustomAlert()

function popup() {
    const message = `Случайное число: ${Math.random()}`
    alert.show(message)
} */