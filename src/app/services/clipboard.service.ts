import { Injectable } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  constructor() { }

  writeToClipboard = async () => {
    await Clipboard.write({
      string: "Hello World!"
    });
  };

  checkClipboard = async () => {
    const { type, value } = await Clipboard.read();

    console.log(`Got ${type} from clipboard: ${value}`);
  };
}
