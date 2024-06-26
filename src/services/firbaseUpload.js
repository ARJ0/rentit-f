import { ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseUpload";
const firebaseUpload = async(image,name,cb,errCb) =>{
    const imageRef = ref(storage,name+Date.now());
    try{
        
        await uploadBytes(imageRef,image).then(()=>{
            getDownloadURL(imageRef).then(url=>{
                cb({data:url})
            })
        })
    }
    catch{
        errCb({data:null})
    }
}


export default firebaseUpload;