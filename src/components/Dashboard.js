import React, { useState, useEffect } from "react";
import { useAuth } from './../contexts/AuthContext';
import { useLocation, Link } from 'react-router-dom'
import Layout from "./Layout";
import { Alert } from 'react-bootstrap'
import ListItem from './ListItem'
import '../assets/css/dashboard.css'
import { Button } from 'semantic-ui-react'

const Dashboard = (props) => {
    const [list, setList] = useState([])
    const [error, setError] = useState(null)
    const { currentUser, db } = useAuth()
    const location = useLocation()
	const [redirectList, setRedirectList] = useState([])
	
	useEffect(() => {
		const urlListRef = db.collection('url-lists')
		urlListRef.get().then(snapshot => {
			const urlList = []
			snapshot.forEach(doc => {
				const data = doc.data()
				urlList.push({
					shortUrl: data.shortUrl,
					longUrl: data.longUrl
				})
			})
			
			setRedirectList(urlList)
		})
	}, [])

    async function fetchData() {
        if (!currentUser) {
            setError("You must login first")
            return
        }
        const urlListRef = db.collection('url-lists')
        const snapshot = await urlListRef.where('uid', '==', currentUser.uid).get()
        if (snapshot.empty) {
            setError("No shortlinks created")
        }
        else {
            setError(null)
            const arr = []
            snapshot.forEach(doc => {
                arr.push(doc.data())
            })

            setList(arr)
        }
    }

    useEffect(() => {
        fetchData()
    }, [currentUser])

    
	
	useEffect(() => {
        if (location) {
            const currentUrl = location.pathname.substring(1)
            const obj = redirectList.find(urlObj => urlObj.shortUrl == currentUrl)
            
            if (!obj) {
                return
            }
            window.location.href = obj.longUrl
        }
	},[location, redirectList])

    return (
        <Layout>
            <div className="dashboard-container">
                <span className="dashboard-header">
                    <span>Your Shortlinks</span>
                    <Link to='/urls/new'>
                        <Button color='blue' size="large">Create new+</Button>
                    </Link>
                </span>
                {error && <Alert variant="danger">{error}</Alert>}
                {list.length > 0 && 
                    <table className="dashboard-table">
                        <tr>
                            <th>S.No.</th>                    
                            <th>Long URL</th>
                            <th>Short URL</th>
                            <th>Modify</th>
                        </tr>
                        {list.map((item,index) => <ListItem item={item} sno={index+1}/>)}
                    </table>
                }
            </div>
        </Layout>
    );
};

export default Dashboard;