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
    li.textContent = task.description;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(task.id);
    li.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editTask(task.id);
    li.appendChild(editButton);

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
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const newTask = {
    id: Date.now(),
    description: taskInput.value,
    status: 'todo',
  };
  tasks.push(newTask);
  taskInput.value = '';
  displayTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  displayTasks();
}

function editTask(id) {
  const updatedDescription = prompt('Enter updated task description:');
  if (updatedDescription !== null) {
    tasks = tasks.map(task => {
      if (task.id === id) {
        task.description = updatedDescription;
      }
      return task;
    });
    displayTasks();
  }
}

// Sample tasks for demonstration purposes
tasks = [
  { id: 1, description: 'Task 1', status: 'todo' },
  { id: 2, description: 'Task 2', status: 'inProgress' },
  { id: 3, description: 'Task 3', status: 'completed' },
];

displayTasks();
