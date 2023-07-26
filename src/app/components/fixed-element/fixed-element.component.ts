import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-fixed-element',
  templateUrl: './fixed-element.component.html',
  styleUrls: ['./fixed-element.component.scss'],
})
export class FixedElementComponent  implements OnInit {
  targetID: string;
  backgroundID: string
  constructor(private utils: UtilsService) {
    this.targetID = "target-"+utils.makeId(5)
    this.backgroundID = "background-"+utils.makeId(5)
   }

  async ngOnInit() {
    let container = <HTMLElement>(await this.utils.getElementById(this.targetID))
    let target = <HTMLElement>container.childNodes[0]
    let fixedElement = <HTMLElement>target.parentElement?.parentElement
    let background = document.createElement("div")
    background.id = this.backgroundID
    background.classList.add('w-full')
    
    fixedElement.insertAdjacentHTML('afterend',`<div style="height: ${target.clientHeight}px;" class="w-full"></div>`)

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      
      container.classList.add('dark')
      console.log('here',container.classList,container);
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      const newColorScheme = event.matches ? "dark" : "light";
      if (event.matches) {
        container.classList.add('dark')
      } else {
        container.classList.remove('dark')
      }
      console.log('change', newColorScheme);
    });
  }

}
