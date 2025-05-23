import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutbolComponent } from './futbol.component';

describe('FutbolComponent', () => {
  let component: FutbolComponent;
  let fixture: ComponentFixture<FutbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutbolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
