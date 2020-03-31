import React from 'react';

import database from './database';

export default function App() {
  database.insert();

  return <div className="App">Learn React</div>;
}
