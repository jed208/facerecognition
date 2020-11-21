import React from 'react';

// OLD
// const SignIn = ({ onRouteChange }) => {
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignin = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      // this next line gets the user object (e.g. John's info)  
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');      
      }
    })
  }

  render () {
    const { onRouteChange } = this.props; 
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-dark-gray">
        <main className="pa4 black-80">
          {/* Originally a <form> tag but using json instead of html to send info */}
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="silver f2 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="silver db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  onChange = { this.onEmailChange }
                  className="silver br2 pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" 
                  type="email" 
                  name="email-address"  
                  id="email-address" 
                />
              </div>
              <div className="mv3">
                <label className="silver db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  onChange = { this.onPasswordChange }
                  className="silver b br2 pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" 
                  type="password" 
                  name="password"  
                  id="password" 
                />
              </div>
            </fieldset>
            <div className="">
              <input 
                onClick={ this.onSubmitSignin }
                // onClick={() => onRouteChange('home')} --> OLD
                className="silver b br3 ph3 pv2 input-reset ba b--silver bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Sign in" 
              />
            </div>
            <div className="lh-copy mt3">
              <p 
                onClick={() => onRouteChange('register')} 
                className="silver f6 link dim black db pointer">
                Register
              </p>
            </div>
          </div>
        </main>		
      </article>
    );
  }
}

export default SignIn;