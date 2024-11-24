const MOCK_TASKS = [
    { id: 1, title: 'Изучить паттерн MVC', description: 'Aрхитектурный паттерн, который разделяет приложение на три основные части', color: blue, isSelected: true },
    { id: 2, title: 'Подготовить моковые данные', description: 'Каждая задача будет представлена в виде объекта с пятью свойствами: id, title, description, color, isSelected', color: pink, isSelected: true },
]


const model = {
    tasks: [],

    addTask(title, description, color) {
        const isSelected = false
        const id = Math.random()

        const newTask = { title, description, isSelected, color, id }

        this.tasks.push(newTask)

        view.renderTasks(model.tasks) // Обновляем представление
    },
}


const view = {
    init() {
        this.renderTasks(model.tasks)

        const form = document.querySelector('.form')
        const input = document.querySelector('.input')
        const textarea = document.querySelector('.textarea')

        // Добавляем обработчик события на форму
        form.addEventListener('submit', function (event) {
            event.preventDefault() // Предотвращаем стандартное поведение формы
            const title = document.querySelector('.input').value
            const description = document.querySelector('.textarea').value
            controller.addTask(title, description) // Вызываем метод addTask контроллера

            input.value = '' // Очищаем поле ввода
            textarea.value = ''
        })
    },

    renderTasks(tasks) {
        const list = document.querySelector('.list')

        let tasksHTML = ''
        tasks.forEach((task) => {
            tasksHTML += `
            <li id="${task.id}" class="${task.isSelected ? 'selected' : ''}">
                <p class="task-title">${task.title}</p>
                <p class="task-description">${task.description}</p>
                <button class="selected-button" type="button">???</button>
                <button class="delete-button" type="button"><img src="assets/img/trash.png" alt="Delete"></button>
            </li>
            `
        })
        list.innerHTML = tasksHTML
    }
}

const controller = {
    addTask(title, description) {
        if (title.trim() !== '' && title.length <= 50 && description.trim() !== '') {
            model.addTask(title)
        } else if (title.length > 50){
            //Картинка, но пока не знаю, куда
        }
    },
}



function init() {
    view.init()
}

init()



