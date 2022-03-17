import './index.css'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { googleLogin, emailPasswordSignIn } from '../../firebase/auth'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const LogIn = ({setUser}) => {
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleGoogleLogin = async () => {
        const user = await googleLogin();
        await setUser(user?.displayName);
        history.push('/')
    }
    const emailLogin = async () => {
        const user = await emailPasswordSignIn(email, password);
        await console.log(Object.values(user))
        await console.log(user["FirebaseError"])
        if (Object.values(user)[0] === "firebase"){
            await console.log('success')
            await setUser(user?.displayName)
            await history.push('/')

        }else {
            await console.log('failure')
            await console.log(Object.values(user))
            setError(Object.values(user)[0].slice(5))
        }
    }
    return (
        <div className='loginPage'>

            <h1>Log In</h1>
            <div className='loginDiv'>
                <p style={{backgroundColor: 'lightpink', textAlign: 'center'}}>{error}</p>
                <p>Email</p>
                <input value={email} onChange={(e)=> {setEmail(e?.target?.value); setError('')}}/>
                <p>Password</p>
                <input value={password} onChange={(e)=> {setPassword(e?.target?.value); setError('')}}/>
                <div>
                    <Button variant='primary' size='lg' style={{width: 450}} onClick={() => {emailLogin()}}>Login</Button>{' '}
                    <Button variant='primary' size='lg' style={{width: 450}} onClick={() => {handleGoogleLogin()}}>Login With Google</Button>
                </div>
            </div>
        </div>
    )
}

export default LogIn
