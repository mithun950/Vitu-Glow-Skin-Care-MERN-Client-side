

import { Navigate } from 'react-router-dom'
import LoadingSpinner from '../Components/LoadingSpinner'

const SellerRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'seller') return children
  return <Navigate to='/dashboard' replace='true' />
}



export default SellerRoute