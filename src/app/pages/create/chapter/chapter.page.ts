import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormRecord, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Collections } from 'src/app/shared/enums/collections';
import { Chapter } from 'src/app/shared/interfaces/chapter';
import { Story } from 'src/app/shared/interfaces/story';

type MyFormGroup = FormGroup<{
  title: FormControl<string|null>;
  storyId: FormControl<string|null>;
  order?: FormControl<number|null>;
  summary: FormControl<string|null>;
}>

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.page.html',
  styleUrls: ['./chapter.page.scss'],
})
export class ChapterPage implements OnInit {
  formGroup = new UntypedFormGroup({
    title: new FormControl('', Validators.required),
    storyId: new FormControl('', Validators.required),
    order: new FormControl(null, [Validators.required, this.usedOrder()]),
    summary: new FormControl('', Validators.required),
    //auxGenre: new FormControl(''),
  })
  chapterList!: Chapter[]
  storiesList!: Story[]
  edit = false
  resId!: string
  chapterOrderForEdit!: number

  constructor(private store: FirestoreService,
    private modal: ModalService,
    private nav: NavigateService
  ) {
    this.setData()

  }


  setData() {
    const editData: Chapter = this.nav.getParamById('editData')
    if (!editData) return;
    this.edit = true
    this.resId = <string>editData.id;
    this.formGroup.controls['title'].setValue(editData.title)
    this.formGroup.controls['storyId'].setValue(editData.storyId)
    this.formGroup.controls['order'].setValue(editData.order)
    this.formGroup.controls['summary'].setValue(editData.summary)
    this.chapterOrderForEdit = editData.order
  }

  async ngOnInit() {
    if(this.edit){
      this.modal.showLoading()
      let id = this.formGroup.controls['storyId'].value
      this.storiesList = (await this.store.getAllDocuments(Collections.STORY)) || []
      const story = <Story>this.storiesList.find(sty => sty.id == id)
      this.chapterList = <Chapter[]>(await this.store.getChaptersByStory(<string>story.id))
      this.modal.stopLoading()
      return
    }
    this.storiesList = (await this.store.getAllDocuments(Collections.STORY)) || []

  }

  async storySelected(ev: any) {
    let id = ev.detail.value
    const story = <Story>this.storiesList.find(sty => sty.id == id)
    console.log('enter',story);
    this.modal.showLoading()
    this.chapterList = <Chapter[]>(await this.store.getChaptersByStory(<string>story.id))
    this.formGroup.removeControl('order')
    this.formGroup.addControl('order',new FormControl(null,[Validators.required, this.usedOrder()]))

    //this.formGroup.removeControl<any>('order')
    // this.formGroup.controls.order.removeValidators([Validators.required, this.usedOrder()])
    // this.formGroup.controls.order.addValidators([Validators.required, this.usedOrder()])
    this.formGroup.updateValueAndValidity()
    this.modal.stopLoading()
  }

  usedOrder(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(this.edit && control.value == this.chapterOrderForEdit){
        return null
      }
      let usedOrder = this.chapterList?.find(chp => chp.order == control.value)
      return usedOrder ? { userdOrder: true } : null
    }
  }


  async saveChapter() {
    await this.modal.showLoading()
    try {
      const chapter: Chapter = {
        title: <string>this.formGroup.controls['title'].value,
        storyId: <string>this.formGroup.controls['storyId'].value,
        summary: <string>this.formGroup.controls['summary'].value,
        order: <number><unknown>this.formGroup.controls['order'].value,
      }
      if (this.edit) chapter.id = this.resId
      await this.store.setDocument(Collections.CHAPTER, chapter)
      const story = await this.store.getDocument(Collections.STORY, chapter.storyId)
      this.nav.navigate('view-resources', { resourceType: 'story', resource: story })
    } catch (err) {
      console.log(err);
    }
    await this.modal.stopLoading()
  }

}
