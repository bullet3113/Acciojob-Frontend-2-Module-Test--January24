
const inputTask = document.getElementById('inputTask');
const addBtn = document.getElementById('addTaskBtn');
const container = document.getElementById('container');
const editBtn = document.getElementById('editTaskBtn');
const editInputTask = document.getElementById('editInputTask');
const modalCloseBtn = document.getElementById('modalCloseBtn');

let taskId = 1;

function getTaskId() {
    return taskId++;
}

let data = [];

addBtn.addEventListener('click', function () {
    let task = inputTask.value;
    let tId = getTaskId();
    data.push({"tId": tId, "taskName": task, "priority": "high", "progress" : "todo"});
    renderElements();
    inputTask.value = "";
})

function renderElements() {
    let card = "";
    data.forEach((e) => {
        let task = e.taskName;
        let tId = e.tId;
        let priority = e.priority;
        let progress = e.progress;

        let priorityBtn = priority == 'high' ? `<span id=${tId} onclick="changePriority(${tId})" type="button" class="text-danger fw-semibold me-1">H</span>` : priority == 'medium' ? `<span id=${tId} onclick="changePriority(${tId})" type="button" class="text-warning fw-semibold me-1">M</span>` : `<span id=${tId} onclick="changePriority(${tId})" type="button" class="text-success fw-semibold me-1">L</span>`;

        let progressBtn = progress == "todo" ? `<span id=${tId} onclick="changeProgress(${tId})" type="button" class="text-danger fw-semibold me-1">Todo</span>` : progress == "working" ? `<span id=${tId} onclick="changeProgress(${tId})" type="button" class="text-warning fw-semibold me-1">In-progress</span>` : `<span id=${tId} onclick="changeProgress(${tId})" type="button" class="text-success fw-semibold me-1">Done</span>`;

        card += `<div class="card mt-2" id=${"card"+tId}>
    <div class="card-body d-flex">
      <input type="checkbox" class="form-check-input me-2" id="doneCheck" />
      <h5 class="card-title" id=${"taskName"+tId}>${task}</h5>
      <div class="position-absolute end-0 me-3">
      ${priorityBtn}${progressBtn}
        <i class="bi bi-pencil-square" data-bs-toggle="modal"
        data-bs-target="#exampleModal" id=${tId} onclick="editTask(${tId})"></i>
        <i class="bi bi-trash3" id=${tId} onclick="deleteTask(${tId})"></i>
      </div>
      <div class="d-block">
      
      
      </div>
    </div>
  </div>`;

  
    })
    
    container.innerHTML = card;
}


function showModal(id) {
    let task = {};
    data.forEach((d) => {
        if(d.tId == id) task = d;
    });
    console.log(task);
    // console.log()
    editInputTask.value = task.taskName;
    editBtn.name = id;
    // let modal = ``;
    // console.log(modal)
//   container.innerHTML += modal;
}

editBtn.addEventListener('click', function(e) {
    let tId = editBtn.name;
    let taskValue = editInputTask.value;
    console.log(tId)
    console.log(taskValue)
    data.forEach((d) => {
        console.log(d)
        if(d.tId == tId) {
            d.taskName = taskValue;
        }
    });
    console.log(data);
    renderElements();
});

// modalCloseBtn.addEventListener('click', renderElements);

function editTask(id) {

    showModal(id);
    // console.log(container.children)
    // console.log(e);
}

function deleteTask(id) {
    let tempData = data.filter((d) => d.tId != id);
    data = tempData;
    renderElements();
}

function changePriority(id) {
    data.forEach((d) => {
        if(d.tId == id) {
            d.priority = d.priority == 'low' ? 'medium' : d.priority == 'medium' ? 'high' : 'low';
        }
    });
    console.log(data)
    renderElements();
}

function changeProgress(id) {
    data.forEach((d) => {
        if(d.tId == id) {
            d.progress = d.progress == 'todo' ? 'working' : d.progress == 'working' ? 'done' : 'todo';
        }
    });
    renderElements();
    console.log(data)
}