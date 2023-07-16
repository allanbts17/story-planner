import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObjectPage } from './object.page';

describe('ObjectPage', () => {
  let component: ObjectPage;
  let fixture: ComponentFixture<ObjectPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ObjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
