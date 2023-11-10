import {Link} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar(){
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = ()=>{
    logout()
  }
  return(
    <header>
      <div className="container">
        <Link to='/'>
          <h1>Body Negativity Movement</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Logout</button>
              </div>
            </div>
          )}

          {!user && (
            <div className='sign-block'>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}