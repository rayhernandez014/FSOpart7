import Login from './components/Login'
import Notification from './components/Notification'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeLoggedUser, logout } from './reducers/loginReducer'

import { Routes, Route, Link } from 'react-router-dom'
import { initializeUsers } from './reducers/userReducer'

import { Container } from '@mui/material'

import { AppBar, Toolbar, Button } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeLoggedUser())
    dispatch(initializeUsers())
  }, [dispatch])

  const loggedUser = useSelector((state) => state.login)

  return (
    <Container>
      <Notification />
      {loggedUser ? (
        <>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/">
                blogs
              </Button>
              <Button color="inherit" component={Link} to="/users">
                users
              </Button>
              {loggedUser.name} logged in
              <Button
                color="inherit"
                onClick={() => dispatch(logout())}
                id="logout-button"
              >
                log out
              </Button>
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </>
      ) : (
        <div>
          <h2>Log in to application</h2>
          <Login />
        </div>
      )}
    </Container>
  )
}

export default App
