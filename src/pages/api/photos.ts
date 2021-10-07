
import { storage } from '../../config/firebase'
import { ref, listAll, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { v4 as createId } from 'uuid';

type Photo = {
    name: string;
    url: Array<string>;
}

export const getAll = async () => {
    let list: Photo[] = [];

    const imagesFolder = ref(storage, "images");
    const photoList = await listAll(imagesFolder);

    for(let i in photoList.items) {
        let photoUrl = await getDownloadURL(photoList.items[i]);
        
        //list.push({
        //    name: photoList.items[i].name,
        //    url: photoUrl
        //});
    }

    return list;
}

export const insert = async (files: FileList) => {
    let imagesUrl = []

    if(files) {
        
        for(let [key, file] of Object.entries(files)) {

            if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        
                let randomName = createId();
                let newFile = ref(storage, `images/${randomName}`);
        
                let upload = await uploadBytes(newFile, file);
                let photoUrl = await getDownloadURL(upload.ref);
                
                imagesUrl.push(photoUrl)
            } else {
                return new Error('Tipo de arquivo não permitido.');
            }

        }
    }

    return imagesUrl

    
}

export const deletePhoto = async (name: string) => {
    let photoRef = ref(storage, `images/${name}`);
    await deleteObject(photoRef);

}