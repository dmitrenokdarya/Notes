const model = {
    tasks: [],
    selectedTasks: [],

    addTask(title, description, color) {
        const isSelected = false;
        const id = Math.random();
        const newTask = { title, description, color, isSelected, id };

        this.tasks.unshift(newTask);
        view.renderTasks(model.tasks); //Обновляем представление
    },

    deleteNote(id) {
        this.tasks = this.tasks.filter((task) => {task.id !== id});
        const li = document.getElementById(id)
        li.remove()
        view.renderTasks(model.tasks)
    },

    selectNote(id){
        this.selectedTasks = this.tasks.filter((task) => {task.id === id});
        console.log(model.selectedTasks)
    }
}

const view = {
    init() {
        this.renderTasks(model.tasks)

        const form = document.querySelector('.form')
        const input = document.querySelector('.input')
        const textarea = document.querySelector('.textarea')

        form.addEventListener('submit', function (event) {
            event.preventDefault() //Предотвращаем стандартное поведение формы
            const title = document.querySelector('.input').value
            const description = document.querySelector('.textarea').value

            //Находим checked-радиокнопку
            const radioButtons = document.getElementsByName('color');
            let color = '';
            radioButtons.forEach((rbuttonNumber) => {
                if (rbuttonNumber.checked) {
                    color = rbuttonNumber.value;
                }
            })

            controller.addTask(title, description, color)

            input.value = ''
            textarea.value = ''
        })

        const list = document.querySelector('.list')
        list.addEventListener('click', event => {
            if (event.target.matches('img.delete-button')) {
                const id = event.target.parentElement.id;
                controller.deleteNote(id)
            }
        })

        list.addEventListener('click', event => {
            if (event.target.matches('img.selected-button')) {
                const id = event.target.parentElement.id;
                let selectedImg = event.target.src;
                selectedImg = "assets/img/heart active.svg";
                controller.selectNote(id)
            }
        })
    },

    renderTasks(tasks) {
        const list = document.querySelector('.list')
        let count = document.querySelector('.number_of_notes')
        let textZeroNotes = document.querySelector('.textZeroNotes')
        if (tasks.length === 0) {
            textZeroNotes.innerHTML = 'У вас ещё нет ни одной заметки.<br>Заполните поля выше и создайте свою первую заметку!'
        } else {
            let tasksHTML = ''
            if (textZeroNotes) { textZeroNotes.remove() }
            tasks.forEach((task) => {
                tasksHTML += ` 
                        <li id="${task.id}" class="${task.isSelected ? 'selected' : ''} note"> 
                        <div class = "title-buttons ${task.color}">
                            <p class="task-title">${task.title}</p> 
                            <div class = "buttons" id="${task.id}">
                                <img src="assets/img/heart inactive.svg" alt="Selected" class="selected-button"> 
                                <img src="assets/img/trash.png" alt="Delete" class="delete-button"> 
                            </div>
                        </div >
                        <p class="task-description">${task.description}</p> 
                        </li> 
                        `
            })
            list.innerHTML = tasksHTML
        }
        count.innerHTML = tasks.length
    }
}

const controller = {
    addTask(title, description, color) {
        const popupAdd = document.querySelector(".add");
        const popupError = document.querySelector(".error");
        const popupMaxLength = document.querySelector(".max_length");
        const popupWindows = document.querySelector(".popup_windows")
        function showPopupAdd() { popupAdd.style.display = "block"; }
        function showPopupError() { popupError.style.display = "block"; }
        function showPopupMaxLength() { popupMaxLength.style.display = "block"; }
        function hidePopup() { popupAdd.style.display = "none"; popupError.style.display = "none"; popupMaxLength.style.display = "none"; }
        function showPopupWindows() { popupWindows.style.display = "block"; }
        function hidePopupWindows() { popupWindows.style.display = "none"; }

        if (title.trim() !== '' && title.length <= 50 && description.trim() !== '') {
            showPopupWindows()
            showPopupAdd()
            setTimeout(function () { hidePopupWindows(); hidePopup() }, 3000)
            model.addTask(title, description, color)
        } else if (title.length > 50) {
            showPopupWindows()
            showPopupMaxLength()
            setTimeout(function () { hidePopupWindows(); hidePopup() }, 3000)
        } else {
            showPopupWindows()
            showPopupError()
            setTimeout(function () { hidePopupWindows(); hidePopup() }, 3000)
        }
    },

    deleteNote(id) {
        model.deleteNote(id)
    },

    selectNote(id) {
        model.selectNote(id)
    }
}

function init() {
    view.init()
}

document.addEventListener('DOMContentLoaded', init())

