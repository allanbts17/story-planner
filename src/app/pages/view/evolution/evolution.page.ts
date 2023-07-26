import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonModal } from '@ionic/angular';
import { ChangesData } from 'src/app/interfaces/changes-data';
import { Evolution } from 'src/app/interfaces/evolution';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ModalService } from 'src/app/services/modal.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Resources } from 'src/app/shared/classes/resourceData';
import { CollectionTypes, ResourceInterfaces } from 'src/app/shared/classes/types';
import { Collections } from 'src/app/shared/enums/collections';
import { Character } from 'src/app/shared/interfaces/character';

type GenericResource = {
  name: string;
  id: string;
  resourceType: string;
  raw: ResourceInterfaces;
}

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.page.html',
  styleUrls: ['./evolution.page.scss'],
})
export class EvolutionPage implements OnInit {
  @ViewChild('modal') modal!: IonModal
  modalId: string
  pickerId: string
  edit = false
  characterList!: Character[]
  resourceList!: GenericResource[]
  selectTitle: string = 'Seleccionar caracter'
  selectedResource!: GenericResource
  evolutionData: Evolution[] = []
  editEvolutionData: Evolution|undefined
  formGroup = new FormGroup({
    date: new FormGroup(''),
    reason: new FormControl('', Validators.required),
    elementName: new FormControl('', Validators.required),
    data: new FormControl('', Validators.required),
    changedData: new FormControl('', Validators.required)
  })
  public pickerColumns = [
    {
      name: 'resources',
      options: Resources.filter(res => {
        return res.id == 'character' || res.id == 'place' || res.id == 'object'
      }).map((res) => {
        return {
          text: res.name,
          value: res
        }
      })
    },
  ];

  public pickerButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
    },
    {
      text: 'Seleccionar',
      handler: async (value: any) => {
        let collection = value.resources.value.collection
        let id = value.resources.value.id
        this.selectTitle = 'Seleccionar ' + value.resources.value.singularName.toLowerCase()
        this.resourceList = <GenericResource[]>(await this.store.getAllDocuments(collection))?.map(res => {
          let data: GenericResource
          if (id == 'place' || id == 'object')
            data = {
              id: res.id,
              resourceType: id,
              name: res.name,
              raw: res,
            }
          else
            data = {
              id: res.id,
              resourceType: id,
              name: res.basic.name + ' ' + res.basic.lastname,
              raw: res
            }
          return data
        })
      },
    },
  ];

  constructor(private utils: UtilsService,
    private store: FirestoreService,
    private alertController: AlertController,
    private modalService: ModalService) {
    this.modalId = 'open-modal-' + utils.makeId(5)
    this.pickerId = 'picker-' + utils.makeId(5)
  }

  async ngOnInit() {
    this.resourceList = <GenericResource[]>(await this.store.getAllDocuments(Collections.CHARACTER))?.map(res => {
      const data = {
        id: res.id,
        resourceType: 'character',
        name: res.basic.name + ' ' + res.basic.lastname,
        raw: res
      }
      return data
    })
  }

  onSelectChange(ev: any) {
    let res = ev.detail.value
    this.selectedResource = res
    console.log(res);
    this.store.getEvolutionOfResource(<string>this.selectedResource.raw.id).then(data => {
      console.log(data);
      this.evolutionData = <Evolution[]>data
    })

  }

  onWillDismiss(ev: any) {
  }

  onWillPresent() {
  }

  async onResourceChange(changes: { changes: ChangesData[], newData: ResourceInterfaces}) {
    const alert = await this.alertController.create({
      header: 'Llenar los datos para guardar el cambio',
      // subHeader: 'Important message',
      //  message: 'This is an alert!',
      inputs: [
        {
          label: 'Fecha',
          placeholder: 'Fecha',
          name: 'date',
          value: this.editEvolutionData?.date||''
        },
        {
          label: 'Motivo de cambio',
          placeholder: 'Motivo de cambio',
          name: 'reason',
          value: this.editEvolutionData?.reason||''
        }
      ],
      buttons: [{
        text: 'Guardar',
        handler: async (value) => {
          console.log(value);
          await this.modalService.showLoading()
          if(this.editEvolutionData){
            this.editEvolutionData.date = value.date
            this.editEvolutionData.reason = value.reason
            this.editEvolutionData.data = changes.newData
            this.editEvolutionData.changedData = changes.changes
            await this.store.setDocument(Collections.EVOLUTION,this.editEvolutionData)
            console.log(this.editEvolutionData);
          } else {
          const evolution: Evolution = {
            date: value.date,
            reason: value.reason,
            order: this.evolutionData.length + 1,
            elementName: <CollectionTypes>Resources.find(res => res.id == this.selectedResource.resourceType)?.collection,
            data: changes.newData,
            changedData: changes.changes
          }
          
          await this.store.addDocument(Collections.EVOLUTION,evolution)
          console.log(evolution);
          }
          
          this.evolutionData = <Evolution[]> (await this.store.getEvolutionOfResource(<string>this.selectedResource.raw.id))
          await this.modal.dismiss()
          this.editEvolutionData = undefined
          await this.modalService.stopLoading()
          //console.log(evolution);
        }
      }],
    });

    await alert.present();
  }

  async editChange(ch: Evolution){
    this.editEvolutionData = ch
    await this.modal.present()
  }




  async deleteChange(res: Evolution) {
    let action = await this.modalService.presentAlert('Borrar recurso', '¿Estás seguro que deseas borrar este recurso?')
    console.log(action);
    await this.modalService.showLoading()
    if (action){
      await this.store.deleteDocument(Collections.EVOLUTION, <string>res.id)
      this.evolutionData = <Evolution[]> (await this.store.getEvolutionOfResource(<string>this.selectedResource.raw.id))
    }
    await this.modalService.stopLoading()
      
  }

}
