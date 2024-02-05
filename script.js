
const inputTask = document.getElementById('inputTask');
const addBtn = document.getElementById('addTaskBtn');
const todoContainer = document.getElementById('todo-container');
const workingContainer = document.getElementById('working-container');
const doneContainer = document.getElementById('done-container');
const editBtn = document.getElementById('editTaskBtn');
const editInputTask = document.getElementById('editInputTask');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const suggestions = document.querySelector('.suggestions ul');

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
    let todoCards = "";
    let workingCards = "";
    let doneCards = "";
    let todoCount = 0, workingCount = 0, doneCount = 0;
    data.forEach((e) => {
        let task = e.taskName;
        let tId = e.tId;
        let priority = e.priority;
        let progress = e.progress;
        let card = "";

        let priorityBtn = priority == 'high' ? `<span id=${tId} onclick="changePriority(${tId})" type="button" class="text-danger fw-semibold me-1">H</span>` : priority == 'medium' ? `<span id=${tId} onclick="changePriority(${tId})" type="button" class="text-warning fw-semibold me-1">M</span>` : `<span id=${tId} onclick="changePriority(${tId})" type="button" class="text-success fw-semibold me-1">L</span>`;

        let progressBtn = progress == "todo" ? `<span id=${tId} onclick="changeProgress(${tId})" type="button" class="text-danger fw-semibold me-1">Todo</span>` : progress == "working" ? `<span id=${tId} onclick="changeProgress(${tId})" type="button" class="text-warning fw-semibold me-1">In-progress</span>` : `<span id=${tId} onclick="changeProgress(${tId})" type="button" class="text-success fw-semibold me-1">Done</span>`;

        card = `<div class="card mt-2" id=${"card"+tId}>
    <div class="card-body d-flex">
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

        if(progress == 'todo') {
            todoCards += card;
            todoCount++;
        } else if(progress == 'working') {
            workingCards += card;
            workingCount++;
        } else if(progress == 'done') {
            doneCards += card;
            doneCount++;
        }
    })
    
    document.getElementById('todo-badge').textContent = todoCount;
    document.getElementById('working-badge').textContent = workingCount;
    document.getElementById('done-badge').textContent = doneCount;

    todoContainer.innerHTML = todoCards;
    workingContainer.innerHTML = workingCards;
    doneContainer.innerHTML = doneCards;
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



// search functionality


function search(str) {
	let results = [];
	const val = str.toLowerCase();

	for (i = 0; i < data.length; i++) {
		if (data[i].taskName.toLowerCase().indexOf(val) > -1) {
			results.push(data[i].taskName);
		}
	}

	return results;
}

function searchHandler(e) {
	const inputVal = e.currentTarget.value;
	let results = [];
	if (inputVal.length > 0) {
		results = search(inputVal);
	}
	showSuggestions(results, inputVal);
}

function showSuggestions(results, inputVal) {
    
    suggestions.innerHTML = '';

	if (results.length > 0) {
		for (i = 0; i < results.length; i++) {
			let item = results[i];
			// Highlights only the first match
			// TODO: highlight all matches
			const match = item.match(new RegExp(inputVal, 'i'));
			item = item.replace(match[0], `<strong>${match[0]}</strong>`);
			suggestions.innerHTML += `<li>${item}</li>`;
		}
		suggestions.classList.add('has-suggestions');
	} else {
		results = [];
		suggestions.innerHTML = '';
		suggestions.classList.remove('has-suggestions');
	}
}

function useSuggestion(e) {
	inputTask.value = e.target.innerText;
	inputTask.focus();
	suggestions.innerHTML = '';
	suggestions.classList.remove('has-suggestions');
}

inputTask.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);