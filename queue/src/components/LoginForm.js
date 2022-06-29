import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({login, navigate, redirect}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    // useNavigate to go to create page clicking dont log in. Need to set token tho
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleCreateLogin = (event) => {
        event.preventDefault()
        console.log(username, password)
        login(username, password)
        setUsername('')
        setPassword('')
        navigate(redirect)
    }

    return (
        <div>
            <h2>Login</h2>
            {/* <form onSubmit={handleCreateLogin}>
                <div>
                    username: <input type='text' value={username} onChange={handleUsernameChange}></input>
                </div>
                <div>
                    password: <input type='password' value={password} onChange={handlePasswordChange}></input>
                </div>
                <button type='submit'>create</button>
            </form> */}
            <Form onSubmit={handleCreateLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" onChange={handleUsernameChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} required/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm