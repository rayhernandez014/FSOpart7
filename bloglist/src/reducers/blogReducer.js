import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { callNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blog',
  initialState: null,
  reducers: {
    replaceBlog(state, action) {
      const returnedBlog = action.payload.returnedBlog
      const id = action.payload.id
      return state.map((blog) => (blog.id !== id ? blog : returnedBlog))
    },
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return [...state, action.payload]
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    }
  }
})

export const { appendBlog, replaceBlog, setBlogs, removeBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      dispatch(appendBlog(returnedBlog))
      dispatch(
        callNotification(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} has been added`,
          'success',
          5
        )
      )
    } catch (exception) {
      dispatch(callNotification(exception.response.data.error, 'error', 5))
    }
  }
}

export const voteBlog = (id) => {
  return async (dispatch, getState) => {
    const { blog } = getState()
    const blogToChange = blog.find((b) => b.id === id)
    const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 }
    try {
      const returnedBlog = await blogService.update(id, changedBlog)
      dispatch(replaceBlog({ returnedBlog, id }))
    } catch (exception) {
      dispatch(callNotification(exception.response.data.error, 'error', 5))
    }
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const newComment = { comment }
    try {
      const returnedBlog = await blogService.createComment(id, newComment)
      dispatch(replaceBlog({ returnedBlog, id }))
    } catch (exception) {
      dispatch(callNotification(exception.response.data.error, 'error', 5))
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    const { blog } = getState()
    const foundBlog = blog.find((b) => {
      return b.id === id
    })
    if (
      window.confirm(
        `are you sure you want to remove ${foundBlog.title} by ${foundBlog.author}?`
      )
    ) {
      try {
        await blogService.remove(id)
        dispatch(removeBlog(id))
        dispatch(
          callNotification(`blog ${foundBlog.title} deleted`, 'success', 5)
        )
      } catch (exception) {
        dispatch(callNotification(exception.response.data.error, 'error', 5))
      }
    }
  }
}

export default blogSlice.reducer
