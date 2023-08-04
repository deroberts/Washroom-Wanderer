import React from 'react';
import Map from './components/Map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function App() {
  return (
    <div>
      <h1>Welcome to the Washroom Wanderer</h1>
      {/* Add your components and content here */}
      <Map icon={<FontAwesomeIcon icon={['fas', 'toilet']} />} />

    </div>
  );
}

export default App;
