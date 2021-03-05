// кнопка +
const addTaskBtn = document.querySelector('.add-task-btn');
// input куда вводим таски
const descTaskInput = document.querySelector('.description-task');
// оболочка списка todo
const todosWrapper = document.querySelector('.todos-wrapper');

// массив, куда сохраняются объекты с информацией каждой таски
let tasks = [];

// функция - конструктор, на основе которого создается объект с информацией таски
function Task(description){
   // описание таски
   this.description = description;
   // false - таска завершена, true - не завершена
   this.completed = false;
}

// функция записывает в localStorage массив task
const updateLocal = () => {
   localStorage.setItem('tasks', JSON.stringify(tasks))
}

// при нажатии на + создается объект и пушится в массив tasks
addTaskBtn.addEventListener('click', () => {
   tasks.push(new Task(descTaskInput.value));
   // вызываем функцию апдейтЛокал и добавляем в LocalStorage новую таску
   updateLocal();
})
