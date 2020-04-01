import React from 'react';

import database from './database';

export default function App() {
  database.insert({
    id: 1,
    name: 'Dimas Antonio',
    last: 'Paiva',
    age: 22
  });

  database.select(1);

  return <div className="App">Learn React</div>;
}
