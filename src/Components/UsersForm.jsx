import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import 'boxicons'
const UsersForm = ({ getUsers, userSelected, deselectUser, toggleForm }) => {

    /*states*/


    /*Form Declaration */
    const { register, handleSubmit, reset } = useForm()

    /*Submit */

    const submit = (data) => {
        //Modify user
        if (userSelected) {
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, data)
                .then(() => getUsers())
        } else {
            axios.post(`https://users-crud1.herokuapp.com/users/`, data)
                .then(() => getUsers())
                .catch(error => console.log(error.response))
        }
        clearUser()
        toggleForm()
    }

    /*Reset*/

    const clearUser = () => {
        reset({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            birthday: "",
        })
        deselectUser()
    }

    useEffect(() => {
        if (userSelected) {
            reset(userSelected)
        }
    }, [userSelected])

    /*other functions */



    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className='backgroundCard'>
                <div className='FormCard'>
                    <button type='button' className='closeButton' onClick={toggleForm}><box-icon name='x'></box-icon></button>
                    <h1 className='form-title'>User Registration</h1>
                    <div className='input-container'>
                        <label htmlFor="first_name">First name</label>
                        <input type="text" id="first_name" {...register("first_name")} />
                    </div>
                    <div className='input-container'>
                        <label htmlFor="last_name">Last name</label>
                        <input type="text" id="last_name" {...register("last_name")} />
                    </div>
                    <div className='input-container'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" {...register("email")} />
                    </div>
                    <div className='input-container'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" {...register("password")} />
                    </div>
                    <div className='input-container'>
                        <label htmlFor="birthday">Birthday</label>
                        <input type="date" id="birthday" {...register("birthday")} />
                    </div>
                    <button className="submitButton">{userSelected ? "Update" : "Submit"}</button>
                    <button type='button' className='clearButton' onClick={clearUser}>clear</button>
                </div>
            </div>
        </form>
    );
};

export default UsersForm;