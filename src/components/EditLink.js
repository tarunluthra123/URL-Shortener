import React from 'react';

const EditLink = (props) => {
    const { path } = props.match.params
    console.log({path})
    return (
        <div>
            Edit Link
        </div>
    );
}

export default EditLink;
