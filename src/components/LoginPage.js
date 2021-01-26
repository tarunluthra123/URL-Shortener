import React, { useState } from "react";
import Layout from './Layout';
import { Form, Card, Alert } from 'react-bootstrap';
import { Button, Icon } from 'semantic-ui-react';
import { useAuth } from './../contexts/AuthContext';

const LoginPage = (props) => {
	const [inputDetails, setInputDetails] = useState({
		email: '',
		password: ''
	})
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	
	const { login } = useAuth()

	function handleChange(e) {
		setInputDetails(prevDetails => {
			return {
				...prevDetails,
				[e.target.name]:e.target.value
			}
		})
	}

	async function handleSubmit() {
		setError(null)
		setLoading(true)
		try {
			await login(inputDetails.email, inputDetails.password)
		}
		catch (e) {
			setError(e.message)
		}
		setLoading(false)
	}

	function handleGoogleLogin() {
		console.log('Google')
	}

	return (
		<Layout>
			<div className="container signupContainer">
				<Card>
					{error && <Alert variant="danger">{error}</Alert>}
					<Card.Body>
						<h1 className="card-title">Log in</h1>
						<Card.Text>
							<div className="signup-form">
								<Form.Group>
									<Form.Label>Email address</Form.Label>
									<Form.Control type="email" placeholder="Enter email" name="email" id="signup-email" className="signup-form-control" onChange={handleChange} />
								</Form.Group>
								<Form.Group>
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" placeholder="Password" name="password" id="signup-password" className="signup-form-control" onChange={handleChange}/>
								</Form.Group>
								<Button type="submit" color="blue" size="large" onClick={handleSubmit} disabled={loading}>
									Log in
								</Button>
							</div>

							<div className="alternateSignUpMethods">
								<span>Or simply sign up with</span>
								<br/>
								<Button color='google plus' onClick={handleGoogleLogin} disabled={loading}>
									<Icon name='google'/>Google
								</Button>
							</div>
						</Card.Text>
					</Card.Body>
				</Card>
			</div>
		</Layout>
	);
};

export default LoginPage;
