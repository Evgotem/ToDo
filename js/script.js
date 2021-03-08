// кнопка +
const addTaskBtn = document.querySelector('.add-task-btn');
// input куда вводим таски
const descTaskInput = document.querySelector('.description-task');
// оболочка списка todo
const todosList = document.querySelector('.todos__list');

// массив, куда сохраняются объекты с информацией каждой таски
let tasks;

let todosItemElems = [];

// при инициализации страницы проверяем, есть ли данные в localStorage, если нет то ассив - пустой, если есть,
// то получаем из localStorage данные и помещаем их в tasks
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

// функция - конструктор, на основе которого создается объект с информацией таски
function Task(description) {
   // описание таски
   this.description = description;
   // false - таска завершена, true - не завершена
   this.completed = false;
}

// структура таска
const createTemplate = (task, index) => {
   return `
      <li class="todos__item ${task.completed ? 'checked' : ''}">        
         <label class="todos__text">
            <input onclick='completeTask(${index})' class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
            ${task.description}
         </label>
         <span onclick='deleteTask(${index})' class="delete-task">
            &times;
         </span>
      </li>
   `
}

// функция пробегается по массиву и если он не пустой то для каждого элемента запускает функцию createTemplate
const fillHtmlList = () => {
   todosList.innerHTML = '';
   if (tasks.length > 0) {
      tasks.forEach((item, index) => {
         todosList.innerHTML += createTemplate(item, index);
      });
      todosItemElems = document.querySelectorAll('.todos__item');
   }
}
// добавляем таски, лежащие в ls на страницу
fillHtmlList();

// функция записывает в localStorage массив task
const updateLocal = () => {
   localStorage.setItem('tasks', JSON.stringify(tasks))
}

// меняет значение комплитед у таски при нажатии
const completeTask = index => {
   tasks[index].completed = !tasks[index].completed;
   if (tasks[index].completed) {
      todosItemElems[index].classList.add('checked');
   } else {
      todosItemElems[index].classList.remove('checked');
   }
   // так как мы изменили массив, то и лс надо тоже обновить
   updateLocal();
   fillHtmlList();
}

// при нажатии на + создается объект и пушится в массив tasks
addTaskBtn.addEventListener('click', () => {
   tasks.push(new Task(descTaskInput.value));
   // вызываем функцию апдейтЛокал и добавляем в LocalStorage новую таску
   updateLocal();
   // добавляем на страницу таску
   fillHtmlList();
   // очищаем инпут при нажатии на +
   descTaskInput.value = '';
})

// удаляем таск
const deleteTask = index => {
    todosItemElems[index].classList.add('delition');
    setTimeout(() => {
         tasks.splice(index, 1);
         // так как мы изменили массив, то и лс надо тоже обновить
         updateLocal();
         fillHtmlList();
    }, 500)
}