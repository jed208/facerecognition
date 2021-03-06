import React from 'react';

// OLD
// const Register = ({ onRouteChange }) => {
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onSubmitRegister = () => {
    fetch('http://localhost:3000/register', {
      method: 'post', // fetch on its own is usually a GET method
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) { // CHECK THIS --> DIFFERENT THAN SIGNIN
          this.props.loadUser(user);
          this.props.onRouteChange('home');      
        }
      })
  }

  render () {
    // const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-dark-gray">
        <main className="pa4 black-80">
          {/* Originally a <form> tag but using json instead of html to send info */}
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="silver f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="silver db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input 
                  onChange={ this.onNameChange }
                  className="silver br2 pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100"
                  type="text" 
                  name="name"  
                  id="name" 
                />
              </div>
              <div className="mt3">
                <label className="silver db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  onChange={ this.onEmailChange }
                  className="silver br2 pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" 
                  type="email" 
                  name="email-address"  
                  id="email-address" 
                />
              </div>
              <div className="mv3">
                <label className="silver db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  onChange={ this.onPasswordChange }
                  className="silver b br2 pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" 
                  type="password" 
                  name="password"  
                  id="password" 
                />
              </div>
            </fieldset>
            <div className="">
              <input 
                onClick={ this.onSubmitRegister }
                className="silver b br3 ph3 pv2 input-reset ba b--silver bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Register" 
              />
            </div>
          </div>
        </main>		
      </article>
    );
  }
}

export default Register;