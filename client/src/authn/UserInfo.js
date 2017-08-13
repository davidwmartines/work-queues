import React from 'react';

function UserInfo(props){
  console.log('userinfo', props);
  return (
    <div>
      <span> Logged in as {props.user.name} </span>
    </div>
  );
}

export default UserInfo;