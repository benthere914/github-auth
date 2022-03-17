import './index.css'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { signOut, getAuth } from 'firebase/auth'

const Header = ({user}) => {
    const history = useHistory();
    const signOutHandler = () => {
        const auth = getAuth();
        signOut(auth);
    }
    return (
		<>
			<Navbar bg="primary" variant="dark">
				<Container>
					<Nav className="me-auto">
						<Nav.Link onClick={() => {history.push('/')}}>Home</Nav.Link>
                        {user?<>
                        <Nav.Link onClick={()=> {signOutHandler()}}>Log Out</Nav.Link>
                        </>:
                        <>
						<Nav.Link onClick={() => {history.push('/login')}}>Log In</Nav.Link>
						<Nav.Link onClick={() => {history.push('/signup')}}>Sign Up</Nav.Link>
                        </>
                        }
					</Nav>
				</Container>
			</Navbar>
		</>
	);
}

export default Header
