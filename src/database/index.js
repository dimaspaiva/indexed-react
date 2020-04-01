class IndexB {
  constructor(name, storeName) {
    this.database = name;
    this.storeName = storeName || `${name}Store`;

    window.indexedDB.deleteDatabase(this.database);
  }

  databaseRequest = (operation) => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.database, 1); // configure indexedDB for others browsers

      request.onupgradeneeded = () => {
        const { result: db } = request;
        db.createObjectStore(this.storeName, { keyPath: 'id' });
      };

      request.onsuccess = () => {
        const { result: db } = request;
        const transaction = db.transaction(this.storeName, 'readwrite');
        const objectStore = transaction.objectStore(this.storeName);
        const response = operation(objectStore);

        response.onerror = (e) => {
          reject(e);
        };

        response.onsuccess = () => {
          resolve(response.result);
        };
      };

      request.onerror = (e) => {
        reject(e);
      };
    });
  };

  insert = async (item) => {
    const result = await this.databaseRequest((objectStore) => {
      return objectStore.put(item);
    });

    return await this.selectOne(result);
  };

  delete = async (id) => {
    await this.databaseRequest((objectStore) => {
      return objectStore.delete(id);
    });
  };

  update = async (item) => {
    const result = await this.databaseRequest((objectStore) => {
      return objectStore.put(item);
    });

    return await this.selectOne(result);
  };

  selectOne = async (id) => {
    const result = await this.databaseRequest((objectStore) => {
      return objectStore.get(id);
    });

    return result;
  };

  selectAll = async () => {
    const result = await this.databaseRequest((objectStore) => {
      return objectStore.getAll();
    });

    return result;
  };
}

export default new IndexB('shopCart', 'shopStore');
