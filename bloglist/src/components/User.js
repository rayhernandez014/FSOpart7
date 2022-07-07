import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { List, ListItemText, Typography } from '@mui/material'

const User = () => {
  const user_list = useSelector((state) => state.user)
  const id = useParams().id

  if (!user_list) {
    return null
  }

  const user = user_list.find((u) => u.id === id)

  if (!user) {
    return null
  }

  return (
    <>
      <Typography variant="h5">{user.name}</Typography>
      <Typography variant="h6">added blogs</Typography>
      <List>
        {user.blogs.map((blog) => {
          return <ListItemText key={blog.id} primary={blog.title} />
        })}
      </List>
    </>
  )
}

export default User
