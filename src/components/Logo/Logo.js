import React from 'react';
import Tilt from 'react-tilt';
import brain from './brainlogo.png';
import './Logo.css';

const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt className="Tilt" options={{ max : 45 }} style={{ height: 100, width: 100 }} >
 				<div className="Tilt-inner pa3"><img style={{paddingTop: '2px'}} alt='Logo' src={brain} /></div>
			</Tilt>
		</div>
	);
}

export default Logo;

// https://www.npmjs.com/package/react-tilt