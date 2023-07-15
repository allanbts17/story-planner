import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Firestore, addDoc, collection, collectionData} from '@angular/fire/firestore';
import { CollectionTypes, ResourceInterfaces } from '../shared/classes/types';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private afs: AngularFirestore) { }

  async addDocument(path: CollectionTypes, data: ResourceInterfaces): Promise<void> {
    try {
      data['id'] = this.afs.createId()
      let ref = await this.afs.collection(path).doc(data.id).set(data)
    } catch(error){
      console.log('Firestore error:',error);
    } 
  }

  async getAllDocuments(path: CollectionTypes){
    try {
      let obs$ = this.afs.collection(path).get()
      let data = await firstValueFrom(obs$)
      let arr: any[] = []
      data.forEach(d => arr.push({id: d.id, ...<any>d.data()}))
      return arr;
    } catch(error){
      console.log('Firestore error:',error);
      return undefined
    }
  }
}
