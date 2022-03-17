import React, { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home'
import LogIn from './components/logIn';
import SignUp from './components/signUp';
import Header from './components/header'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

require('dotenv').config();
function App() {
    const [user, setUser] = useState('');
    useEffect(() => {
        const func = async () => {
            const auth = getAuth();
            await onAuthStateChanged(auth, (user) => setUser(user?.displayName));
        }
        func()
    })
	return (
		<BrowserRouter>
            <Header user={user}/>
			<Switch>
                <Route path='/' exact={true}>
                    <Home user={user}/>
                </Route>
                <Route path='/login'>
                    <LogIn setUser={setUser}/>
                </Route>
                <Route path='/signup'>
                    <SignUp setUser={setUser}/>
                </Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
