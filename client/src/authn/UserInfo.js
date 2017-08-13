import React from 'react';

function UserInfo(props){
  return (
    <div>
      <span> Logged in as {props.user.name} </span>
    </div>
  );
}

export default UserInfo;