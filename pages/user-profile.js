import React from 'react'

const userProfile = (props) => {
  return (
    <h1>{props.username}</h1>
  );
}

export default userProfile;

export async function getServerSideProps(context) {
    return {
        props: {
            username: 'Andre'
        }
    }
}