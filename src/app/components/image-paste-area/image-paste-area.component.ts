import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CameraService } from 'src/app/services/camera.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-image-paste-area',
  templateUrl: './image-paste-area.component.html',
  styleUrls: ['./image-paste-area.component.scss'],
})
export class ImagePasteAreaComponent implements OnInit {
  @Input() imageData!: string | ArrayBuffer | null | undefined;
  @Output() imageDataChange = new EventEmitter<string | ArrayBuffer | null | undefined>();
  isApp: boolean
  storyImageId: string
  constructor(private platform: Platform,
    private utils: UtilsService,
    private camera: CameraService) {
    this.storyImageId = utils.makeId(10)
    if (this.platform.is('mobileweb')) {
      this.isApp = false;
      console.log('is not app');
    } else {
      console.log("is app")

      this.isApp = true;
    }
  }

  ngOnInit() {
    if (!this.isApp){
      setTimeout(() => {
        this.pasteImage()
      }, 200)
    }

  }

  addImage(){
    this.camera.takePicture().then(img => {
      this.imageData = img
      this.imageDataChange.emit(this.imageData)
    })
  }

  pasteImage() {
    let imageArea = document.getElementById("story-image-copy-area-" + this.storyImageId)
    if (imageArea) {
      imageArea.addEventListener('paste', (event: ClipboardEvent) => {

        const items = event.clipboardData?.items;
        console.log('enter', items);
        if (items) {
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.indexOf('image') !== -1) {
              const blob = item.getAsFile();
              console.log(blob?.name);
              //console.log( blob?.type);
              const reader = new FileReader();
              reader.onload = (event: ProgressEvent<FileReader>) => {
                this.imageData = event.target?.result;
                this.imageDataChange.emit(this.imageData)
                console.log(this.imageData);
              };
              reader.readAsDataURL(<any>blob);
            }
          }
        }
      });
      document.execCommand('paste');
    } else {
      setTimeout(() => {
        this.pasteImage()
      }, 200)
    }
  }
}
