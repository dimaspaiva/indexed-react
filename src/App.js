import React from 'react';

import database from './database';

export default function App() {
  const showDatabase = async () => {
    const first = await database.insert({
      id: 1,
      name: 'Dimas Antonio',
      last: 'Paiva',
      age: 22
    });
    console.log(JSON.stringify(first));

    const second = await database.insert({
      id: 2,
      name: 'Antonio Donizeti',
      last: 'Jr',
      age: 35
    });
    console.log(JSON.stringify(second));

    const updated = await database.update({
      id: 2,
      name: 'Antonio Donizeti',
      last: 'Paiva Jr.',
      age: 35
    });
    console.log(JSON.stringify(updated));

    await database.delete(1);
    await database.delete(1);
  };

  showDatabase();

  return <div className="App">Learn React</div>;
}
