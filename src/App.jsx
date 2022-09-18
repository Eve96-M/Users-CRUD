import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'
import UsersForm from './Components/UsersForm'
import UsersList from './Components/UsersList'

function App() {
  /*States*/

  const [users, setUsers] = useState([])
  const [userSelected, setUserSelected] = useState(null)
  const [showForm, setShowForm] = useState(false)

  /* Api Call */

  useEffect(() => {
    axios.get(`https://users-crud1.herokuapp.com/users/`)
      .then(res => setUsers(res.data))
  }, [])

  /*functions*/

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  /*Api get Users*/

  const getUsers = () => {
    axios.get(`https://users-crud1.herokuapp.com/users/`)
      .then(res => setUsers(res.data))
  }

  /*Select User */

  const selectUser = (user) => {
    setUserSelected(user)
    toggleForm()
  }

  /*Deselect user*/

  const deselectUser = () => setUserSelected(null)

  return (
    <div className="App">
      <button type='button' className='btn-N-User' onClick={toggleForm}> Register new user</button>
      {
        showForm ?
          <UsersForm
            getUsers={getUsers}
            userSelected={userSelected}
            deselectUser={deselectUser}
            toggleForm={toggleForm}
          />
          :
          ""
      }
      <UsersList
        users={users}
        selectUser={selectUser}
        getUsers={getUsers}
      />
    </div>
  )
}

export default App
