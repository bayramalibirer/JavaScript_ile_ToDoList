// to_do_list.js

function loadTasksFromLocalStorage() {
  var Tasks = localStorage.getItem("tasks");

  if (Tasks) {
    Tasks = JSON.parse(Tasks);
    var taskList = document.getElementById("list");

    for (var i = 0; i < Tasks.length; i++) {
      var task = Tasks[i];
      createTaskElement(task, taskList);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadTasksFromLocalStorage();
});

function newElement() {
  var inputValue = document.getElementById("task").value;
  if (inputValue === "" || inputValue.replace(/^\s+|\s+$/g, "").length == 0){
    $(".error").toast("show");
  }else{ 
    var taskList = document.getElementById("list");
    createTaskElement(inputValue, taskList);
    document.getElementById("task").value = "";
    addToLocalStorage(inputValue);
    $(".success").toast("show");
  }

}
function createTaskElement(task, taskList) {
  var li = document.createElement("li");
  li.textContent = task;
  li.onclick = function () {
    toggleTaskCompletion(li, task);
  };

  var closeButton = document.createElement("span");
  closeButton.innerHTML = "&times;";
  closeButton.classList.add("close");
  closeButton.onclick = function (event) {
    event.stopPropagation();
    removeTaskElement(li, task);
  };

  li.appendChild(closeButton);
  taskList.appendChild(li);

  if (task.startsWith("✔ ")) {
    li.classList.add("completed");
  }
}
function toggleTaskCompletion(li, task) {
  li.classList.toggle("completed");
  updateLocalStorageTaskCompletion(task);
  
}

function updateLocalStorageTaskCompletion(task) {
  var Tasks = localStorage.getItem("tasks");

  if (Tasks) {
    Tasks = JSON.parse(Tasks);

    for (var i = 0; i < Tasks.length; i++) {
      if (Tasks[i] === task) {
        Tasks[i] = Tasks[i].startsWith("✔ ") ? task.substring(2) : "✔ " + task;
        break;
      }
    }

    localStorage.setItem("tasks", JSON.stringify(Tasks));
    setTimeout(function () {
      location.reload();
    }, 100);
  }
}

function removeTaskElement(li, task) {
  li.remove();
  removeTaskFromLocalStorage(task);
}

function removeTaskFromLocalStorage(task) {
  var Tasks = localStorage.getItem("tasks");

  if (Tasks) {
    Tasks = JSON.parse(Tasks);

    var index = Tasks.indexOf(task);
    if (index > -1) {
      Tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(Tasks));
    }
  }
}

function addToLocalStorage(task) {
  var Tasks = localStorage.getItem("tasks");

  if (Tasks) {
    Tasks = JSON.parse(Tasks);
  } else {
    Tasks = [];
  }

  Tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(Tasks));
}



