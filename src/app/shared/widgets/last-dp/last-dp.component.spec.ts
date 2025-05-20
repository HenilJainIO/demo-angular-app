import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastDpComponent } from './last-dp.component';

describe('LastDpComponent', () => {
  let component: LastDpComponent;
  let fixture: ComponentFixture<LastDpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LastDpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastDpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
