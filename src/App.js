import { isEmpty,size } from 'lodash'
import React, {useState}from 'react'
import shortid from 'shortid'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTaskst] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

  const validForm = () =>{
    let isValid = true
    setError(null)

    if(isEmpty(task)){
      setError("Debes ingresar una tarea.")
      isValid = false
    }
    return isValid
  }

  const addTask = (e) =>{
    e.preventDefault() // para que no recargue la pagina
    if (!validForm()){
      return
    }
    const newTask = {
      id:shortid.generate(),
      name: task
    }    
    setTaskst([...tasks, newTask])
    setTask("")
  }
  const deleteTask = (id) =>{
    const filteredTasks = tasks.filter(task => task.id !== id)
    setTaskst(filteredTasks)
  }

  const editTask = (theTask) => {
    setTask(theTask.name)
    setEditMode(true)
    setId(theTask.id)
  }

  const saveTask = (e) => {
    e.preventDefault()

    if (!validForm()){
      return
    }
    
    const editedTasks = tasks.map(item => item.id === id ? {id, name:task} : item)
    setTaskst(editedTasks)
    setEditMode(false)
    setTask("")
    setId("")

  }

  return (
    <div className='container mt-5'>
      <h1> Tareas</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className='text-center'>Lista de tareas</h4>
        {
          size(tasks) == 0 ?(
            <li className='list-group-item'>Aun no hay tareas programadas.</li>
          ) : (
            <ul className="list-group">
            {
              tasks.map((task) => (
              <li className="list-group-item" key={task.id}>
              <span className='lead'>{task.name}</span>
              <button className='btn btn-danger btn-sm float-end' onClick={() => deleteTask(task.id)}>Eliminar</button>
              <button className='btn btn-warning btn-sm float-end mx-2'
              onClick={() => editTask(task)}>Editar</button>
              
              </li>
              ))
            
            }
          </ul>
          )         
          
          }
        </div>
        <div className="col-4 ">
          <h4 className='text-center'>{editMode ? "Modificar Tarea" : "Agregar Tarea"}</h4>
          <form action="" onSubmit={editMode ? saveTask : addTask}>
          {
              error && <span className='text-danger '>{error}</span>
            }
            <input type="text" className='form-control mb-2'  placeholder='Ingrese la tarea...' 
            onChange={(text) => setTask(text.target.value)} 
            value={task}/>
            
            <button className={editMode ? 'btn btn-warning btn-block' : 'btn btn-dark btn-block' } type='submit'>{editMode ? "Guardar" : "Agregar"}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App;
