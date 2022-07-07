import { useSelector } from 'react-redux'

import { Alert } from '@mui/material'

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)

  if (!message || !type) {
    return null
  } else {
    return <Alert severity={type}>{message}</Alert>
  }
}

export default Notification
