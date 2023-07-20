import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-segment',
  templateUrl: './view-segment.component.html',
  styleUrls: ['./view-segment.component.scss'],
})
export class ViewSegmentComponent  implements OnInit {
  @Input() title!: string
  @Input() data!: string|null
  @Input() horizontal = true

  constructor() { }

  ngOnInit() {}

}
