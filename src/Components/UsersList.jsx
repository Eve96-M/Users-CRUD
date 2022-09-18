import axios from 'axios';
import React from 'react';
const UsersList = ({ users, selectUser, getUsers }) => {

    const deleteUser = (id) => {
        axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
            .then(() => getUsers())
    }


    return (
        <div className='Userlist'>
            <h1>Users registered</h1>
            <ul>
                {
                    users.map((user) => (
                        <li key={user.id} className="userWrapper">
                            <li className='UserName'>{user.first_name} {" "} {user.last_name}</li>
                            <li><small>Email</small><br />{user.email}</li>
                            <li><small>Birthday</small><br />{user.birthday}</li>
                            <div className="button-wrapper">
                                <button className='Userbutton edit' onClick={() => selectUser(user)}><box-icon name='edit-alt'></box-icon></button>
                                <button className='Userbutton delete' onClick={() => deleteUser(user.id)}><box-icon name='trash'></box-icon></button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default UsersList;