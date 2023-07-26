import { Injectable } from '@angular/core';
import { ChangesData } from '../interfaces/changes-data';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  makeId(length: number): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const allCharacters = characters;
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allCharacters.length);
      result += allCharacters.charAt(randomIndex);
    }
    return result;
  }

  base64ToFile(base64String: string, fileName: string, mimeType: string): File {
    // Remove the data:image/<mimeType>;base64, prefix if it exists
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");

    // Convert the Base64 string to a Uint8Array (binary data)
    const byteCharacters = atob(base64Data);
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }
    // Create a Blob from the binary data
    const blob = new Blob([byteArray], { type: mimeType });

    // Create a File object
    return new File([blob], fileName, { type: mimeType });
  }

  getElementById(id: string, interval = 50, notZero = true): Promise<HTMLElement | null> {
    return new Promise((resolve, reject) => {
      let findElement = () => {
        let element = document.getElementById(id)
        if (element && ((notZero && element?.clientHeight > 0) || !notZero))
          return resolve(element)
        else setTimeout(() => {
          findElement()
        }, interval)
      }
      findElement()
    })
  }
  // null, array, object is object.. undefined is undefined
  getChanges(prevObj: any, newObj: any, depth = 0): ChangesData[] {
    // const changesObj = {}
    const changes: ChangesData[] = []
    //  let prevKeys = Object.keys(prevObj)
    let newKeys = Object.keys(newObj)

    for (let key of newKeys) {
      if (this.isArray(newObj[key]) && this.isArray(prevObj[key]) && prevObj[key]?.length == newObj[key]?.length) {
        console.log('arrayy');
        let prevArr: any[] = prevObj[key]
        let newArr: any[] = newObj[key]
        if(!this.arraysEqual(prevArr,newArr)){
          changes.push({
            key: key,
            previousData: prevObj[key],
            newData: newObj[key],
          })
        }
      } else if (this.isObject(newObj[key]) && this.isObject(prevObj[key])) {
        //console.log('objectt',key);
        let subChanges = this.getChanges(prevObj[key], newObj[key])
        //console.log(subChanges);
        subChanges.forEach(chn => { chn.key = key + '.' + chn.key })
        changes.push(...subChanges)
        //console.log(changes);
      } else if (newObj[key] !== prevObj[key]) {
        changes.push({
          key: key,
          previousData: prevObj[key],
          newData: newObj[key],
        })
      }
    }
    return changes

  }

  private isArray(obj: any) {
    return obj?.length && typeof obj == 'object'
  }
  private isObject(obj: any) {
    return typeof obj == 'object' && obj !== null && !obj?.length
  }

  private arraysEqual(arr1: any[], arr2: any[]) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      const obj1 = arr1[i];
      const obj2 = arr2[i];
      if (this.isObject(obj1) && this.isObject(obj2)) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) {
          return false;
        }
        for (let key of keys1) {
          if (obj1[key] !== obj2[key]) {
            return false;
          }
        }
      } else {
        if(obj1 !== obj2){
          return false
        }
      }

    }
    return true;
  }
}
