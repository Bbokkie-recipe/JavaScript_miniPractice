//유저가 값을 입력한다.
//+ 버튼을 클릭하면, 할일이 추가된다.
//delete 버튼을 누르면 할일이 삭제된다.
//check 버튼을 누르면 할일이 끝나면서 밑줄이 그어진다.
//1 check 버튼을 클릭하는 순간 true false
//2 true이면 끝난걸로 간주하고 밑줄 보여주기
//3 false이면 안 끝난걸로 간주하고 그대로
//진행중 끝남 탭을 누르면, 언더바가 이동하낟.
//끝남 탭은 끝난 아이템만, 진행 중 탭은 진행중인 아이템만 보여준다.
//전체 탭을 누르면 다시 전체 아이템으로 돌아온다.

let taskInput = document.getElementById("task-input");
console.log(taskInput);
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "";
let filterList = [];
addButton.addEventListener("click", addTask);
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}
console.log(tabs);
function addTask() {
  console.log("click");
  let task = {
    id: uid(),
    taskContent: taskInput.value,
    isCompleted: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function deleteTask() {
  console.log("deleteTask");
  let taskContent = taskInput.value;
  taskList.pop(taskContent);
  console.log(taskList);
  render();
}

function render() {
  let list = [];
  if (mode != "ongoing" && mode != "done") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isCompleted == true) {
      resultHTML += `<div class="task">
    <div class ="task-done">${taskList[i].taskContent}</div>
    <div>
    <button class="w-btn-blue w-btn"  onclick="toggleComplete('${taskList[i].id}')">Check</button>
    <button class="w-btn-green w-btn"id="delete-button" onclick ="deleteTask('${taskList[i].id}')">Delete</button>
  </div>  
  </div>`;
    } else {
      resultHTML += `<div class="task">
    <div>${taskList[i].taskContent}</div>
    <div>
    <button class="w-btn-blue w-btn"  onclick="toggleComplete('${taskList[i].id}')">Check</button>
    <button class="w-btn-green w-btn"id="delete-button"  onclick ="deleteTask('${taskList[i].id}')">Delete</button>
  </div>  
  </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isCompleted = !taskList[i].isCompleted;
      break;
    }
    console.log(taskList);
  }
  render();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  console.log("삭제");
  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  console.log("filter 클림됨!", event.target.id);
  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isCompleted == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isCompleted == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function uid() {
  let a = new Uint32Array(3);
  window.crypto.getRandomValues(a);
  return (
    performance.now().toString(36) +
    Array.from(a)
      .map((A) => A.toString(36))
      .join("")
  ).replace(/\./g, "");
}
