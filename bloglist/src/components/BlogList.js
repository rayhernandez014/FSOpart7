import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListItemButton, ListItemText } from '@mui/material'

const BlogList = () => {
  const blog_list = useSelector((state) => state.blog)

  if (!blog_list) {
    return null
  }

  const temp_blogs = [...blog_list]

  temp_blogs.sort((item1, item2) => {
    if (item1.likes > item2.likes) {
      return -1
    } else if (item1.likes < item2.likes) {
      return 1
    }
    return 0
  })

  return temp_blogs.map((blog) => (
    <ListItemButton component={Link} to={`/blogs/${blog.id}`} key={blog.id}>
      <ListItemText primary={blog.title} />
    </ListItemButton>
  ))
}

export default BlogList
