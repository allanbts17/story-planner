import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewResourcesPage } from './view-resources.page';

describe('ViewResourcesPage', () => {
  let component: ViewResourcesPage;
  let fixture: ComponentFixture<ViewResourcesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewResourcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
