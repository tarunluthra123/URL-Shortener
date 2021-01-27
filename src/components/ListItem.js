import React from 'react';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const ListItem = (props) => {
    const { longUrl, shortUrl } = props.item
    const { sno } = props

    return (
        <tr>
            <td>{sno}</td>
            <td>
                <a href={longUrl} target="_blank" rel="noreferrer">
                    {longUrl}
                </a>
            </td>
            <td>
                <span onClick={() => navigator.clipboard.writeText(window.location.href + shortUrl)}>
                    {'/' + shortUrl}
                </span>
            </td>
            <td>
                <Link to={`/urls/${shortUrl}`}>
                    <Button variant="violet">Edit</Button>
                </Link>
            </td>
        </tr>
    );
}

export default ListItem;
