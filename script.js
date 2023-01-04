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
            // восстанавливаем значения формы по умолчанию через метод reset
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

// функция загрузки файла
function uploadFile() {
    let uploadFile = document.querySelector('#uploadFile');
    uploadFile.addEventListener('change', function readURL() {
        //Доступ к первому выбранному файлу с помощью классического селектора DOM - files[0]
        let file = document.querySelector('#uploadFile').files[0];

        // подключаем конструктор API FileReader - объект, который позволяет веб-приложениям асинхронно считывать содержимое файлов, хранящихся на компьютере пользователя
        const reader = new FileReader();
        //loadend - это событие, которое запускается, когда чтение файла завершено успешно/не успешно
        reader.addEventListener('loadend', () => {
            //result - свойство возвращает содержимое файла, после завершения операции чтения
            document.querySelector('#clock').style.backgroundImage = "url(" + reader.result + ")";
        })
        if (file) {
            //Метод readAsDataURLиспользуется для чтения содержимого указанного в Blob или File
            reader.readAsDataURL(file);
        }
    })
}