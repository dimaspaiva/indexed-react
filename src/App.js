import React from 'react';

export default function App() {
  const request = window.indexedDB.open('training', 1);

  request.onerror = () => {};

  request.onupgradeneeded = () => {
    const { result: db } = request;
    console.log(db);
    db.createObjectStore('shopCartStore', { keyPath: 'id' });
  };

  request.onsuccess = () => {
    const { result: db } = request;
    const transaction = db.transaction(['shopCartStore'], 'readwrite');
    const objectStore = transaction.objectStore('shopCartStore');

    const insert = objectStore.put({
      id: 1,
      name: 'dimas',
      lastName: 'paiva',
      age: 22
    });

    insert.onsuccess = () => {
      console.log('worked!');
    };

    insert.onerror = (e) => {
      console.log('failed');
      console.log(e);
    };

    const get = objectStore.get(1);

    get.onsuccess = (e) => {
      console.log(e.target.result);
    };
  };

  return <div className="App">Learn React</div>;
}
