import React from 'react';
import GoogleLogin from 'react-google-login';

const responseGoogle = response => {
  console.log(response);
};

class GoogleAuth extends React.PureComponent {
  render() {
    console.log(this.state);
    return (
      <GoogleLogin
        clientId="17567422693-0gbscl15be8fq1h276c614fop36e6euv.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    );
  }
}

export default GoogleAuth;
