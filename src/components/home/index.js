import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../firebase/firebase.js'
import { Alert, Button } from 'react-bootstrap'
import { useState } from 'react'
import {signInWithPopup, getAuth, GithubAuthProvider} from 'firebase/auth';
import axios from 'axios';
const auth = getAuth();

const Home = () => {
    const [message, setMessage] = useState('');
    const [repoName, setRepoName] = useState('');
    const [token, setToken] = useState('');
    const [created, setCreated] = useState(false)

    const gitHubLogin = async () => {
        const provider = new GithubAuthProvider();
        provider.addScope('public_repo')
        const result = await signInWithPopup(auth, provider);
        const credential = GithubAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        return token
    }

    const createRepo = async () => {
        const output = await axios.post(
            'https://api.github.com/user/repos',
            JSON.stringify({"name": repoName}),
            {"headers": {"Authorization": `token ${token}`}})
        if (output?.status === 201) {
            setMessage("")
            setCreated(true)
        }
        else {
            setMessage("There was an error. Please try again.")
        }
    }

    const handlerGitHubLogin = async () => {
        const result = await gitHubLogin(repoName)
        setToken(result)
    }
    return (
        <>
        <Alert className='mainDisplay'>
            {!token ? (
                <>
                    <Alert.Heading>Log In</Alert.Heading>
                    <Button variant='primary' size='lg' style={{width: 450}} onClick={() => {handlerGitHubLogin()}}>Login With GitHub</Button>
                </>
            ) : (token && !created) ?  (
                <>
                    <Alert.Heading>Create Repo</Alert.Heading>
                    <h1>{message}</h1>
                    <div>
                        <input value={repoName} onChange={(e) => {setRepoName(e.target.value)}}></input>
                        <Button variant='primary' size='lg' style={{width: 450}} onClick={() => {createRepo()}}>Create Repo</Button>
                    </div>
                </>
            ) : (
                <>
                    <Alert.Heading>
                        <h1>{repoName} was created successfully. You can close this window and resume the CLI.</h1>
                    </Alert.Heading>

                </>
            )}
            </Alert>
        </>
    )
}

export default Home
