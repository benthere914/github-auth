import {
	signInWithPopup,
	getAuth,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';

const auth = getAuth();

export const googleLogin = async () => {
	const provider = new GoogleAuthProvider();
	const result = await signInWithPopup(auth, provider);
	const user = await result.user;
	return user;
};

export const emailPasswordSignUp = async (userName, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth,email,password);
        const user = await userCredential?.user;
        await updateProfile(auth.currentUser, { displayName: userName })
        return user
    } catch (error) {
        return error
    }
};

export const emailPasswordSignIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth,email,password);
        const user = await userCredential?.user;
        return user
    } catch (error) {
        return error
    }
};
