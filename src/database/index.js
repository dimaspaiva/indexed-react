class IndexB {
  constructor(name, storeName) {
    this.database = name;
    this.storeName = storeName || `${name}Store`;

    window.indexedDB.deleteDatabase(this.database);
  }

  indexedAsync = (operation) => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.database, 1);

      request.onupgradeneeded = () => {
        const { result: db } = request;
        db.createObjectStore(this.storeName, { keyPath: 'id' });
      };

      request.onsuccess = () => {
        const { result: db } = request;
        const transaction = db.transaction(this.storeName, 'readwrite');
        const objectStore = transaction.objectStore(
          this.storeName,
          'readwrite'
        );

        const response = operation(objectStore);

        response.onerror = (e) => {
          reject(e);
        };

        response.onsuccess = (e) => {
          // console.log(e);
          resolve(response.result);
        };
      };

      request.onerror = (e) => {
        reject(e);
      };
    });
  };

  insert = async (item) => {
    const result = await this.indexedAsync((objectStore) => {
      return objectStore.put(item);
    });
    console.log(result);
  };

  select = async (id) => {
    const result = await this.indexedAsync((objectStore) => {
      return objectStore.get(1);
    });

    console.log(result);
  };
}

export default new IndexB('shopCart', 'shopStore');
