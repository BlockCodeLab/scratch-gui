import storage from './storage';
import md5 from 'js-md5';
import soundThumbnail from '!base64-loader!../lib/backpack/sound-thumbnail.jpg';

// Special constants
const DATABASE_NAME = 'SCRATCH';
const DATABASE_VERSION = 1;
const STORE_NAME = 'backpack';

const base64ToArrayBuffer = base64 => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const array = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        array[i] = binaryString.charCodeAt(i);
    }
    return array.buffer;
};

const arrayBufferToBase64 = buffer => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
};

const idbItemToBackpackItem = item => {
    // convert id to string
    item.id = `${item.id}`;

    if (item.type === 'sound') {
        // For sounds, use the local thumbnail instead of what was stored in the backpack.
        // The thumbnail was updated and it doesn't make sense for already backpacked sounds to
        // use the old icon instead of the new one.
        item.thumbnailUrl = `data:;base64,${soundThumbnail}`;
    } else {
        // Thumbnail could be any image format. The browser will figure out which format it is.
        item.thumbnailUrl = `data:;base64,${arrayBufferToBase64(item.thumbnailData)}`;
    }

    let assetType;
    if (item.type === 'script') {
        item.bodyUrl = `data:application/json;base64,${arrayBufferToBase64(item.bodyData)}`;
    } else if (item.type === 'sprite') {
        item.bodyUrl = `data:application/zip;base64,${arrayBufferToBase64(item.bodyData)}`;
    } else if (item.type === 'costume') {
        if (item.mime === 'image/svg+xml') {
            assetType = storage.AssetType.ImageVector;
        } else if (item.mime === 'image/png' || item.mime === 'image/jpeg') {
            assetType = storage.AssetType.ImageBitmap;
        }
    } else if (item.type === 'sound') {
        assetType = storage.AssetType.Sound;
    }

    if (assetType) {
        const extension = assetType.runtimeFormat;
        const itemMD5 = item.bodyMD5;
        const md5ext = `${itemMD5}.${extension}`;
        item.body = md5ext;
        storage.builtinHelper._store(
            assetType,
            extension,
            new Uint8Array(item.bodyData),
            itemMD5
        );
    }

    return item;
};

let _db;
const openDB = () => new Promise((resolve, reject) => {
    if (_db) {
        resolve(_db);
        return;
    }

    if (!window.indexedDB) {
        reject(new Error('indexedDB is not supported'));
        return;
    }

    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    request.onupgradeneeded = e => {
        const db = e.target.result;
        db.createObjectStore(STORE_NAME, {
            keyPath: 'id',
            autoIncrement: true
        });
    };

    request.onsuccess = e => {
        _db = e.target.result;
        resolve(_db);
    };

    request.onerror = () => {
        reject(new Error(`DB error: ${request.error}`));
    };
});

const getBackpackContents = ({
    limit,
    offset
}) => openDB().then(db => new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    transaction.onerror = () => {
        reject(new Error(`Transaction error: ${transaction.error}`));
    };
    const store = transaction.objectStore(STORE_NAME);
    const items = [];
    const request = store.openCursor(null, 'prev');
    let first = true;
    request.onsuccess = e => {
        const cursor = e.target.result;
        if (first) {
            first = false;
            if (cursor && offset !== 0) {
                cursor.advance(offset);
                return;
            }
        }
        if (cursor && items.length < limit) {
            items.push(idbItemToBackpackItem(cursor.value));
            cursor.continue();
        } else {
            resolve(items);
        }
    };
}));

const saveBackpackObject = ({
    type,
    mime,
    name,
    body,
    thumbnail
}) => openDB().then(db => new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    transaction.onerror = () => {
        reject(new Error(`Transaction error: ${transaction.error}`));
    };
    const store = transaction.objectStore(STORE_NAME);
    const bodyData = base64ToArrayBuffer(body);
    const bodyMD5 = md5(bodyData);
    const idbItem = {
        type,
        mime,
        name,
        bodyData,
        bodyMD5,
        thumbnailData: base64ToArrayBuffer(thumbnail)
    };
    const putRequest = store.put(idbItem);
    putRequest.onsuccess = () => {
        idbItem.id = putRequest.result;
        resolve(idbItemToBackpackItem(idbItem));
    };
}));

const deleteBackpackObject = ({
    id
}) => openDB().then(db => new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    transaction.onerror = () => {
        reject(new Error(`Transaction error: ${transaction.error}`));
    };
    const store = transaction.objectStore(STORE_NAME);
    // Convert string IDs to number IDs
    const deleteRequest = store.delete(+id);
    deleteRequest.onsuccess = () => {
        resolve();
    };
}));

export default {
    getBackpackContents,
    saveBackpackObject,
    deleteBackpackObject
};
