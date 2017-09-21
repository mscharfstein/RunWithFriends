'use strict';

import React from 'react';
import FacebookLogin from 'react-facebook-login';

class FacebookLoginComp extends React.Component {
 responseFacebook(response) {
   console.log(response)
 }

 render() {
   return (
     <FacebookLogin
       appId="1088597931155576"
       autoLoad={true}
       fields="name,email,picture"
       scope="public_profile,user_friends"
       callback={this.responseFacebook}
     />
   )
 }
}

export default FacebookLoginComp;
