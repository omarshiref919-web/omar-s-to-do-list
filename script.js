const input = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");
const taskList = document.getElementById("taskList");

// Load saved tasks
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

const tasks = Array.isArray(savedTasks)
    ? savedTasks.map(function(item) {
        if (typeof item === "string") {
            return {
                text: item,
                completed: false
            };
        }

        return item;
    })
    : [];

// Save tasks in localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Create and display a task
function renderTask(taskData) {
    const task = document.createElement("li");
    task.textContent = taskData.text;

    if (taskData.completed) {
        task.style.textDecoration = "line-through";
    }

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";

    task.appendChild(deleteButton);

    // Mark task as completed or incomplete
    task.onclick = function() {
        taskData.completed = !taskData.completed;

        if (taskData.completed) {
            task.style.textDecoration = "line-through";
        } else {
            task.style.textDecoration = "none";
        }

        saveTasks();
    };

    // Delete task
    deleteButton.onclick = function(event) {
        event.stopPropagation();

        const index = tasks.indexOf(taskData);

        if (index !== -1) {
            tasks.splice(index, 1);
        }

        task.remove();
        saveTasks();
    };

    taskList.appendChild(task);
}

// Display saved tasks when the page opens
tasks.forEach(function(taskData) {
    renderTask(taskData);
});

// Add a new task
function addTask() {
    const taskText = input.value.trim();

    if (taskText === "") {
        return;
    }

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    renderTask(newTask);
    saveTasks();

    input.value = "";
}

// Clear all tasks
function clearTasks() {
    taskList.textContent = "";
    tasks.length = 0;
    saveTasks();
}
