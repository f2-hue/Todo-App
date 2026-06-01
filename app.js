import { saveTasks, loadTasks } from "./modules/storage.js";
import { createTaskElement } from "./modules/ui.js";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const remainingCount = document.getElementById("remainingCount");
const clearCompleted = document.getElementById("clearCompleted");
const emptyState = document.getElementById("emptyState");

function getTasks(){
    return loadTasks();
}

function saveAndRender(tasks){
    saveTasks(tasks);
    renderTasks();
}

function addTask(){

    const text = taskInput.value.trim();

    if(!text){
        return;
    }

    const tasks = getTasks();

    tasks.push({
        id: Date.now(),
        text,
        completed:false
    });

    saveAndRender(tasks);

    taskInput.value = "";
    taskInput.focus();
}

function renderTasks(){

    const tasks = getTasks();

    taskList.innerHTML = "";

    tasks.forEach(task=>{
        taskList.appendChild(
            createTaskElement(task)
        );
    });

    updateRemaining(tasks);
    updateEmptyState(tasks);
}

function updateRemaining(tasks){

    const count = tasks.filter(
        task => !task.completed
    ).length;

    remainingCount.textContent = count;
}

function updateEmptyState(tasks){

    emptyState.style.display =
        tasks.length === 0
        ? "block"
        : "none";
}

function deleteTask(id){

    const tasks = getTasks().filter(
        task => task.id !== id
    );

    saveAndRender(tasks);
}

function toggleTask(id){

    const tasks = getTasks().map(task=>{

        if(task.id === id){
            task.completed = !task.completed;
        }

        return task;
    });

    saveAndRender(tasks);
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", e=>{

    if(e.key === "Enter"){
        addTask();
    }
});

taskList.addEventListener("click", e=>{

    const li = e.target.closest("li");

    if(!li){
        return;
    }

    const id = Number(li.dataset.id);

    if(e.target.classList.contains("delete-btn")){
        deleteTask(id);
    }

    if(e.target.classList.contains("toggle-btn")){
        toggleTask(id);
    }
});

clearCompleted.addEventListener("click", ()=>{

    const tasks = getTasks().filter(
        task => !task.completed
    );

    saveAndRender(tasks);
});

renderTasks();