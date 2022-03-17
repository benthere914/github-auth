import './index.css'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { emailPasswordSignUp } from '../../firebase/auth'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const SignUp = ({setUser}) => {
    const history = useHistory()
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSignUp = async () => {
        const user = await emailPasswordSignUp(userName, email, password);
        // await console.log(result)
        if (Object.values(user)[0] === "firebase"){
            await console.log('success')
            await setUser(user?.displayName)
            await history.push('/')

        }else {
            await console.log('failure')
            setError(Object.values(user)[0].slice(5))

        }
    }

    return (
        <div className='signUpPage'>
            <h1>Sign Up</h1>
            <div className='signUpDiv'>
                <p style={{backgroundColor: 'lightpink', textAlign: 'center'}}>{error}</p>
                <p>User Name</p>
                <input value={userName} onChange={(e)=> {setUserName(e?.target?.value)}}/>
                <p>Email</p>
                <input value={email} onChange={(e)=> {setEmail(e?.target?.value)}}/>
                <p>Password</p>
                <input value={password} onChange={(e)=> {setPassword(e?.target?.value)}}/>
                <div className='d-grid gap 2'>
                    <Button variant='primary' size='lg' style={{width: 450}} onClick={() => {handleSignUp()}}>Sign Up</Button>{' '}
                </div>
            </div>


        </div>
    )
}

export default SignUp
