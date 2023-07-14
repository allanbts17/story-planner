import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-story',
  templateUrl: './story.page.html',
  styleUrls: ['./story.page.scss'],
})
export class StoryPage implements OnInit {
  formGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    series: new FormControl(''),
    genre: new FormControl(<string[]>[], this.haveGenre()),
    auxGenre: new FormControl(''),
    synopsis: new FormControl('', Validators.required)
  })
  genreList: string[] = []
  constructor() { }

  ngOnInit() {
  }

  // Añadir imagen, opcional
  // Los datos son los generales, pero en un ver más o avanzados, saldría
  // capitulos, escenas, personajes, lugares, y muchas cosas que se pueden asignar. Serie debería se un select donde muestra las series existentes.

  addGenre() {
    if (this.formGroup.controls.auxGenre.value == '') return
    this.genreList.push(<string>this.formGroup.controls.auxGenre.value)
    this.formGroup.controls.auxGenre.setValue('')
    this.formGroup.controls.genre.setValue(this.genreList)

  }

  deleteGenre(genre: string) {
    this.genreList = this.genreList.filter(gre => gre !== genre)
    this.formGroup.controls.genre.setValue(this.genreList)

  }

  saveStory() {
    console.log('saved!');

  }

  haveGenre(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value?.length && control.value?.length > 0)
        return null
      else
        return { noGenre: true }
    }
  }

}
