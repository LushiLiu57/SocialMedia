import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const navigate = useNavigate()

    const googleSignIn = async () => {
        const result = await signInWithPopup(auth, provider);
        navigate('/')
    }
    return <div>
        <p>Sign in with Google</p>
        <button onClick={googleSignIn}>SIGN IN</button>
    </div>
}