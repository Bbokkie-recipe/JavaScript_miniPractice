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
let deleteButton = document.getElementById("delete-button");
let taskList = [];
addButton.addEventListener("click", addTask);

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
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isCompleted == true) {
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
