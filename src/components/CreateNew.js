import React, { useRef, useState } from 'react';
import { Card, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { Button, Icon } from 'semantic-ui-react'
import Layout from './Layout'
import '../assets/css/createnew.css'
import { useAuth } from './../contexts/AuthContext'

const CreateNew = (props) => {
    const baseUrl = window.location.href.slice(0, -8)
    const longUrlRef = useRef()
    const shortUrlRef = useRef()
    const { currentUser, db } = useAuth()
    const [error, setError] = useState(null);
    

    function generateRandomString(length = 4) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        let result = ''
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        return result
    }

    async function handleCreateNew() {
        const longUrl = longUrlRef.current.value
        let shortUrl = shortUrlRef.current.value
        let selfGeneratedShortUrl = false
        if (shortUrl.length == 0) {
            shortUrl = generateRandomString()
            selfGeneratedShortUrl = true
        }
        const urlListRef = db.collection('url-lists')
        let check = await urlListRef.where('shortUrl', '==', shortUrl).get();
        // console.log(check)
        if (!check.empty) {
            console.log('ok')
            if (selfGeneratedShortUrl) {
                while (!check.empty) {
                    check = await urlListRef.where('shortUrl', '==', shortUrl).get();
                }
            }
            else {
                setError('Shortlink already taken.')
            }
        }

        const res = await urlListRef.add({
            uid: currentUser.uid,
            longUrl,
            shortUrl
        })
        if (res.id) {
            props.history.push('/urls/' + shortUrl)
        }
    }

    return (
        <Layout>
            <Card className="create-new-card">
                <h1>Create new shortlink</h1>
                <p>Create a tiny link to have a huge impact</p>
                {error && <Alert variant="danger">{error}</Alert>}
                <Card.Body>
                    <label for="long-url-input">URL to shorten</label>
                    <br />
                    <InputGroup className="mb-3">
                        <FormControl id="long-url-input" placeholder="https://www.google.co.in/" ref={longUrlRef}/>
                    </InputGroup>
                    
                    <br />
                    <label htmlFor="short-url-input">Short URL (Optional)</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inp-group-text">
                                {baseUrl}
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="short-url-input" aria-describedby="inp-group-text" ref={shortUrlRef}/>
                    </InputGroup>
                    <label htmlFor="short-url-input">Leave empty to generate a random shortlink</label>
                    <Button onClick={handleCreateNew}>Create <Icon name='arrow right'></Icon></Button>
                </Card.Body>
            </Card>
        </Layout>
    );
}

export default CreateNew;
