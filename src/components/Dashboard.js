import React, { useState, useEffect } from "react";
import { useAuth } from './../contexts/AuthContext';
import { useLocation } from 'react-router-dom'

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
            snapshot.forEach(doc => {
                setList(arr => [...arr,doc.data()])
            })
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
	},[location,redirectList])

    return (
        <div>
            Dashboard
            {error && <h3>Error : {error}</h3>}
            {list && list.map(item => <span>
                Long URL = {item.longUrl}<br/>
                Short URL = {item.shortUrl} <br/>
                <button>Modify</button> <br/><br/>
            </span>)}
        </div>
    );
};

export default Dashboard;