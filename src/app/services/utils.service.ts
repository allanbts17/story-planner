import { Injectable } from '@angular/core';

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

  getElementById(id: string, interval = 50, notZero = true): Promise<HTMLElement|null> {
    return new Promise((resolve, reject) => {
      let findElement = () => {
        let element = document.getElementById(id)
        if (element && ( (notZero && element?.clientHeight > 0) || !notZero ))
          return resolve(element)
        else setTimeout(() => {
          findElement()
        }, interval)
      }
      findElement()
    })
  }
}
