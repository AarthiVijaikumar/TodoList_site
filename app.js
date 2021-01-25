//selectors

const todoInput=document.querySelector(".todo-input"); //form's class
const todoButton=document.querySelector(".todo-button");//buttons class
const todoList=document.querySelector(".todo-list");//ul section's class which is inside a div sec ,which has class name as 'container'
const filterOption=document.querySelector(".filter-todo");
//event listeners
document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);
//funtions

function addTodo(event)
{   //PREVENT FORM FROM SUBMITTING
    event.preventDefault();
    //TODO DIV
    const todoDiv=document.createElement('div');
    todoDiv.classList.add('todo');
    //CREATE li element
    const newTodo=document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //CREATE Button element[completed button][check mark button]
   const completedButton=document.createElement('button');
   completedButton.innerHTML='<i class="fas fa-check"> </i>';
   completedButton.classList.add('complete-btn');
   todoDiv.appendChild(completedButton);
   //CREATE Button element [deleting button] [trash button]
   const trashButton=document.createElement('button');
   trashButton.innerHTML='<i class="fas fa-trash"> </i>';
   trashButton.classList.add('trash-btn');
   todoDiv.appendChild(trashButton);

/*now appending that todoDiv to the ul section ,
which has class name as [todo-list]*/
todoList.appendChild(todoDiv);  
//storing the todos in localstorage
 saveLocalTodos(todoInput.value);
//clearing todo-input value for new entries 
todoInput.value="";

}

function deleteCheck(e)
{
    const item=e.target;
    

    //deleting toto-items
    if(item.classList[0] ==="trash-btn")
    {   
        const todo=item.parentElement;
        //ANIMATION HERE
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        })
       
    }

    //checkmark to items

    if(item.classList[0]==="complete-btn")
    {
        const todo=item.parentElement;
       
        todo.classList.toggle('completed');
    }
}

function filterTodo(e)
{
    const todos=todoList.childNodes;
    
    todos.forEach(function(todo)
    {
        switch(e.target.value){
            case "all":
                todo.style.display='flex';
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display='flex';
                }
                else{
                    todo.style.display='none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed"))
                {
                    todo.style.display="flex";

                }else{
                    todo.style.display='none';
                }
                break;
            
        }

    });
}
function saveLocalTodos(todo){
    //check any list is there
    let todos;
    if(localStorage.getItem("todos") === null)
    {
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));

}

function getTodos(todo)
{
    
    let todos;
    if(localStorage.getItem("todos") === null)
    {
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo)
    {
    //TODO DIV
    const todoDiv=document.createElement('div');
    todoDiv.classList.add('todo');
    //CREATE li element
    const newTodo=document.createElement('li');
    newTodo.innerText=todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //CREATE Button element[completed button][check mark button]
   const completedButton=document.createElement('button');
   completedButton.innerHTML='<i class="fas fa-check"> </i>';
   completedButton.classList.add('complete-btn');
   todoDiv.appendChild(completedButton);
   //CREATE Button element [deleting button] [trash button]
   const trashButton=document.createElement('button');
   trashButton.innerHTML='<i class="fas fa-trash"> </i>';
   trashButton.classList.add('trash-btn');
   todoDiv.appendChild(trashButton);

/*now appending that todoDiv to the ul section ,
which has class name as [todo-list]*/
todoList.appendChild(todoDiv);  
    });

}
function removeLocalTodos(todo)
{
     
    let todos;
    if(localStorage.getItem("todos") === null)
    {
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}


