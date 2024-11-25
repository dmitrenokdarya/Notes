const model = {
    tasks: [],

    addTask(title, description, color) {
        const isSelected = false;
        const id = Math.random();
        const newTask = { title, description, color, isSelected, id };

        this.tasks.unshift(newTask);
        console.log(model.tasks)
        view.renderTasks(model.tasks); //Обновляем представление
    },
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
    },

    renderTasks(tasks) {
        const list = document.querySelector('.list')
        let count = document.querySelector('.number_of_notes')
        let textZeroNotes = document.querySelector('.textZeroNotes')
        if (tasks.length === 0) {
            textZeroNotes.innerHTML = 'У вас ещё нет ни одной заметки.<br>Заполните поля выше и создайте свою первую заметку!'

        } else {
            let tasksHTML = ''
            textZeroNotes.remove()
            tasks.forEach((task) => {
                tasksHTML += ` 
                    <li id="${task.id}" class="${task.isSelected ? 'selected' : ''}"> 
                    <p class="task-title">${task.title}</p> 
                    <p class="task-description">${task.description}</p> 
                    <button class="selected-button" type="button">???</button> 
                    <button class="delete-button" type="button"><img src="assets/img/trash.png" alt="Delete"></button> 
                    </li> 
                    `
                list.innerHTML = tasksHTML
            })
        }
        count.innerHTML = tasks.length
    }
}

const controller = {
    addTask(title, description, color) {
        if (title.trim() !== '' && title.length <= 50 && description.trim() !== '') {
            model.addTask(title, description, color)
        } else if (title.length > 50) {
            //Картинка, но пока не знаю, куда 
        }
    },
}



function init() {
    view.init()
}

document.addEventListener('DOMContentLoaded', init())