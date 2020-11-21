import React from 'react';

import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  };

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    /* THIS CODE IS INCOMPLETE - PART OF MOVING CLARIFAI TO BACKEND
    - see 'Production + Deployment' > 'Security Review' video ~14:20
    - missing additional .then code that trickles into the next fetch
    - code from Clarifai API module also likely missing
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input:this.state.input
      })
    })
    .then(response => response.json())
    */

    fetch('http://localhost:3000/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id
      })
    })
      .then(response => response.json())
      .then(count => {
        // using Object.assign changes only the entries value
        // if this.setState({user: {entries: count}}) was used, then the entire user entry would be changed causing the name to become undefined
        this.setState(Object.assign(this.state.user, { entries: count }))
      })
    console.log('click'); 
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route } = this.state;
    return (
      <div className="App">
        <Navigation 
          onRouteChange={ this.onRouteChange } 
          isSignedIn={ isSignedIn } 
        />
        { route === 'home'
          ? <div>
            <Logo />
            <Rank 
              name={ this.state.user.name }
              entries={ this.state.user.entries }
            />
            <ImageLinkForm 
              onInputChange={ this.onInputChange } 
              onButtonSubmit={ this.onButtonSubmit } 
            />
            <FaceRecognition imageUrl={ imageUrl } />
          </div>
          : (
              route === 'signin'
              ? <SignIn 
                  loadUser={ this.loadUser }
                  onRouteChange={ this.onRouteChange } 
                />
              : <Register 
                  loadUser={ this.loadUser } 
                  onRouteChange={ this.onRouteChange } 
                />
            )           
        }
      </div>
    );
  }
}

export default App;