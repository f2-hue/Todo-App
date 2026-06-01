export function createTaskElement(task){

    const li = document.createElement("li");

    li.dataset.id = task.id;

    if(task.completed){
        li.classList.add("done");
    }

    li.innerHTML = `
        <span class="task-text">
            ${task.text}
        </span>

        <div class="task-actions">

            <button class="toggle-btn">
                Done
            </button>

            <button class="delete-btn">
                Delete
            </button>

        </div>
    `;

    return li;
}