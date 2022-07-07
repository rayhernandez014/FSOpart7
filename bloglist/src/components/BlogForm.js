import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Button, TextField, Typography } from '@mui/material'

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const handleBlogCreation = (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    dispatch(createBlog(newBlog))
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    blogFormRef.current.toggleVisibility()
  }

  return (
    <>
      <Typography variant="h5">create a new</Typography>
      <form onSubmit={handleBlogCreation}>
        <div>
          <TextField type="text" id="title" name="title" label="title" />
        </div>
        <div>
          <TextField type="text" id="author" name="author" label="author" />
        </div>
        <div>
          <TextField type="text" id="url" name="url" label="url" />
        </div>

        <Button variant="contained" type="submit" id="create-button">
          create
        </Button>
      </form>
    </>
  )
}

export default BlogForm
