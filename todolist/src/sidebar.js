import React, { useEffect, useState } from 'react';
import './App.css';
import Search from './components/Search';
import axios from 'axios';
import {BsCircleFill,BsFillTrashFill,BsFillCheckCircleFill} from "react-icons/bs";
import EditIcon from '@mui/icons-material/Edit';

function Sidebar() {

    const[todos,setTos]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/get')
        .then(result=>setTos(result.data))
        .catch(err=>console.log(err))
    },[])
    const handleEdit=(id)=>{
        axios.put('http://localhost:3001/update/'+id)
        .then(result=>{
            window.location.reload()
        })
        .catch(err=>console.log(err))
    }
    const handleDelete=(id)=>{
        axios.delete('http://localhost:3001/delete/'+id)
        .then(result=>{
            window.location.reload()
        })
        .catch(err=>console.log(err))
    }
    const handleUpdateTodo = async (id) => {
        const updatedTask = window.prompt('Enter the updated task:');
        if (updatedTask) {
          try {
            const response = await axios.put(`http://localhost:3001/todos/${id}`, {
              task: updatedTask,
            });
    
            setTos((prevTodos) =>
              prevTodos.map((todo) =>
                todo._id === response.data._id ? response.data : todo
              )
            );
          } catch (error) {
            console.error(error);
          }
        }
      }
    return(
        <div className='search'>
            <h2>To Do List</h2>
            <Search/>
            {
                todos.length===0?
                <div><h2>No record</h2></div>
                :
                todos.map(todo=>(
                    <div className='task'>
                        <div className='checkbox' onClick={()=> handleEdit(todo._id)}>
                            {todo.done?
                                <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                            :<BsCircleFill className='icon'/>
                            }
                            <p className={todo.done? "line_through":""}>{todo.task}</p>
                        </div>
                        <div>
                            <span><EditIcon className = 'icon' onClick={() => handleUpdateTodo(todo._id)}/></span>
                            <span><BsFillTrashFill className='icon' onClick={()=>handleDelete(todo._id)}/></span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
export default Sidebar;