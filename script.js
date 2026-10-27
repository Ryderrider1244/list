const tasks = document.querySelectorAll(".task");
const activeTasks = document.querySelector("#active-tasks");
const completedTasks = document.querySelector("#completed-tasks");

tasks.forEach(function(task) {
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
