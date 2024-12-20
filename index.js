const model = {
    tasks: [],
    selectedTasks: [],

    //Добавляет заметку
    addTask(title, description, color) {
        const isSelected = false;
        const id = Math.random();
        const newTask = { title, description, color, id };
        this.tasks.unshift(newTask);
        const checkboxDivBlock = document.querySelector(".checkbox_div_block")
        checkboxDivBlock.style.display = "block"
        view.renderTasks(model.tasks); //Обновляем представление
    },

    //Показывает все заметки
    showTasks() {
        view.renderTasks(this.tasks)
    },

    //Удаляет заметку
    deleteNote(id) {
        this.tasks = this.tasks.filter((task) => { return task.id !== +id });
        let count = document.querySelector('.number_of_notes')
        count.innerHTML = this.tasks.length
        this.selectedTasks = this.selectedTasks.filter((task) => { return task.id !== +id });
        const li = document.getElementById(id);
        li.remove();
        const checkboxDivBlock = document.querySelector(".checkbox_div_block")
        const textZeroNotes = document.querySelector('.textZeroNotes')
        if (this.tasks.length === 0) {
            checkboxDivBlock.style.display = "none";
            textZeroNotes.style.display = "block"
        } else { checkboxDivBlock.style.display = "block" }
    },

    //Добавляет заметку в избранное
    selectNote(id) {
        let newSelectedTask = ''
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id === +id) {
                newSelectedTask = this.tasks[i]
                console.log('Привет1');
                if (this.selectedTasks.length === 0) {
                    this.selectedTasks.unshift(newSelectedTask);
                    console.log('Привет2')
                    console.log(this.selectedTasks)
                } else {
                    for (let n = 0; n < this.selectedTasks.length; n++) {
                        if (this.selectedTasks[n].id !== +newSelectedTask.id) {
                            console.log('Привет')
                            this.selectedTasks.unshift(newSelectedTask);
                            console.log(this.selectedTasks)
                        } else { console.log('Эта заметка уже добавлена в избранные!') }
                    }
                }
            } console.log('Привет4')
        }
    },

    //Удаляет заметку из избранного
    deleteSelectNote(id) {
        this.selectedTasks = this.selectedTasks.filter((task) => { return task.id !== +id });
        console.log(this.selectedTasks)
    },

    //Показывает избранные заметки
    showSelectedNotes() {
        view.renderTasks(this.selectedTasks)
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

        //Удаление заметки
        const list = document.querySelector('.list')
        list.addEventListener('click', event => {
            if (event.target.matches('img.delete-button')) {
                const id = event.target.parentElement.id;
                controller.deleteNote(id)
            }
        })

        //Добавляет/удаляет заметку в/из избранное/-ого
        let countClick = 1;
        list.addEventListener('click', event => {
            if (event.target.matches('.selected-button')) {
                const id = event.target.parentElement.id;
                console.log(id)
                const imgSelected = event.target;
                if (countClick % 2 !== 0) {
                    imgSelected.src = 'assets/img/heartactive.png'//ссылка на картинку
                    countClick++
                    console.log(id)
                    controller.selectNote(id)
                } else {
                    imgSelected.src = 'assets/img/heartinactive.png'//ссылка на картинку
                    countClick++
                    console.log(id)
                    controller.deleteSelectNote(id)
                }
            }
        })

        //Показать/скрыть избранные заметки
        const checkbox = document.querySelector('.checkbox')
        checkbox.addEventListener('click', event => {
            if (checkbox.checked) {
                model.showSelectedNotes()
            } else {
                model.showTasks()
            }
        })
    },

    renderTasks(tasks) {
        let count = document.querySelector('.number_of_notes')
        const textZeroNotes = document.querySelector('.textZeroNotes')
        const list = document.querySelector('.list')
        function hidetextZeroNotes() { textZeroNotes.style.display = "none" }
        function showtextZeroNotes() { textZeroNotes.style.display = "block" }

        if (model.tasks.length === 0) {
            showtextZeroNotes()
        } else {
            let tasksHTML = ''
            if (textZeroNotes.style.display = "block") {
                hidetextZeroNotes()
                tasks.forEach((task) => {
                    tasksHTML += ` 
                                <li id="${task.id}" class="note"> 
                                <div class = "title-buttons ${task.color}">
                                    <p class="task-title">${task.title}</p> 
                                    <div class = "buttons" id="${task.id}">
                                        <img src="assets/img/heartinactive.png" alt="isSelected?" class="selected-button" id="selected-button"> 
                                        <img src="assets/img/trash.png" alt="Delete" class="delete-button"> 
                                    </div>
                                </div >
                                <p class="task-description">${task.description}</p> 
                                </li> 
                                `
                })
                list.innerHTML = tasksHTML
            } else {
                tasks.forEach((task) => {
                    tasksHTML += ` 
                                <li id="${task.id}" class="note"> 
                                <div class = "title-buttons ${task.color}">
                                    <p class="task-title">${task.title}</p> 
                                    <div class = "buttons" id="${task.id}">
                                        <img src="assets/img/heartinactive.png" alt="isSelected?" class="selected-button" id="selected-button">
                                        <img src="assets/img/trash.png" alt="Delete" class="delete-button"> 
                                    </div>
                                </div >
                                <p class="task-description">${task.description}</p> 
                                </li> 
                                `
                })
                list.innerHTML = tasksHTML
            }
        }
        count.innerHTML = model.tasks.length
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
        const popupDelete = document.querySelector(".delete");
        const popupWindows = document.querySelector(".popup_windows")
        function showPopupDelete() { popupDelete.style.display = "block"; };
        function hidePopupDelete() { popupDelete.style.display = "none"; }
        function showPopupWindows() { popupWindows.style.display = "block"; }
        function hidePopupWindows() { popupWindows.style.display = "none"; }

        showPopupWindows()
        showPopupDelete()
        setTimeout(function () { hidePopupWindows(); hidePopupDelete() }, 3000)
        model.deleteNote(id)
    },

    selectNote(id) {
        model.selectNote(id)
    },

    deleteSelectNote(id) {
        model.deleteSelectNote(id)
    }
}

function init() {
    view.init()
}

document.addEventListener('DOMContentLoaded', init())

