document.addEventListener('DOMContentLoaded', function() {
  let tasks = [];
 // Función para cambiar entre pestañas 
  function toggleTab(tabId) {
    // Obtener todos los botones de pestaña
    const tabs = document.querySelectorAll('.tab');
  
    // Remover la clase 'active' de todos los botones de pestaña
    tabs.forEach(tab => tab.classList.remove('active'));
  
    // Agregar la clase 'active' solo al botón de la pestaña seleccionada
    document.getElementById(tabId).classList.add('active');
  }
// Function to addTask
  function addTask(name) {
      if (!name.trim()) {
          alert('Please enter a task.');
          return;
      }

      if (tasks.some(task => task.name.toLowerCase() === name.toLowerCase())) {
          alert('That task already exists.');
          return;
      }

      const newTask = { name, completed: false, id: Date.now().toString() };
      tasks.push(newTask);
      updateTaskView();
  }
// Función para actualizar la visibilidad del botón deleteAllCompletedBtn  
  function updateDeleteAllCompletedBtnVisibility() {
    const deleteAllCompletedBtn = document.getElementById('deleteAllCompletedBtn');
    const completedTab = document.getElementById('completedTab');
    deleteAllCompletedBtn.style.display = completedTab.classList.contains('active') && tasks.some(task => task.completed) ? 'block' : 'none';
}
// Event listener para el cambio de pestaña
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
      // Ocultar el botón deleteAllCompletedBtn si la pestaña activa no es "Completed"
      updateDeleteAllCompletedBtnVisibility();
  });
});
// Function to update the view of tasks
  function updateTaskView() {
      const allTabList = document.getElementById('tasksList');
      const activeTabList = document.getElementById('activeTasksList');
      const completedTabList = document.getElementById('completedTasksList');
      const deleteAllCompletedBtn = document.getElementById('deleteAllCompletedBtn');
// Clear all lists
      allTabList.innerHTML = '';
      activeTabList.innerHTML = '';
      completedTabList.innerHTML = '';
// Loop through tasks to populate lists
      tasks.forEach(task => {
          const taskItem = document.createElement('li');
          taskItem.innerHTML = `
              <input type="checkbox" id="task-${task.id}" ${task.completed ? 'checked' : ''}>
              <label for="task-${task.id}" class="${task.completed ? 'completed' : ''}">${task.name}</label>
              <button class="deleteBtn" data-id="${task.id}"><i class="fas fa-trash"></i></button>
          `;
// Agregar elemento a la lista de todas las tareas
          allTabList.appendChild(taskItem.cloneNode(true));
// Crear un nuevo elemento para la lista de tareas activas        
          const activeTaskItem = document.createElement('li');
          activeTaskItem.innerHTML = taskItem.innerHTML;
// Agregar elemento a la lista de tareas activas
          if (!task.completed) {
            activeTabList.appendChild(activeTaskItem);
        } else {
          completedTabList.appendChild(taskItem.cloneNode(true));
      }
  });

  // Show or hide delete all completed button
  deleteAllCompletedBtn.style.display = tasks.some(task => task.completed) ? 'block' : 'none';
}
  
  document.getElementById('addTaskBtn').addEventListener('click', () => {
      const taskInput = document.getElementById('taskInput');
      addTask(taskInput.value);
      taskInput.value = '';
  });

  document.addEventListener('change', event => {
      if (event.target.matches('input[type="checkbox"]')) {
          const taskId = event.target.id.split('-')[1];
          const isChecked = event.target.checked;
          const taskIndex = tasks.findIndex(task => task.id === taskId);
          if (taskIndex !== -1) {
              tasks[taskIndex].completed = isChecked;
              updateTaskView();
          }
// Actualizar la visibilidad del botón deleteAllCompletedBtn después de cambiar el estado de la tarea          
          updateDeleteAllCompletedBtnVisibility();
// Ocultar el botón deleteAllCompletedBtn si no hay tareas completadas
if (document.getElementById('completedTab').classList.contains('active')) {
  const deleteAllCompletedBtn = document.getElementById('deleteAllCompletedBtn');
  deleteAllCompletedBtn.style.display = tasks.some(task => task.completed) ? 'block' : 'none';

}
}
});

  document.addEventListener('click', event => {
      if (event.target.matches('.deleteBtn')) {
          const taskId = event.target.parentElement.dataset.id;
          tasks = tasks.filter(task => task.id !== taskId);
          updateTaskView();
      }
  });
  document.getElementById('allTab').addEventListener('click', () => {
    const allTasksList = document.getElementById('tasksList');
    const activeTasksList = document.getElementById('activeTasksList');
    const completedTasksList = document.getElementById('completedTasksList');
    const deleteAllCompletedBtn = document.getElementById('deleteAllCompletedBtn');
    
    // Ocultar el botón de eliminar todas las tareas completadas
    deleteAllCompletedBtn.style.display = 'none';
// Ocultar el botón deleteAllCompletedBtn
document.getElementById('deleteAllCompletedBtn').style.display = 'none';
    // Ocultar todas las listas de tareas excepto la de todas las tareas
    completedTasksList.style.display = 'none';
    activeTasksList.style.display = 'none';
    allTasksList.style.display = 'block';

});

document.getElementById('activeTab').addEventListener('click', () => {
    const allTasksList = document.getElementById('tasksList');
    const activeTasksList = document.getElementById('activeTasksList');
    const completedTasksList = document.getElementById('completedTasksList');
    const deleteAllCompletedBtn = document.getElementById('deleteAllCompletedBtn');
    
    // Ocultar el botón de eliminar todas las tareas completadas
    deleteAllCompletedBtn.style.display = 'none';

// Ocultar el botón deleteAllCompletedBtn
document.getElementById('deleteAllCompletedBtn').style.display = 'none';
    // Ocultar todas las listas de tareas excepto la de tareas activas
    completedTasksList.style.display = 'none';
    allTasksList.style.display = 'none';
    activeTasksList.style.display = 'block';

  
});


document.getElementById('completedTab').addEventListener('click', () => {
    const allTasksList = document.getElementById('tasksList');
    const activeTasksList = document.getElementById('activeTasksList');
    const completedTasksList = document.getElementById('completedTasksList');
    const deleteAllCompletedBtn = document.getElementById('deleteAllCompletedBtn');

    // Ocultar todas las listas de tareas
    allTasksList.style.display = 'none';
    activeTasksList.style.display = 'none';

    // Mostrar solo la lista de tareas completadas
    completedTasksList.style.display = 'block';

    // Mostrar u ocultar el botón de eliminar todas las tareas completadas
    deleteAllCompletedBtn.style.display = 'block'; // Mostrar el botón al cambiar a la pestaña "Completed"

});


 // Agregar listener para el botón Delete All Completed
    document.getElementById('deleteAllCompletedBtn').addEventListener('click', () => {
        tasks = tasks.filter(task => !task.completed);
        updateTaskView();
    });
  updateTaskView();
});
