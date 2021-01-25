import React, { useState } from "react";
import { useAuth } from './../contexts/AuthContext';
import { Card, Form } from 'react-bootstrap'
import { Button, Icon } from 'semantic-ui-react'
import '../assets/css/signup.css'

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
		signup(inputDetails.email, inputDetails.password)
	}

	return (
		<div className="container signupContainer">
			<Card>
				<Card.Body>
					<Card.Title className="card-title">Sign up</Card.Title>
					<Card.Text>
						<Form>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control type="email" placeholder="Enter email" />
								<Form.Text className="text-muted">
									We'll never share your email with anyone else.
								</Form.Text>
							</Form.Group>
							<Form.Group controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" placeholder="Password" />
							</Form.Group>
							<Button type="submit" color="blue">
								Submit
							</Button>
						</Form>
						<span>Or simply login with</span>
						<Button color='google plus'>
							<Icon name='google'/>Google
						</Button>
					</Card.Text>
				</Card.Body>
			</Card>
		</div>
	)
};

export default Signup;
