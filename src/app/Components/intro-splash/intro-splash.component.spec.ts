import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroSplashComponent } from './intro-splash.component';

describe('IntroSplashComponent', () => {
  let component: IntroSplashComponent;
  let fixture: ComponentFixture<IntroSplashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroSplashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
