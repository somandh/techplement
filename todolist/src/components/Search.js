import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
function Search() {
    const [task,setTask]=useState()
    const handleAdd=()=>{
        if(task === ' '){
            return
        }else{
            axios.post('http://localhost:3001/add',{task:task})
            .then(result=>{
                window.location.reload()
            })
            .catch(err=>console.log(err))
        }
    }
    return(
        <div className='create_form'>
            <input type="text" placeholder='enter task' onChange={(e)=>setTask(e.target.value)}/>
            <button type="button" className="create_form" onClick={handleAdd}>Add</button> 
        </div>
    )
}
export default Search;