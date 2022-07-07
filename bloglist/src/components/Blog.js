import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog, voteBlog, addComment } from '../reducers/blogReducer'
import {
  Typography,
  Link,
  Button,
  Box,
  List,
  ListItemText,
  TextField
} from '@mui/material'

const Blog = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const blog_list = useSelector((state) => state.blog)
  const loggedUser = useSelector((state) => state.login)
  const id = useParams().id

  if (!blog_list) {
    return null
  }

  const blog = blog_list.find((b) => b.id === id)

  const increaseLikes = () => {
    dispatch(voteBlog(blog.id))
  }

  const removeBlog = () => {
    dispatch(deleteBlog(blog.id))
    navigate('/')
  }

  const handleComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    dispatch(addComment(blog.id, comment))
    event.target.comment.value = ''
  }

  const isOwner = blog.user?.username === loggedUser.username

  const showWhenOwner = { display: isOwner ? '' : 'none' }

  return (
    <div>
      <Typography variant="h5">
        {blog.title} by {blog.author}
      </Typography>
      <Link variant="body1" href={blog.url}>
        {blog.url}
      </Link>
      <Box>
        <Typography variant="body1">likes {blog.likes}</Typography>
        <Button onClick={increaseLikes} id="like-button" variant="contained">
          like
        </Button>
      </Box>
      <Typography variant="body1">added by {blog.user?.name}</Typography>
      <Button
        style={showWhenOwner}
        onClick={removeBlog}
        id="remove-button"
        variant="contained"
      >
        remove
      </Button>
      <Typography variant="h6">comments</Typography>
      <List>
        {blog.comments.map((c, i) => (
          <ListItemText primary={c} key={i} />
        ))}
      </List>
      <form onSubmit={handleComment}>
        <TextField type="text" id="comment" name="comment" />
        <Button type="submit" id="create-button" variant="contained">
          add comment
        </Button>
      </form>
    </div>
  )
}

export default Blog
