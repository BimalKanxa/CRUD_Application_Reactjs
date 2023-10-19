
import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
// Hooks
import { useState, useEffect } from 'react';
// Packages
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";


function App() {

  const [tasks, setTasks] = useState([]); // Task State
const [showAddTask, setShowAddTask] = useState(false); // To reveal add task form
const [loading, setloading] = useState(true);

useEffect(() => {
  setTimeout(() => {
      setloading(false); 
  }, 1000);

}, [])

//create task
const addTask = (task) => {
  const id = uuidv4();
  const newTask = { id, ...task }
  setTasks([...tasks, newTask]);
  // Swal.fire({
  //     icon: 'success',
  //     title: 'Yay...',
  //     text: 'You have successfully added a new task!'
  // })

  Swal.fire({
    title: 'Yay...You have successfully added a new task!',
    width: 600,
    padding: '3em',
    color: '#716add',
    background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
    backdrop: `
      rgba(0,0,123,0.4)
      url("https://sweetalert2.github.io/images/nyan-cat.gif")
      left top
      no-repeat
    `
  })
  localStorage.setItem("taskAdded", JSON.stringify([...tasks, newTask]));
}

// Delete Task
const deleteTask = (id) => {
  const deleteTask = tasks.filter((task) => task.id !== id);
  setTasks(deleteTask);
  // Swal.fire({
  //     icon: 'success',
  //     title: 'Oops...',
  //     text: 'You have successfully deleted a task!'
  // })
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
  localStorage.setItem("taskAdded", JSON.stringify(deleteTask));
}

// Edit Task
const editTask = (id) => {
  const text = prompt("Task Name");
  const day = prompt("Description");
  let data = JSON.parse(localStorage.getItem('taskAdded'));
  const myData = data.map(x => {
      if (x.id === id) {
          return {
              ...x,
              text: text,
              day: day,
              id: uuidv4()
          }
      }
      return x;
  })
  Swal.fire({
      icon: 'success',
      title: 'Yay...',
      text: 'You have successfully edited an existing task!'
  })
  localStorage.setItem("taskAdded", JSON.stringify(myData));
    window.location.reload();
}

// Fetching from Local Storage
const getTasks = JSON.parse(localStorage.getItem("taskAdded"));
useEffect(() => {
    if (getTasks == null) {
        setTasks([])
    } else {
        setTasks(getTasks);
    }
      //eslint-disable-next-line
}, [])

  return (
    <>
    
  { loading? 

  ( <div className='spinner-container'><div className="spinner-border" role="status">
  <span className="visually-hidden">Loading...</span></div> 
      </div>
  ): 
  <div className='container'>
   <Header showForm={() => setShowAddTask(!showAddTask)} changeTextAndColor={showAddTask} />
    {/* Revealing the Add Task Form */}
    {showAddTask && <AddTask onSave={addTask} />}
            
            {/* Displaying Tasks */}
            {
              tasks.length > 0 ?
                (<Tasks tasks={tasks} onDelete={deleteTask} onEdit={editTask}/>) :
                ('No Task Found!')
            }
{/* Task Counter */}
<h3>Number of Tasks: {tasks.length}</h3>
   </div>
   }
    </>
  );
}

export default App;
