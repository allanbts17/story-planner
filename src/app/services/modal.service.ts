import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  loading!: HTMLIonLoadingElement
  constructor(private loadingController: LoadingController,
    private alertController: AlertController) { }

  async showLoading(msg: string = "Espere...") {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      message: msg,
      translucent: true,
      backdropDismiss: false,
    });

    await loading.present();
  }

  async stopLoading() {
    await this.loadingController.dismiss()
  }

  async presentAlert(title: string, msg: string, cancelText = 'Cancelar', sucessText = 'Ok') {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: title,
        //  subHeader: 'Important message',
        message: msg,
        buttons: [{
          text: cancelText,
          role: 'cancel',
          handler: () => {
            resolve(false)
          }
        }, {
          text: sucessText,
          role: 'destructive',
          handler: () => {
            resolve(true)
          }
        }],
      });
      await alert.present();
    })
  }
}
