import React, { useEffect, useState, useRef } from 'react';
import Layout from './Layout';
import { Card, Alert } from 'react-bootstrap'
import { Button, Input } from 'semantic-ui-react'
import { useAuth } from '../contexts/AuthContext';

const EditLink = (props) => {
    const { path } = props.match.params
    const { db } = useAuth()
    const [details, setDetails] = useState(null);
    const [documentRef, setDocumentRef] = useState(null)
    const [editingLongUrl, setEditingLongUrl] = useState(false)
    const [editUrlValue, setEditUrlValue] = useState();
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    async function fetchDetails() {
        const urlListRef = db.collection('url-lists')
        const snapshot = await urlListRef.where('shortUrl', '==', path).get()
        const data = snapshot.docs[0].data()
        const ref = snapshot.docs[0].ref
        setDetails(data)
        setDocumentRef(ref)
        console.log({data,snapshot})
    }

    useEffect(() => {
        fetchDetails()
    },[])

    function handleDelete() {
        documentRef.delete()
        props.history.push('/')
    }

    async function handleEdit() {
        const newUrl = editUrlValue
        setError(null)
        setSuccessMessage(null)
        try {
            await documentRef.update({ longUrl: newUrl })
        }
        catch (error) {
            setError(error.message)
        }
        finally {
            if (error) {
                return
            }
            setSuccessMessage("URL updated successfully")
            setEditingLongUrl(false);
            setDetails({
                ...details,
                longUrl : newUrl
            })
        }
    }

    return (
        <Layout>
            <Card className="create-new-card">
                {error && <Alert variant="danger">{error}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                <span className="edit-link-heading">{'/' + path}</span>
                <Button onClick={()=>navigator.clipboard.writeText(window.location.host + '/' + path)}>Copy</Button>
                {!details && 'Loading...'}
                {details && <>
                    <p>Original URL</p>
                    <a href={details.longUrl} target="_blank" rel="noreferrer" hidden={editingLongUrl}>{details.longUrl}</a>
                    <Input
                        type="text"
                        defaultValue={details.longUrl}
                        onChange={(e) => {
                            setEditUrlValue(e.target.value)
                        }}
                        hidden={!editingLongUrl}
                    />
                    <Button hidden={!editingLongUrl} onClick={handleEdit}>Update</Button>
                    <span>
                        <Button hidden={editingLongUrl} onClick={() => {
                            setEditingLongUrl(true);
                            setEditUrlValue(details.longUrl)
                        }}>Edit</Button>
                        <Button onClick={handleDelete}>Delete</Button>
                    </span>  
                </>}
            </Card>
        </Layout>
    );
}

export default EditLink;
