const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUl = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

form.addEventListener('submit',(e)=>{
    //add eventlistener on form's submit button
    e.preventDefault();//Do not want it to be submitted by default
    addTodo();
});

function addTodo() {
    const todoText = input.value;
    
    if(todoText){
        const todoEl = document.createElement('li');
        todoEl.innerText = todoText;
        todosUl.appendChild(todoEl);
        //addEventListener 1
        todoEl.addEventListener('click', ()=>{
            todoEl.classList.toggle('completed');
            updateLS();
        });
        //addEventListener 2
        todoEl.addEventListener(('contextmenu'), (e)=>{
            e.preventDefault();
            todoEl.remove();
            updateLS();
        });
    
    
        input.value = '';
        updateLS();
    }
}

// Store notes into localstorage with todo's text and todo's flag ex "completed"
function updateLS() {
    const todosEl = document.querySelectorAll('li'); 
    
    const todos = [];

    todosEl.forEach(todoEl => { 
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed'),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}