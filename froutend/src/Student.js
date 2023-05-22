import React, { useState } from 'react'
import axios from 'axios'
import {useEffect} from 'react'
import { Link } from 'react-router-dom';

function Student() {
    const[student,setStudent]=useState([]);
    
    useEffect(() =>{
        axios.get("http://localhost:8080/")
        .then(res =>setStudent(res.data))
        .catch(err =>console.log(err))
    },[])

    const handleDelete =async(Id)=>{
        try{
            axios.delete("http://localhost:8080/student/"+Id)
            window.location.reload();

        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center' >
        <div className='w-50 bg-white rounded p-3' >
            <Link to="/create" className='btn btn-success'>Add +</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>MobNo</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        student.map((data,i)=>(
                            <tr key={i}>
                                <td>{data.name}</td>
                                <td>{data.Email}</td>
                                <td>{data.MobNo}</td>
                                <td>{data.Address}</td>
                                <td>
                                    <Link to={`update/${data.Id}`} className='btn btn-primary'>Update</Link>
                                    <button className='btn btn-danger ms-2' onClick={e=>handleDelete(data.Id)}>Delete</button>
                                </td>
                            </tr>
                            
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Student