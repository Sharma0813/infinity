import React, { useEffect } from 'react';
import InfiniteScroll from './infiniteScroll'; 

const App = () => {
  useEffect(() => {
    
    console.log('App mounted');
  }, []);

  return (
    <div>
      <InfiniteScroll /> {}
    </div>
  );
};

export default App;
