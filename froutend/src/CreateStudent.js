import React, { useState } from 'react'
import {useForm} from "react-hook-form";
import axios from 'axios'
import {useEffect} from 'react'
import {useNavigate} from "react-hook-form";
import { Link } from 'react-router-dom';

function Student() {
    let navigate =useNavigate();
    const{student,formState:{errors}, setStudent}=useForm();
    const onSubmit= (data) =>{
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
    }
  return (
    <form onSubmit={handleSubmit(onsubmit)}>
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center' >
        <div className='w-50 bg-white rounded p-3' >
            <Link to="/create" className='btn btn-success'>Add +</Link>
            <table className='table'>
                <thead>
                    <tr>
                        <input type="text" class="form-control" placeholder='Full name'{...required("firstname", {required: true})} />
                        {errors.firstname?.type === 'required' && (<p role="alert">Full name is required</p>)}
                        <br/>
                        <input type="email" class="form-control" placeholder='email-id'  {...register("emailId", { required: true })}
                        />
                        {errors.emailId?.type === 'required' && (<p role="alert">Email-Id is required</p>)}
                        <br/>
                        <input type="text" class="form-control" placeholder='mobile-no'  {...register("contact_no", { required: true })}
                        />
                        {errors.contact_no?.type === 'required' && (<p role="alert">Mobile Number is required</p>)}
                        <br/>
                        <input type="text" class="form-control" placeholder='addreaa'  {...register("address", { required: true })}
                        />
                        {errors.address?.type === 'required' && (<p role="alert">Address is required</p>)}
                        <br/>
                        <button type="submit" class="btn btn-primary"> Action </button>
                    </tr>
                </thead>
                <tbody>
                    {
                        student.map((data,i)=>(
                            <tr key={i}>
                                <td>{data.firstname}</td>
                                <td>{data.emailId}</td>
                                <td>{data.contact_no}</td>
                                <td>{data.address}</td>
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
    </form>

  )
}

export default Student