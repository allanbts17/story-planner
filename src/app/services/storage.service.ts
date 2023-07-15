import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private baseUrl = environment.storageBaseUrl

  constructor(private storage: AngularFireStorage,
    private utils: UtilsService) { }

  uploadFile(file: File, path: string, name: string) {
    //const fileRef = this.storage.ref(this.makeFullPath(path,name));
   // const task = this.storage.upload(this.makePath(path,name), file);
  }

  uploadBase64(data: string, path: string, name: string, mimeType: string): Promise<string|any>{
    //const fileRef = this.storage.ref(filePath);
    const file = this.utils.base64ToFile(data,name,mimeType)
    const task: AngularFireUploadTask = this.storage.upload(this.makePath(path,name,mimeType), file);
    return new Promise((resolve,reject)=>{
      task.then((a)=>{
        console.log(a);
        resolve(this.makeFullPath(path,name,mimeType))
      },(error)=>{
        console.log(error);
        reject(error)
      })
    })
  }

  private makeFullPath(path: string, name: string, mimeType: string){
    return this.baseUrl+'/'+path+'/'+name+'.'+mimeType
  }

  private makePath(path: string, name: string, mimeType: string){
    return path+'/'+name+'.'+mimeType
  }
}


