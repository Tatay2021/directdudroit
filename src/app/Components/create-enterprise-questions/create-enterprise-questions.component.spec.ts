import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEnterpriseQuestionsComponent } from './create-enterprise-questions.component';

describe('CreateEnterpriseQuestionsComponent', () => {
  let component: CreateEnterpriseQuestionsComponent;
  let fixture: ComponentFixture<CreateEnterpriseQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEnterpriseQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEnterpriseQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
