import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoleTrainingComponent } from './pole-training.component';

describe('PoleTrainingComponent', () => {
  let component: PoleTrainingComponent;
  let fixture: ComponentFixture<PoleTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoleTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoleTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
