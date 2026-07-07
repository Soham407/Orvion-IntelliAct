export function getClientDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('OrvionPortalDB', 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('documents')) {
        db.createObjectStore('documents', { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function clientGetDocs(apiDocs) {
  const db = await getClientDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('documents', 'readonly');
    const store = tx.objectStore('documents');
    const request = store.getAll();
    request.onsuccess = async () => {
      const seeded = localStorage.getItem('mockDBSeeded');
      if (!seeded) {
        const tx2 = db.transaction('documents', 'readwrite');
        const store2 = tx2.objectStore('documents');
        apiDocs.forEach(doc => store2.put(doc));
        localStorage.setItem('mockDBSeeded', 'true');
        resolve(apiDocs.sort((a, b) => b.id - a.id));
      } else {
        resolve(request.result.sort((a, b) => b.id - a.id));
      }
    };
    request.onerror = () => reject(request.error);
  });
}

export async function clientUploadDoc(formData) {
  const db = await getClientDB();
  const file = formData.get('file');
  const doc = {
    id: Date.now(),
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    file_name: file.name,
    file_type: file.name.split('.').pop()?.toUpperCase() || "UNKNOWN",
    file_size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
    file_blob: file, 
    uploaded_at: new Date().toISOString()
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction('documents', 'readwrite');
    const store = tx.objectStore('documents');
    const request = store.add(doc);
    request.onsuccess = () => resolve(doc);
    request.onerror = () => reject(request.error);
  });
}

export async function clientDeleteDoc(id) {
  const db = await getClientDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('documents', 'readwrite');
    const store = tx.objectStore('documents');
    const request = store.delete(parseInt(id));
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function clientGetDocBlob(id) {
  const db = await getClientDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('documents', 'readonly');
    const store = tx.objectStore('documents');
    const request = store.get(parseInt(id));
    request.onsuccess = () => resolve(request.result?.file_blob);
    request.onerror = () => reject(request.error);
  });
}
