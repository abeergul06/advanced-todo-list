let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.querySelector(".task-input");
const addBtn = document.querySelector(".add-btn");
const taskList = document.querySelector(".task-list");


// ADD TASK
addBtn.addEventListener("click", addTask);

function addTask() {

    let title = taskInput.value.trim();

    if (title === "") {
        alert("Please enter a task!");
        return;
    }

    let task = {
        id: Date.now(),
        title: title,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    taskInput.value = "";

    displayTasks();
}


// DISPLAY TASKS
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task) {

        let div = document.createElement("div");

        div.innerHTML = `
            <h3>${task.title}</h3>

            <button onclick="completeTask(${task.id})">
                ${task.completed ? "Undo" : "Complete"}
            </button>

            <button onclick="deleteTask(${task.id})">
                Delete
            </button>
        `;

        if (task.completed) {
            div.style.textDecoration = "line-through";
        }

        taskList.appendChild(div);
    });
}


// COMPLETE / UNDO TASK
function completeTask(id) {

    let task = tasks.find(function(task) {
        return task.id === id;
    });

    task.completed = !task.completed;

    saveTasks();
    displayTasks();
}


// DELETE TASK
function deleteTask(id) {

    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    saveTasks();
    displayTasks();
}


// SAVE TASKS
function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


// SHOW TASKS WHEN PAGE LOADS
displayTasks();