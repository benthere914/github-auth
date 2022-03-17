import {
	signInWithPopup,
	getAuth,
    GithubAuthProvider,
} from 'firebase/auth';
import axios from 'axios';
const auth = getAuth();




export const gitHubLogin = async (repoName) => {
    const provider = new GithubAuthProvider();
    provider.addScope('public_repo')
    const result = await signInWithPopup(auth, provider);
    const credential = GithubAuthProvider.credentialFromResult(result)
    const token = credential.accessToken
    const output = await axios.post('https://api.github.com/user/repos', JSON.stringify({"name": repoName}), {"headers": {"Authorization": `token ${token}`}})
    console.log(output)
    if (output?.status === 201) {
        return true
    }
    return false
}
