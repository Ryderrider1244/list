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

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let taskCounter = 0;
const taskName = document.getElementById("task-name");
const reminderType = document.getElementById("reminder-type");
const startDate = document.getElementById("start-date");
const dueDate = document.getElementById("due-date");
const dailyDate = document.getElementById("daily-date");
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const taskPlaceholder = document.getElementById("task-placeholder");
const today = new Date().toISOString().split("T")[0];

startDate.value = today;
dailyDate.value = today;

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task) {
        const taskListItem = document.createElement("li");

        const taskNameElement = document.createElement("span");
        taskNameElement.textContent = task.name;

        const taskDate = document.createElement("span");

        if (task.type === "daily") {
            taskDate.textContent = `Starts: ${task.dailyDate}`;
        }
        else if (task.type === "period") {
            taskDate.textContent = `${task.startDate} - ${task.dueDate}`;
        }

        taskListItem.appendChild(taskNameElement);
        taskListItem.appendChild(taskDate);
        const taskId = task.id;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(function(currentTask) {
                return currentTask.id !== task.id;
            });

            localStorage.setItem("tasks", JSON.stringify(tasks));

            displayTasks();
            updateTaskPlaceholder();
        });

        taskListItem.appendChild(deleteButton);
        taskList.appendChild(taskListItem);
        updateTaskPlaceholder();
    });
}

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const task = {
        id: taskCounter++,
        name: taskName.value,
        type: reminderType.value,
        dailyDate: dailyDate.value,
        startDate: startDate.value,
        dueDate: dueDate.value
    };

    if (taskName.value.trim() === "") {
        return;
    }

    if (reminderType.value === "daily" && dailyDate.value === "") {
        return;
    }

    if (reminderType.value === "period" && (startDate.value === "" || dueDate.value === "")) {
        return;
    }

    const taskListItem = document.createElement("li");

    console.log(task);
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();

    taskName.value ="";
    startDate.value = today;
    dueDate.value ="";
    dailyDate.value = today;


    const taskNameElement = document.createElement("span");
    taskNameElement.textContent = task.name;

    const taskDate = document.createElement("span");

    if (task.type === "daily") {
        taskDate.textContent = `Starts: ${task.dailyDate}`;
    }

    else if (task.type === "period") {
        taskDate.textContent = `${task.startDate} - ${task.dueDate}`;
    }

});


function updateTaskPlaceholder() {
    if (tasks.length === 0) {
        taskPlaceholder.style.display = "block";
    } else {
        taskPlaceholder.style.display = "none";
    }
    };

updateTaskPlaceholder();

displayTasks();




