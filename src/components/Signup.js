import React, { useState } from "react";
import { useAuth } from './../contexts/AuthContext';
import { Card, Form } from 'react-bootstrap'
import { Button, Icon } from 'semantic-ui-react'
import '../assets/css/signup.css'
import Layout from './Layout';

const Signup = (props) => {
	const [inputDetails, setInputDetails] = useState({
		email: '',
		password: ''
	})
	
	const { signup } = useAuth()

	function handleChange(e) {
		setInputDetails(prevDetails => {
			return {
				...prevDetails,
				[e.target.name]:e.target.value
			}
		})
	}

	function handleSubmit() {
		console.log("ok",inputDetails)
		signup(inputDetails.email, inputDetails.password)
	}

	function handleGoogleSignup() {
		console.log('google')
	}

	return (
		<Layout>
			<div className="container signupContainer">
				<Card>
					<Card.Body>
						<h1 className="card-title">Sign up</h1>
						<Card.Text>
							<div className="signup-form">
								<Form.Group>
									<Form.Label>Email address</Form.Label>
									<Form.Control type="email" placeholder="Enter email" name="email" id="signup-email" className="signup-form-control" onChange={handleChange} />
									<Form.Text className="text-muted">
										We'll never share your email with anyone else.
									</Form.Text>
								</Form.Group>
								<Form.Group>
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" placeholder="Password" name="password" id="signup-password" className="signup-form-control" onChange={handleChange}/>
								</Form.Group>
								<Button type="submit" color="blue" size="large" onClick={handleSubmit}>
									Sign up
								</Button>
							</div>

							<div className="alternateSignUpMethods">
								<span>Or simply sign up with</span>
								<br/>
								<Button color='google plus' onClick={handleGoogleSignup}>
									<Icon name='google'/>Google
								</Button>
							</div>
						</Card.Text>
					</Card.Body>
				</Card>
			</div>
		</Layout>
	)
};

export default Signup;
