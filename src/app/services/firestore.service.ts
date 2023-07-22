import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { CollectionTypes, ResourceInterfaces } from '../shared/classes/types';
import { firstValueFrom } from 'rxjs';
import { Collections } from '../shared/enums/collections';
import { Story } from '../shared/interfaces/story';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private afs: AngularFirestore) { }

  async addDocument(path: CollectionTypes, data: ResourceInterfaces): Promise<void> {
    try {
      data['id'] = this.afs.createId()
      let ref = await this.afs.collection(path).doc(data.id).set(data)
    } catch (error) {
      console.log('Firestore error:', error);
    }
  }

  async setDocument(path: CollectionTypes, data: ResourceInterfaces): Promise<string | null> {
    try {
      console.log(data.id,data);
      if (!data?.id)
        data['id'] = this.afs.createId()
      await this.afs.collection(path).doc(data.id).set(data)
      return <string>data.id
    } catch (error) {
      console.log('Firestore error:', error);
      return null
    }
  }

  async getAllDocuments(path: CollectionTypes) {
    try {
      let obs$ = this.afs.collection(path).get()
      let data = await firstValueFrom(obs$)
      let arr: any[] = []
      data.forEach(d => arr.push({ id: d.id, ...<any>d.data() }))
      return arr;
    } catch (error) {
      console.log('Firestore error:', error);
      return undefined
    }
  }

  async getDocument(path: CollectionTypes, id: string) {
    try {
      let obs$ = this.afs.collection(path).doc(id).get()
      let data = await firstValueFrom(obs$)
      return { id: data.id, ...<any>data.data() }
    } catch (error) {
      console.log('Firestore error:', error);
      return undefined
    }
  }

  async deleteDocument(path: CollectionTypes, id: string) {
    await this.afs.collection(path).doc(id).delete()
  }

  async getStoriesBySeries(serieId: string): Promise<Story[]> {
    let stories: Story[] = <Story[]>(await this.getAllDocuments(Collections.STORY))
    return stories?.filter(story => story.series?.id == serieId)
  }

  async getChaptersByStory(storyId: string) {
    try {
      let obs$ = this.afs.collection(Collections.CHAPTER, ref => ref.where('storyId', '==', storyId).orderBy('order', 'asc')).get()
      let data = await firstValueFrom(obs$)
      let arr: any[] = []
      data.forEach(d => arr.push({ id: d.id, ...<any>d.data() }))
      return arr;
    } catch (error) {
      console.log('Firestore error:', error);
      return undefined
    }
  }

  async getCharacteresByStory(storyId: string) {
    try {
      let obs$ = this.afs.collection(Collections.CHARACTER, ref => ref.where('basic.storyId', '==', storyId).orderBy('basic.name', 'asc')).get()
      let data = await firstValueFrom(obs$)
      let arr: any[] = []
      data.forEach(d => arr.push({ id: d.id, ...<any>d.data() }))
      return arr;
    } catch (error) {
      console.log('Firestore error:', error);
      return undefined
    }
  }

  async getPlacesByStory(storyId: string) {
    try {
      let obs$ = this.afs.collection(Collections.PLACE, ref => ref.where('storyId', '==', storyId).orderBy('name', 'asc')).get()
      let data = await firstValueFrom(obs$)
      let arr: any[] = []
      data.forEach(d => arr.push({ id: d.id, ...<any>d.data() }))
      return arr;
    } catch (error) {
      console.log('Firestore error:', error);
      return undefined
    }
  }

  async getObjectByStory(storyId: string) {
    try {
      let obs$ = this.afs.collection(Collections.OBJECT, ref => ref.where('storyId', '==', storyId).orderBy('name', 'asc')).get()
      let data = await firstValueFrom(obs$)
      let arr: any[] = []
      data.forEach(d => arr.push({ id: d.id, ...<any>d.data() }))
      return arr;
    } catch (error) {
      console.log('Firestore error:', error);
      return undefined
    }
  }

  // async getDefinitionsByOrigin(originId: string) {
  //   try {
  //     let obs$
  //     if (originId == '0') {
  //       obs$ = this.afs.collection(Collections.GLOSSARY, ref => ref.orderBy('concept', 'asc')).get()
  //     } else {
  //       obs$ = this.afs.collection(Collections.GLOSSARY, ref => ref.where('originId', '==', originId).orderBy('concept', 'asc')).get()
  //     }
  //     let data = await firstValueFrom(obs$)
  //     let arr: any[] = []
  //     data.forEach(d => arr.push({ id: d.id, ...<any>d.data() }))
  //     return arr;
  //   } catch (error) {
  //     console.log('Firestore error:', error);
  //     return undefined
  //   }
  // }
}
