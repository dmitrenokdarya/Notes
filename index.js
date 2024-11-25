const model = {
    tasks: [],

    addTask(title, description, color) {
        const isSelected = false;
        const id = Math.random();
        console.log(description);
        const newTask = { title, description, color, isSelected, id };

        this.tasks.unshift(newTask);

        view.renderTasks(model.tasks); // Обновляем представление 
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
            const color = document.getElementsByName('color:checked').value //??? 

            console.log(color)
            console.log(description)
            controller.addTask(title, description, color) // Вызываем метод addTask контроллера 

            input.value = '' // Очищаем поле ввода 
            textarea.value = ''
        })
    },

    renderTasks(tasks) {
        const list = document.querySelector('.list')
        let count = document.querySelector('.number_of_notes')
        if (tasks.length === 0) {
            const textZeroNotes = document.querySelector('.textZeroNotes')
            textZeroNotes.innerHTML = 'У вас ещё нет ни одной заметки.<br>Заполните поля выше и создайте свою первую заметку!'

        } else {
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
                list.innerHTML = tasksHTML
            })
        }
        count.innerHTML = tasks.length
    }
}

const controller = {
    addTask(title, description) {
        if (title.trim() !== '' && title.length <= 50 && description.trim() !== '') {
            model.addTask(title)
        } else if (title.length > 50) {
            //Картинка, но пока не знаю, куда 
        }
    },
}



function init() {
    view.init()
}

init()