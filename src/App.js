import Header from './components/Header'
import Footer from './components/Footer'
import Task from './components/Task'
import AddTask from './components/AddTask'
import About from './components/About'
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
    
  const [task, setTask] = useState([])

  useEffect(() => {
      const getTasks = async () => {
        const tasksFromServer = await fetchTasks()
        setTask(tasksFromServer)
      }
    getTasks()
  }, [])

  // Fetch Tasks
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/task')
      const data = await res.json()

      // console.log(data)
      return data
    }

    // Fetch Task
    const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/task/${id}`)
      const data = await res.json()

      // console.log(data)
      return data
    }

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/task', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTask([{...task}, data])
    // const id = Math.floor(Math.random() * 10000) + 1

    // const newTask = { id, ...task }
    // setTask([{...task}, newTask ])
  }

  // Delete Task
  const deleteTask = async(id) => {
    await fetch(`http://localhost:5000/task/${id}`, {
      method: 'DELETE'
    })

    setTask(task.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })  

    const data = await res.json()

    setTask(task.map((task) => 
      task.id === id ? { ...task, reminder: 
        data.reminder } : task ))
  }
  
  return (
    <Router>
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {task.length > 0 ? <Task task={task} onToggle={toggleReminder} onDelete={deleteTask} /> : 'No Task to Display'}

      <Route
        path='/' 
        exact  />
      <Route path='/about' component={About} />
      <Footer />
    </div>
    </Router>
  );
}

export default App;
