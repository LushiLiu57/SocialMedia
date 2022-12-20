import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut} from 'firebase/auth';

export const Nav = () => {

    const [user] = useAuthState(auth);
    const logOut = async () => {
        await signOut(auth)
    }
    return (
        <div className='nav'>
            <div className='link'>
                <Link to='/'>HOME</Link>
                {user ? (<Link to='/createpost'>CREATE POST</Link>) : (<Link to='/login'>LOGIN</Link>)}
            </div>
            <div className='user'>
                {user && (
                <>
                    <p> {user?.displayName }</p>
                    <img src={ user?.photoURL || ""} width='30' height='30'/>
                    <button onClick={logOut}> Log Out</button>
                </>
                )}
                
            </div>
        </div>
    )
}