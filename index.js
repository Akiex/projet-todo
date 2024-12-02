

async function info() {
  let url = "https://dummyjson.com/todos?limit=12";
  let response = await fetch(url);
    let data = await response.json();

  return data
}
info().then(data => {
    console.log(data);
    
    let ul = document.querySelector('#ToDoList');
    
    
    for(let i = 0; i<data.todos.length; i++){
        let li = document.createElement('li')
        li.class = 'task'
        let check = document.createElement('input')
        check.type = 'checkbox'
        check.class = 'checkBox'
        let info = data.todos[i]
        li.textContent = info.todo
        li.appendChild(check)
        ul.appendChild(li)
    }
}).catch(error => {
    console.log('Erreur lors de la création de : ', error);
})


window.localStorage.setItem('check', true, false);