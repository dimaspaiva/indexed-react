class IndexB {
  constructor(name, storeName) {
    this.database = name;
    this.storeName = storeName || `${name}Store`;

    window.indexedDB.deleteDatabase(this.database);
  }

  insert = (item) => {
    const request = window.indexedDB.open(this.database, 1);

    request.onupgradeneeded = () => {
      const { result: db } = request;
      db.createObjectStore(this.storeName, { keyPath: 'id' }); // most importante line, mistakes make yout db doesnt work!!
    };

    request.onsuccess = () => {
      const { result: db } = request;
      const transaction = db.transaction([this.storeName], 'readwrite');

      const objectStore = transaction.objectStore(
        [this.storeName],
        'readwrite'
      );

      const response = objectStore.put({
        id: 2,
        name: 'Dimas Antonio',
        last: 'Paiva',
        age: 22
      });

      response.onsuccess = () => {
        console.log(response);
      };

      response.onerror = (e) => {
        console.log(e);
      };
    };

    request.onerror = (e) => {
      console.log(e);
    };
  };
}

export default new IndexB('shopCart', 'shopStore');
