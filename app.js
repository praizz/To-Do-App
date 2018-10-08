//DEclare your variables
const form= document.querySelector('#task-form');
const taskInput = document.querySelector('#task'); // input where the task is entered
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const card = document.querySelector('.card');




loadEventListeners();

function loadEventListeners(){     //i.e when the submit button is clicked, what happens
    //add task to the list
    form.addEventListener('submit', addTask); //addTask function below
    //remove an added task
    taskList.addEventListener('click', removeTask);
    //clear all tasks
    clearBtn.addEventListener('click', clearTasks);
    //filter tasks
    filter.addEventListener('keyup', filterTasks);
    //callback fromm ls
    document.addEventListener('DOMContentLoaded', loadFromDom);
    //plenty colours
    card.addEventListener('mousemove', colors); //mousemove is not camel casing
}
    function colors(e){
        document.body.style.backgroundColor = `rgb(${e.offsetX}, ${e.offsetY}, 40)`;
    }
//document.body.style.background = 'rgb(0,0,0)';

    function addTask(e){
        if(taskInput.value === ''){
            alert('Please add a task');
        }
    //this is to create an unordered sub list items when the user adds a task
        const li = document.createElement('li');
        li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value)); 
    // this is to add the delete X icon
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content'; //secondary... is for materialize css, it floats the icon to the right
            //embed the html for the little delete x icon
        link.innerHTML= '<i class = "fa fa-remove"></i>'; 
    //join li with the delete link
        li.appendChild(link);
    //join the full li now with the ul
        //tasklist is the const for the ul above
        taskList.appendChild(li);

    //we have to save to local storage
        saveToLS(taskInput.value);

    //we clear input after one task is entered so its easy to enter input the next task
        taskInput.value='';  
        e.preventDefault();
    }
//This function saves to the local storage
function saveToLS(task){
    let tasks; //bcos it has to take a param
    let lsValues = localStorage.getItem('tasks');

    if(lsValues === null){ //i.e if theres nothing in LS
        //console.log(values);
        tasks = []; //set it to an empty array
    }else{
        tasks = JSON.parse(lsValues) ; //this turns it to an object cos ls stores only strings
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//This function persists from the local storage
function loadFromDom(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
    }else{
   tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  tasks.forEach(function(task){ //create new li under collection item ul
    const li = document.createElement('li');
    li.className = 'collection-item';
   li.appendChild(document.createTextNode(task)); 
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content'; 
    link.innerHTML= '<i class = "fa fa-remove"></i>'; 
    li.appendChild(link);
    taskList.appendChild(li);

  })  
}

function removeTask(e){
/* could to this or the other
if(e.target.classList.contains('fa-remove')){
e.target.parentElement.parentElement.parentElement.remove();
}
*/
if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Dude, yo sure?')){
      e.target.parentElement.parentElement.remove();  
      removeFromLS(e.target.parentElement.parentElement);
    }
    }
}
//This function removes from the local storage
function removeFromLS(taskrm){
// first checkif theres anything in the local storage.
let tasks;
    if(localStorage.getItem('tasks') === null){ //i.e if theres nothing in LS
        //console.log(values);
        tasks = []; //set it to an empty array
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks')) ; //this turns it to an object cos ls stores only strings
    }
tasks.forEach(function(task, index){
    if(taskrm.textContent === tasks){
        tasks.splice(index, 1);
    }
})
localStorage.setItem('tasks', JSON.stringify(tasks));
}


function clearTasks(e){
    //Do this or
    //taskList.innerHTML = ''; // this just deletes all the li

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild); //as long as theres still a first child, it loops and continues the iteration
    }

    clearTasksLS();
}

function clearTasksLS(){
    localStorage.clear();
}

function filterTasks(e){
   const typing = e.target.value; // this logs each value as its being typed
   document.querySelectorAll('.collection-item').forEach(function(task){
    const eachTask = task.firstChild.textContent;
    if(eachTask.indexOf(typing) != -1){// if it doesnt exist, it is -1
    task.style.display = 'block';
   }else{
       task.style.display = 'none';
   }
});
}
//GLORY TO GOD