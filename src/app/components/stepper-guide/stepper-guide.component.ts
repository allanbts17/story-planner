import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from 'src/app/shared/interfaces/step';

@Component({
  selector: 'app-stepper-guide',
  templateUrl: './stepper-guide.component.html',
  styleUrls: ['./stepper-guide.component.scss'],
})
export class StepperGuideComponent implements OnInit {
  @Input() stepLabels!: string[]
  @Input() lineal = true
  @Output() stepSelectedEvent = new EventEmitter<Step>();
  steps: Step[] = []
  currentStep = 0
  selectedStep = 0
  constructor() { }

  ngOnInit() {
    let count = 0
    this.stepLabels.forEach(lbl => {
      this.steps.push({
        label: lbl,
        step: count,
        active: false,
        passed: !this.lineal
      })
      count++;
    })
    this.steps[0].active = true
    this.steps[0].passed = true

    // setInterval(()=> {
    //   this.next()
    // },500)
  }

  next() {
    if (this.currentStep == this.steps.length - 1) return
    if (this.currentStep > this.selectedStep) {
      this.selectedStep++
      this.steps.forEach(stp => {
        stp.active = stp.step == this.selectedStep
      })
      return
    }
    this.currentStep++;
    this.selectedStep = this.currentStep
    this.steps.forEach(stp => {
      stp.active = stp.step == this.currentStep
      if (this.lineal)
        stp.passed = (stp.step <= this.currentStep)
    })
    //  this.updateSteps()
  }

  // private updateSteps(){

  // }

  protected stepSelected(step: Step) {
    console.log('s', step, this.currentStep);
    if ((!step.passed || step.active) && this.lineal) return;
    this.currentStep = step.step
    this.steps.forEach(stp => { stp.active = false })
    let finded: Step = <Step>this.steps.find(stp => stp.step == step.step)//.active
    finded.active = true
    this.selectedStep = finded.step
    this.stepSelectedEvent.emit(step)
  }

}
