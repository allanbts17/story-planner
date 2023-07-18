import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperGuideComponent } from 'src/app/components/stepper-guide/stepper-guide.component';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CharacerFormGroups } from 'src/app/shared/classes/character-form-group';
import { Collections } from 'src/app/shared/enums/collections';
import { Step } from 'src/app/shared/interfaces/step';
import { Story } from 'src/app/shared/interfaces/story';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
})
export class CharacterPage implements OnInit {
  @ViewChild(StepperGuideComponent) stepper!: StepperGuideComponent
  characterFormGroups = new CharacerFormGroups()
  isLinear = false;
  imageData!: string | ArrayBuffer | null | undefined;
  storiesList!: Story[]
  edit = false
  editAndImageChanged: string | null = null
  resId!: string

  stepLabels = [
    'Básico',
    'Apariencia',
    'Carácter',
    'Reacciones',
    'Residencia',
    'Relaciones',
    'Aspiraciones',
    'Rol en la historia',
    'Otro'
  ]
  step = 0

  formGroup: FormGroup<any> = new FormGroup({
    height: new FormControl(''),
    weight: new FormControl(''),
    skin: new FormControl(''),
    eyes: new FormControl(''),
    hair: new FormControl(''),
    distinguishableTraits: new FormControl(''),
    posture: new FormControl(''),
    otherPhysicalTrait: new FormControl(''),
    outfit: new FormControl(''),
    accessories: new FormControl('')
  })

  constructor(private utils: UtilsService,
    private store: FirestoreService) {

  }

  async ngOnInit() {

    // let stepper = <HTMLElement>(await this.utils.getElementById('stepper-char'))
    // let stepperBack = <HTMLElement>(await this.utils.getElementById('stepper-back', 50, false))

    // stepperBack.style.height = `${stepper.clientHeight}px`

    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //   stepper.classList.add('dark')
    // }

    // window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    //   const newColorScheme = event.matches ? "dark" : "light";
    //   if (event.matches) {
    //     stepper.classList.add('dark')
    //   } else {
    //     stepper.classList.remove('dark')
    //   }
    //   console.log('change', newColorScheme);
    // });
    // console.log(header?.clientHeight,window.innerHeight);

    this.storiesList = (await this.store.getAllDocuments(Collections.STORY)) || []
    this.storiesList.push({
      id: '0',
      title: 'Sin historia',
      synopsis: '',
      series: null,
      image: null,
      genre: [],
    })
  }

  stepSelected(_step: Step) {
    this.step = _step.step
    console.log('s', _step);
  }

  buttonDisabled(){
    return false
    let disable = false
    if(this.step == 0 && this.characterFormGroups.basic.invalid) disable = true
    else if(this.step == 1 && this.characterFormGroups.appearance.invalid) disable = true
    return disable
  }

  stepperNext() {
    this.step =  this.step == 0? 1:0
    // this.step++;
    // this.stepper.next()
    // console.log('step',this.step);
  }

  toInt(str: string){
    return parseInt(str)
  }



}
