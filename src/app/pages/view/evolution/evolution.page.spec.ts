import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EvolutionPage } from './evolution.page';

describe('EvolutionPage', () => {
  let component: EvolutionPage;
  let fixture: ComponentFixture<EvolutionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EvolutionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
