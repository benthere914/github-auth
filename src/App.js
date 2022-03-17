import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home'

function App() {
	return (
		<BrowserRouter>
			<Switch>
                <Route>
                    <Home/>
                </Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
