import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  loading!: HTMLIonLoadingElement
  constructor(private loadingController: LoadingController) {}

  async showLoading(msg: string = "Espere...") {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      message: msg,
      translucent: true,
      backdropDismiss: false,
    });

    await loading.present();
  }

  async stopLoading(){
    await this.loadingController.dismiss()
  }
}
