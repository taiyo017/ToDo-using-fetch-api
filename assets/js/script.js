// Get DOM elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage if available
window.onload = loadTasks;

// Add task event listener
addTaskButton.addEventListener('click', addTask);

// Add a new task to the list
function addTask() {
  const taskValue = taskInput.value.trim();

  if (taskValue !== '') {
    // Create new task
    const li = document.createElement('li');
    li.innerHTML = `
      ${taskValue}
      <button class="delete-btn">Delete</button>
    `;

    // Add event listener for marking task as completed
    li.addEventListener('click', function () {
      li.classList.toggle('completed');
      saveTasks();
    });

    // Add event listener for deleting task
    li.querySelector('.delete-btn').addEventListener('click', function (e) {
      e.stopPropagation();
      li.remove();
      saveTasks();
    });

    // Append the new task to the task list
    taskList.appendChild(li);

    // Clear input field
    taskInput.value = '';

    // Save tasks to localStorage
    saveTasks();
  }
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach((task) => {
    tasks.push({
      text: task.textContent.replace('Delete', '').trim(),
      completed: task.classList.contains('completed'),
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    JSON.parse(storedTasks).forEach((task) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${task.text}
        <button class="delete-btn">Delete</button>
      `;
      if (task.completed) {
        li.classList.add('completed');
      }

      // Add event listener for completing and deleting tasks
      li.addEventListener('click', function () {
        li.classList.toggle('completed');
        saveTasks();
      });

      li.querySelector('.delete-btn').addEventListener('click', function (e) {
        e.stopPropagation();
        li.remove();
        saveTasks();
      });

      taskList.appendChild(li);
    });
  }
}
