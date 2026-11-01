const checklistTasks = document.querySelectorAll(".task");
const activeTasks = document.querySelector("#active-tasks");
const completedTasks = document.querySelector("#completed-tasks");

checklistTasks.forEach(function(task) {
    const checkbox = task.querySelector("input");

    checkbox.addEventListener("change", function() {
        task.classList.toggle("completed", checkbox.checked);

        if (checkbox.checked) {
            completedTasks.appendChild(task);
        } else {
            activeTasks.appendChild(task);
        }
    });
});


const popup = document.getElementById("popup");
const openButton = document.getElementById("open-form");
const closeButton = document.getElementById("close-form");

openButton.addEventListener("click", function() {
    popup.style.display = "flex";
});

closeButton.addEventListener("click", function() {
    popup.style.display = "none";
});

let tasks =[];
const taskName = document.getElementById("task-name");
const reminderType = document.getElementById("reminder-type");
const startDate = document.getElementById("start-date");
const dueDate = document.getElementById("due-date");
const dailyDate = document.getElementById("daily-date");
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskListItem = document.createElement("li");

    const task = {
        name: taskName.value,
        type: reminderType.value,
        dailyDate: dailyDate.value,
        startDate: startDate.value,
        dueDate: dueDate.value
    };

    tasks.push(task);
    taskListItem.textContent = task.name;
    taskList.appendChild(taskListItem);
    taskName.value ="";

    
});
