const input = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");
const taskList = document.getElementById("taskList");
const tasks = []; 
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
if (savedTasks.length > 0) {
    console.log(savedTasks);
    savedTasks.forEach(function(taskText) {
        const task = document.createElement("li");
        task.textContent = taskText;
        taskList.appendChild(task); 
        const deleteButton=document.createElement("button");
deleteButton.classList.add("delete-button");
deleteButton.textContent="Delete";
task.appendChild(deleteButton);
deleteButton.onclick=function() {
    this.parentElement.remove();
    task.onclick =function() {
    if (task.style.textDecoration === "none") {
        task.style.textDecoration = "line-through";
    } else {
        task.style.textDecoration = "none";
    }
};
    }});
}
function addTask() {
const taskText =input.value;
if (taskText==="") {
return;
}
tasks.push(taskText);
localStorage.setItem("tasks", JSON.stringify(tasks));
const task=document.createElement("li");
task.onclick =function() {
    if (task.style.textDecoration === "none") {
        task.style.textDecoration = "line-through";
    } else {
        task.style.textDecoration = "none";
    }
};
task.textContent=taskText;
taskList.appendChild(task);

input.value="";
const deleteButton=document.createElement("button");
deleteButton.classList.add("delete-button");
deleteButton.textContent="Delete";
task.appendChild(deleteButton);
deleteButton.onclick=function() {
    this.parentElement.remove();
}};
function clearTasks() {
    taskList.textContent = "";
}}
