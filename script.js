let tasks = [];

    window.onload = function () {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        displayTask();
      }
    };

    function addTask() {
      const taskInput = document.getElementById("taskInput");
      const taskText = taskInput.value.trim();

      if (taskText !== "") {
        tasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTask();
        taskInput.value = "";
      }
    }

    function displayTask() {
      const taskList = document.getElementById("taskList");
      taskList.innerHTML = "";

      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
          alert(`Task "${task}" is completed.`);
          tasks.splice(index, 1);
          localStorage.setItem("tasks", JSON.stringify(tasks));
          displayTask();
        };

        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.onclick = function () {
          const updatedTask = prompt("Enter the updated task:", task);
          if (updatedTask !== null) {
            tasks[index] = updatedTask.trim();
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTask();
          }
        };

        li.appendChild(deleteButton);
        li.appendChild(updateButton);
        taskList.appendChild(li);
      });
    }