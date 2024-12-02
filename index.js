

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
        let li = document.createElement('li');
        li.classList.add = ('task');
        
        let check = document.createElement('input');
        check.type = 'checkbox';
        check.classList.add = ('checkBox');
        
        let info = data.todos[i];
        
        li.textContent = info.todo;
        li.appendChild(check);
        ul.appendChild(li);
        
        check.addEventListener('change', function() {
           
            window.localStorage.setItem(`check-${info.id}`, check.checked);
        });
        
        
        const storedChecked = window.localStorage.getItem(`check-${info.id}`);
        if (storedChecked === 'true') {
            check.checked = true;
        }
    
    }
}).catch(error => {
    console.log('Erreur lors de la création de : ', error);
})


