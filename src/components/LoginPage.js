import React, { useState } from "react";
import Layout from './Layout';
import { Form, Card } from 'react-bootstrap';
import { Button, Icon } from 'semantic-ui-react';
import { useAuth } from './../contexts/AuthContext';

const LoginPage = (props) => {
	const [inputDetails, setInputDetails] = useState({
		email: '',
		password: ''
	})
	
	const { login } = useAuth()

	function handleChange(e) {
		setInputDetails(prevDetails => {
			return {
				...prevDetails,
				[e.target.name]:e.target.value
			}
		})
	}

	function handleSubmit() {
		login(inputDetails.email, inputDetails.password)
	}

	function handleGoogleLogin() {
		console.log('Google')
	}

	return (
		<Layout>
			<div className="container signupContainer">
				<Card>
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
								<Button type="submit" color="blue" size="large" onClick={handleSubmit}>
									Log in
								</Button>
							</div>

							<div className="alternateSignUpMethods">
								<span>Or simply sign up with</span>
								<br/>
								<Button color='google plus' onClick={handleGoogleLogin}>
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
