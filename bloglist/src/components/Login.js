import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'

import { Button, TextField } from '@mui/material'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitCredentials = (event) => {
    event.preventDefault()
    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    dispatch(login(credentials))
    event.target.username.value = ''
    event.target.password.value = ''
    navigate('/')
  }

  return (
    <>
      <form onSubmit={submitCredentials}>
        <div>
          <TextField
            label="username"
            type="text"
            id="username"
            name="username"
          />
        </div>
        <div>
          <TextField
            label="password"
            type="password"
            id="password"
            name="password"
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          login
        </Button>
      </form>
    </>
  )
}

export default Login
