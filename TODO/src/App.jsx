import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  
  const [task, setTask] = useState([])
  const [newtask, setNewtask] = useState("")
  const [editingIndex, setEditingIndex] = useState(null)
  const [editText, setEditText] = useState("")

   function handleAdd(e){ 
    setNewtask(e.target.value)
   }
   function addtask(){
    if(newtask.trim()!==""){
    setTask(t=>[...t, { text: newtask, completed: false }])
    setNewtask("")
    }
   }
   function deleteTask(index){
     const updatetask=t=>t.filter((_,i)=>i !== index)
     setTask(updatetask)
   }
   
   function editTask(index){
     setEditingIndex(index)
     setEditText(task[index].text)
   }

   function saveEdit(index){
     if(editText.trim() !== ""){
       const updated = [...task];
       updated[index].text = editText;
       setTask(updated);
       setEditingIndex(null);
       setEditText("");
     }
   }

   function toggleCheckbox(index){
     const updated = [...task];
     updated[index].completed = !updated[index].completed;
     setTask(updated);
   }

   function upmove(index){
    if(index > 0){
  const updated = [...task];  

  [updated[index], updated[index - 1]] =
  [updated[index - 1], updated[index]];

  setTask(updated);
    }

   }
   function downmove(index){
        if(index < task.length - 1){
            const updated = [...task];
            [updated[index], updated[index + 1]] =
            [updated[index + 1], updated[index]];
            setTask(updated);
        }
   }

  return (
    
    <>
    
    
      <h1>TODO LIST</h1>
      <input type="text" placeholder='Add' value={newtask} onChange={handleAdd} />
      <button onClick={addtask}>Add</button>
      <ol>
        {task.map((t, index) => (
   
        <li key={index}>
          <input 
            type="checkbox" 
            checked={t.completed} 
            onChange={() => toggleCheckbox(index)} 
          />
          {editingIndex === index ? (
            <>
              <input 
                type="text" 
                value={editText} 
                onChange={(e) => setEditText(e.target.value)} 
              />
              <button onClick={() => saveEdit(index)}>Save</button>
              <button onClick={() => setEditingIndex(null)}>Cancel</button>
            </>
          ) : (
            <span style={{ textDecoration: t.completed ? "line-through" : "none", marginRight: "10px" }}>
              {t.text}
            </span>
          )}
          
        <button onClick={()=>deleteTask(index)}>Delete</button>
        {editingIndex !== index && <button onClick={()=>editTask(index)}>Edit</button>}
        <button onClick={()=>upmove(index)}>Up</button>
        <button onClick={()=>downmove(index)}>Down</button>

        </li>

          
        ))}
      </ol>

    </>
  )
}

export default App
