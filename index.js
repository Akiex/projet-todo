/************************************************************/
/*                      FUNCTIONS                           */
/************************************************************/

async function fetchTodos() {
  const url = "https://dummyjson.com/todos?limit=12";
  const response = await fetch(url);
  const data = await response.json();
  return data.todos;
}

function saveCheckboxState(id, state) {
  window.localStorage.setItem(`check-${id}`, state);
}

function getCheckboxState(id) {
  const storedChecked = window.localStorage.getItem(`check-${id}`);
  return storedChecked === "true";
}

function createTodoItem(todo) {
  const span = document.createElement("span");
  const li = document.createElement("li");
  li.classList.add("task");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkBox");

  span.textContent = todo.todo;
  li.appendChild(span);
  li.appendChild(checkbox);

  const storedChecked = getCheckboxState(todo.id);
  if (storedChecked) {
    checkbox.checked = true;
  }

  checkbox.addEventListener("change", function () {
    saveCheckboxState(todo.id, checkbox.checked);
    span.classList.toggle("spanTextChecked");
    li.classList.toggle("liBackgroundChecked");
  });
  return li;
}

// Sauvegarder la liste des tâches dans le localStorage
function saveTodosToLocalStorage(todos) {
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

// Charger les tâches depuis le localStorage
function loadTodosFromLocalStorage() {
  const todos = window.localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

async function displayTodos() {
  const data = await fetchTodos();
  const ul = document.querySelector("#ToDoList");

  // Récupérer les tâches du localStorage, si présentes
  const savedTodos = loadTodosFromLocalStorage();
  const allTodos = [...data, ...savedTodos];

  for (let i = 0; i < allTodos.length; i++) {
    const todoItem = createTodoItem(allTodos[i]);
    ul.appendChild(todoItem);
  }
}

function newToDo() {
  let form = document.querySelector("#newTo");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputText = document.querySelector("#addText");
    let value = inputText.value.trim();

    if (value) {
      const newTodoItem = {
        id: Date.now(),
        todo: value,
      };

      // Ajouter la nouvelle tâche à la liste
      const savedTodos = loadTodosFromLocalStorage();
      savedTodos.push(newTodoItem);

      // Sauvegarder les tâches mises à jour dans le localStorage
      saveTodosToLocalStorage(savedTodos);

      // Créer l'élément de tâche et l'ajouter à la liste visible
      const todoItem = createTodoItem(newTodoItem);
      const ul = document.querySelector("#ToDoList");
      ul.appendChild(todoItem);

      // Réinitialiser le champ de saisie
      inputText.value = "";
    }
  });
}

/************************************************************/
/*                      Main Programm                       */
/************************************************************/

document.addEventListener("DOMContentLoaded", function () {
  displayTodos();
  newToDo();
});


