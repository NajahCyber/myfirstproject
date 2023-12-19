let tasks = [];

function displayTasks() {
  const todoList = document.getElementById('todoList');
  const inProgressList = document.getElementById('inProgressList');
  const completedList = document.getElementById('completedList');

  todoList.innerHTML = '';
  inProgressList.innerHTML = '';
  completedList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.classList.add('task');
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = task.name.slice(0, 20);
    nameSpan.classList.add('task-name');
    li.appendChild(nameSpan);
    
    const description = document.createElement('span');
    description.textContent = task.description;
    description.classList.add('task-description');
    description.style.display = 'none';
    li.appendChild(description);

    li.addEventListener('click', () => {
      if (description.style.display === 'none') {
        description.style.display = 'block';
      } else {
        description.style.display = 'none';
      }
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editTask(task.id);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(task.id);

    const editDeleteContainer = document.createElement('div');
    editDeleteContainer.classList.add('task-buttons');
    editDeleteContainer.appendChild(editButton);
    editDeleteContainer.appendChild(deleteButton);

    const moveButtonsContainer = document.createElement('div');
    moveButtonsContainer.classList.add('task-buttons');

    switch (task.status) {
      case 'todo':
        const inProgressButton = createMoveButton('Move to In Progress', 'inProgress', task.id);
        moveButtonsContainer.appendChild(inProgressButton);
        break;
      case 'inProgress':
        const completeButton = createMoveButton('Move to Completed', 'completed', task.id);
        moveButtonsContainer.appendChild(completeButton);
        const backToTodoButton = createMoveButton('Move back to To Do', 'todo', task.id);
        moveButtonsContainer.appendChild(backToTodoButton);
        break;
      case 'completed':
        const backToInProgressButton = createMoveButton('Move back to In Progress', 'inProgress', task.id);
        moveButtonsContainer.appendChild(backToInProgressButton);
        break;
      default:
        break;
    }

    li.appendChild(editDeleteContainer);
    li.appendChild(moveButtonsContainer);

    switch (task.status) {
      case 'todo':
        todoList.appendChild(li);
        break;
      case 'inProgress':
        inProgressList.appendChild(li);
        break;
      case 'completed':
        completedList.appendChild(li);
        break;
      default:
        break;
    }
  });

  toggleNoTaskMessage(todoList);
  toggleNoTaskMessage(inProgressList);
  toggleNoTaskMessage(completedList);
}

function toggleNoTaskMessage(taskList) {
  const noTaskMessage = taskList.parentElement.querySelector('.no-task-msg');
  if (taskList.children.length === 0) {
    noTaskMessage.style.display = 'block';
  } else {
    noTaskMessage.style.display = 'none';
  }
}

function createMoveButton(text, targetStatus, taskId) {
  const button = document.createElement('button');
  button.textContent = text;
  button.classList.add('task-button');
  button.onclick = () => moveTask(taskId, targetStatus);
  return button;
}

function addTask() {
  const taskNameInput = document.getElementById('taskNameInput');
  const taskDescriptionInput = document.getElementById('taskDescriptionInput');

  const newTask = {
    id: Date.now(),
    name: taskNameInput.value,
    description: taskDescriptionInput.value,
    status: 'todo',
  };
  tasks.push(newTask);
  taskNameInput.value = '';
  taskDescriptionInput.value = '';
  displayTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  displayTasks();
}

function editTask(id) {
  const taskToEdit = tasks.find(task => task.id === id);

  const updatedName = prompt('Enter updated task name:', taskToEdit.name);
  if (updatedName !== null) {
    const updatedDescription = prompt('Enter updated task description:', taskToEdit.description);

    tasks = tasks.map(task => {
      if (task.id === id) {
        task.name = updatedName;
        task.description = updatedDescription;
      }
      return task;
    });

    displayTasks();
  }
}

function moveTask(taskId, newStatus) {
  tasks = tasks.map(task => {
    if (task.id === taskId) {
      task.status = newStatus;
    }
    return task;
  });
  displayTasks();
}

// Sample tasks for demonstration purposes
tasks = [
  { id: 1, name: 'Task 1', description: 'Description for Task 1', status: 'todo' },
  { id: 2, name: 'Task 2', description: 'Description for Task 2', status: 'inProgress' },
  { id: 3, name: 'Task 3', description: 'Description for Task 3', status: 'completed' },
];

displayTasks();
