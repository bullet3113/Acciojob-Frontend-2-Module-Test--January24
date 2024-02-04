
const inputTask = document.getElementById('inputTask');
const addBtn = document.getElementById('addTaskBtn');
const container = document.getElementById('container');

let taskId = 1;

function getTaskId() {
    return taskId++;
}

let data = [];

addBtn.addEventListener('click', function () {
    let task = inputTask.value;
    let tId = getTaskId();
    data.push({"tId": tId, "taskName": task});
    renderElements();
})

function renderElements() {
    let card = "";
    data.forEach((e) => {
        let task = e.taskName;
        let tId = e.tId;
        card += `<div class="card" id=${"card"+tId}>
    <div class="card-body d-flex">
      <input type="checkbox" class="form-check-input me-2" id="doneCheck" />
      <h5 class="card-title" id="taskName">${task}</h5>
      <div class="position-absolute end-0 me-3">
        <i class="bi bi-pencil-square" id=${tId} onclick="editTask(${tId})"></i>
        <i class="bi bi-trash3" id=${tId} onclick="deleteTask(${tId})"></i>
      </div>
    </div>
  </div>`;

  
    })
    
    container.innerHTML = card;
}

function editTask(e) {
    console.log(container.children)
    console.log(e);
}

function deleteTask(id) {
    let tempData = data.filter((d) => d.tId != id);
    data = tempData;
    renderElements();
}