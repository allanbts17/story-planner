import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular';
import { StepperGuideComponent } from 'src/app/components/stepper-guide/stepper-guide.component';
import { ChangesData } from 'src/app/interfaces/changes-data';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CharacerFormGroups } from 'src/app/shared/classes/character-form-group';
import { ResourceInterfaces } from 'src/app/shared/classes/types';
import { Collections } from 'src/app/shared/enums/collections';
import { DataPaths } from 'src/app/shared/enums/data-paths';
import { Character, RolType, charRelationData, getRelationByNumber, getRolLabel, getRolType } from 'src/app/shared/interfaces/character';
import { Step } from 'src/app/shared/interfaces/step';
import { Story } from 'src/app/shared/interfaces/story';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
})

export class CharacterFormComponent implements OnInit {
  @Input() edit = false
  @Input() resourceData!: ResourceInterfaces
  @Input() isEvolution = false
  @Output() changedEvent = new EventEmitter<{ changes:ChangesData[],newData: ResourceInterfaces}>()
  @ViewChild(StepperGuideComponent) stepper!: StepperGuideComponent
  @ViewChild(IonContent) content!: IonContent;
  characterFormGroups = new CharacerFormGroups()
  isLinear = false;
  imageData!: string | ArrayBuffer | null | undefined;
  storiesList!: Story[]
  editAndImageChanged: string | null = null
  resId!: string
  relatedCharacterList: charRelationData[] = []
  evolutionData!: ResourceInterfaces

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

  characterRelated = new FormGroup({
    name: new FormControl('', Validators.required),
    relationship: new FormControl('', Validators.required), //1 | 2 | 3 | 4 | 5 | 6 | 7;
    relationType: new FormControl('')
  })

  constructor(private store: FirestoreService,
    private modal: ModalService,
    private nav: NavigateService,
    private storage: StorageService,
    private utils: UtilsService) {
    
  }

  setData() {

    const editData: Character = <Character>this.resourceData
    if(this.isEvolution) this.evolutionData = editData
    if (!editData) return;
    this.edit = true
    this.resId = <string>editData.id;

    this.characterFormGroups.basic.controls.name.setValue(editData.basic.name),
    this.characterFormGroups.basic.controls.lastname.setValue(editData.basic.lastname),
    this.characterFormGroups.basic.controls.nickname.setValue(editData.basic.nickname),
    this.characterFormGroups.basic.controls.age.setValue(editData.basic.age),
    this.characterFormGroups.basic.controls.gender.setValue(editData.basic.gender),
    this.characterFormGroups.basic.controls.birthdate.setValue(editData.basic.birthdate),
    this.characterFormGroups.basic.controls.birthPlace.setValue(editData.basic.birthPlace),
    this.characterFormGroups.basic.controls.storyId.setValue(editData.basic.storyId || '0'),

    this.imageData = editData.basic.image
    this.editAndImageChanged = this.imageData

    this.characterFormGroups.appearance.controls.height.setValue(editData.appearance.height)
    this.characterFormGroups.appearance.controls.weight.setValue(editData.appearance.weight)
    this.characterFormGroups.appearance.controls.skin.setValue(editData.appearance.skin)
    this.characterFormGroups.appearance.controls.eyes.setValue(editData.appearance.eyes)
    this.characterFormGroups.appearance.controls.hair.setValue(editData.appearance.hair)
    this.characterFormGroups.appearance.controls.distinguishableTraits.setValue(editData.appearance.distinguishableTraits)
    this.characterFormGroups.appearance.controls.posture.setValue(editData.appearance.posture)
    this.characterFormGroups.appearance.controls.otherPhysicalTrait.setValue(editData.appearance.otherPhysicalTrait)
    this.characterFormGroups.appearance.controls.outfit.setValue(editData.appearance.outfit)
    this.characterFormGroups.appearance.controls.accessories.setValue(editData.appearance.accessories)

    this.characterFormGroups.personality.controls.generalPersonality.setValue(editData.personality.generalPersonality)
    this.characterFormGroups.personality.controls.qualities.setValue(editData.personality.qualities)
    this.characterFormGroups.personality.controls.defects.setValue(editData.personality.defects)
    this.characterFormGroups.personality.controls.intelligence.setValue(editData.personality.intelligence)
    this.characterFormGroups.personality.controls.habits.setValue(editData.personality.habits)
    this.characterFormGroups.personality.controls.fears.setValue(editData.personality.fears)
    this.characterFormGroups.personality.controls.skills.setValue(editData.personality.skills)
    this.characterFormGroups.personality.controls.weaknesses.setValue(editData.personality.weaknesses)

    this.characterFormGroups.reactions.controls.fear.setValue(editData.reactions.fear)
    this.characterFormGroups.reactions.controls.sorprise.setValue(editData.reactions.sorprise)
    this.characterFormGroups.reactions.controls.sadness.setValue(editData.reactions.sadness)
    this.characterFormGroups.reactions.controls.rejection.setValue(editData.reactions.rejection)
    this.characterFormGroups.reactions.controls.anger.setValue(editData.reactions.anger)
    this.characterFormGroups.reactions.controls.hapiness.setValue(editData.reactions.hapiness)
    this.characterFormGroups.reactions.controls.anotherReaction.setValue(editData.reactions.anotherReaction)
    this.characterFormGroups.reactions.controls.doubtPhrases.setValue(editData.reactions.doubtPhrases)
    this.characterFormGroups.reactions.controls.hapinessPhrases.setValue(editData.reactions.hapinessPhrases)
    this.characterFormGroups.reactions.controls.sadnessPhrases.setValue(editData.reactions.sadnessPhrases)
    this.characterFormGroups.reactions.controls.enthusiasmPhrases.setValue(editData.reactions.enthusiasmPhrases)
    this.characterFormGroups.reactions.controls.angerPhrases.setValue(editData.reactions.angerPhrases)
    this.characterFormGroups.reactions.controls.anotherPhrases.setValue(editData.reactions.anotherPhrases)

    this.characterFormGroups.home.controls.country.setValue(editData.home.country)
    this.characterFormGroups.home.controls.province.setValue(editData.home.province)
    this.characterFormGroups.home.controls.neighborhood.setValue(editData.home.neighborhood)
    this.characterFormGroups.home.controls.homeDescription.setValue(editData.home.homeDescription)
    this.characterFormGroups.home.controls.neighbors.setValue(editData.home.neighbors)

    this.relatedCharacterList = editData.relations.character?.length ? editData.relations.character : []

    this.characterFormGroups.aspirations.controls.hobbies.setValue(editData.aspirations.hobbies)
    this.characterFormGroups.aspirations.controls.dislike.setValue(editData.aspirations.dislike)
    this.characterFormGroups.aspirations.controls.professionOrStudies.setValue(editData.aspirations.professionOrStudies)
    this.characterFormGroups.aspirations.controls.goals.setValue(editData.aspirations.goals)

    this.characterFormGroups.storyRole.controls.rol.setValue(editData.storyRole.rol)
    this.characterFormGroups.storyRole.controls.importantEvent.setValue(editData.storyRole.importantEvent)
    this.characterFormGroups.storyRole.controls.bestMemories.setValue(editData.storyRole.bestMemories)
    this.characterFormGroups.storyRole.controls.worstMemories.setValue(editData.storyRole.worstMemories)

    this.characterFormGroups.other.controls.label.setValue(editData.other.label)
    this.characterFormGroups.other.controls.content.setValue(editData.other.content)


  }

  getTypeRelateds(type: 'Amigo' | 'Enemigo' | 'Familiar' | 'Other'): charRelationData[] {
    return this.relatedCharacterList.filter(char => {
      return char.relationType == type
    })
  }

  addRelated() {
    this.relatedCharacterList.push({
      name: <string>this.characterRelated.controls.name.value,
      relationship: <string>this.characterRelated.controls.relationship.value,
      relationType: <string>this.characterRelated.controls.relationType.value,
    })
    this.characterRelated.controls.name.setValue('')
    this.characterRelated.controls.relationship.setValue('')
    this.characterRelated.controls.relationType.setValue('')
  }

  deleteRelated(char: charRelationData) {
    this.relatedCharacterList = this.relatedCharacterList.filter(
      ch => ch.name != char.name
    )
  }


  async ngOnInit() {
    this.setData()
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

  stepSelected(step: Step) {
    this.step = step.step
    console.log('s', step);
  }

  buttonDisabled() {
    let disable = false
    if (this.step == 0 && this.characterFormGroups.basic.invalid) disable = true
    else if (this.step == 1 && this.characterFormGroups.appearance.invalid) disable = true
    //else disable = true
    return disable
  }

  stepperNext() {
    this.step++;
    this.stepper.next()
    setTimeout(() => { this.content.scrollToTop(50); })
    console.log('step', this.step);
  }

  async saveCharacter() {
    await this.modal.showLoading()
    try {
      let imageUrl = null
      if (this.imageData && this.editAndImageChanged != this.imageData)
        imageUrl = await this.storage.uploadBase64(<string>this.imageData, DataPaths.CHARACTER_IMAGES, this.utils.makeId(10), 'png')
      let storyId = <string>this.characterFormGroups.basic.controls.storyId.value
      const character: Character = {
        basic: {
          name: <string>this.characterFormGroups.basic.controls.name.value,
          lastname: <string>this.characterFormGroups.basic.controls.lastname.value,
          nickname: <string>this.characterFormGroups.basic.controls.nickname.value || null,
          age: <string>this.characterFormGroups.basic.controls.age.value || null,
          gender: <string>this.characterFormGroups.basic.controls.gender.value || null,
          birthdate: <string>this.characterFormGroups.basic.controls.birthdate.value || null,
          birthPlace: <string>this.characterFormGroups.basic.controls.birthPlace.value || null,
          storyId: storyId == '' ? null : storyId,
          image: imageUrl || this.editAndImageChanged,
        },
        appearance: {
          height: <string>this.characterFormGroups.appearance.controls.height.value || null,
          weight: <string>this.characterFormGroups.appearance.controls.weight.value || null,
          skin: <string>this.characterFormGroups.appearance.controls.skin.value || null,
          eyes: <string>this.characterFormGroups.appearance.controls.eyes.value || null,
          hair: <string>this.characterFormGroups.appearance.controls.hair.value || null,
          distinguishableTraits: <string>this.characterFormGroups.appearance.controls.distinguishableTraits.value || null,
          posture: <string>this.characterFormGroups.appearance.controls.posture.value || null,
          otherPhysicalTrait: <string>this.characterFormGroups.appearance.controls.otherPhysicalTrait.value || null,
          outfit: <string>this.characterFormGroups.appearance.controls.outfit.value || null,
          accessories: <string>this.characterFormGroups.appearance.controls.accessories.value || null,
        },
        personality: {
          generalPersonality: <string>this.characterFormGroups.personality.controls.generalPersonality.value || null,
          qualities: <string>this.characterFormGroups.personality.controls.qualities.value || null,
          defects: <string>this.characterFormGroups.personality.controls.defects.value || null,
          intelligence: <string>this.characterFormGroups.personality.controls.intelligence.value || null,
          habits: <string>this.characterFormGroups.personality.controls.habits.value || null,
          fears: <string>this.characterFormGroups.personality.controls.fears.value || null,
          skills: <string>this.characterFormGroups.personality.controls.skills.value || null,
          weaknesses: <string>this.characterFormGroups.personality.controls.weaknesses.value || null,
        },
        reactions: {
          fear: <string>this.characterFormGroups.reactions.controls.fear.value || null,
          sorprise: <string>this.characterFormGroups.reactions.controls.sorprise.value || null,
          sadness: <string>this.characterFormGroups.reactions.controls.sadness.value || null,
          rejection: <string>this.characterFormGroups.reactions.controls.rejection.value || null,
          anger: <string>this.characterFormGroups.reactions.controls.anger.value || null,
          hapiness: <string>this.characterFormGroups.reactions.controls.hapiness.value || null,
          anotherReaction: <string>this.characterFormGroups.reactions.controls.anotherReaction.value || null,
          doubtPhrases: <string>this.characterFormGroups.reactions.controls.doubtPhrases.value || null,
          hapinessPhrases: <string>this.characterFormGroups.reactions.controls.hapinessPhrases.value || null,
          sadnessPhrases: <string>this.characterFormGroups.reactions.controls.sadnessPhrases.value || null,
          enthusiasmPhrases: <string>this.characterFormGroups.reactions.controls.enthusiasmPhrases.value || null,
          angerPhrases: <string>this.characterFormGroups.reactions.controls.angerPhrases.value || null,
          anotherPhrases: <string>this.characterFormGroups.reactions.controls.anotherPhrases.value || null,
        },
        home: {
          country: <string>this.characterFormGroups.home.controls.country.value || null,
          province: <string>this.characterFormGroups.home.controls.province.value || null,
          neighborhood: <string>this.characterFormGroups.home.controls.neighborhood.value || null,
          homeDescription: <string>this.characterFormGroups.home.controls.homeDescription.value || null,
          neighbors: <string>this.characterFormGroups.home.controls.neighbors.value || null,
        },
        relations: {
          character: this.relatedCharacterList.length > 0 ? this.relatedCharacterList : null
        },
        aspirations: {
          hobbies: <string>this.characterFormGroups.aspirations.controls.hobbies.value || null,
          dislike: <string>this.characterFormGroups.aspirations.controls.dislike.value || null,
          professionOrStudies: <string>this.characterFormGroups.aspirations.controls.professionOrStudies.value || null,
          goals: <string>this.characterFormGroups.aspirations.controls.goals.value || null,
        },
        storyRole: {
          rol: <RolType>this.characterFormGroups.storyRole.controls.rol.value || null,
          importantEvent: <string>this.characterFormGroups.storyRole.controls.importantEvent.value || null,
          bestMemories: <string>this.characterFormGroups.storyRole.controls.bestMemories.value || null,
          worstMemories: <string>this.characterFormGroups.storyRole.controls.worstMemories.value || null,
        },
        other: {
          label: <string>this.characterFormGroups.other.controls.label.value || null,
          content: <string>this.characterFormGroups.other.controls.content.value || null,
        }
      }
      if (this.edit) character.id = this.resId

      await this.store.setDocument(Collections.CHARACTER, character)
      this.nav.navigate('home', { tabId: 'character' })

      if (!this.isEvolution) {
         await this.store.setDocument(Collections.CHARACTER, character)
      this.nav.navigate('home', { tabId: 'character' })
      } else {
        let changes = this.utils.getChanges(this.evolutionData,character)
        this.changedEvent.emit({ changes:changes, newData: character })
      }
    } catch (err) {
      console.log(err);
    }
    await this.modal.stopLoading()
  }

  toInt(str: string) {
    return parseInt(str)
  }

  relationByNumber(num: string) {
    return getRelationByNumber(<'1' | '2' | '3' | '4' | '5' | '6' | '7'>num)
  }

  rolLabelByNumber(num: string) {
    return getRolLabel(<'1' | '2' | '3' | '4' | '5'>num)
  }

  rolTypeByNumber(num: string) {
    return getRolType(<'1' | '2' | '3' | '4' | '5'>num)
  }



}
