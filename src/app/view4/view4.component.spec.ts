import { ComponentFixture, TestBed } from '@angular/core/testing';

import { View4Component } from './view2.component';

describe('View4Component', () => {
  let component: View4Component;
  let fixture: ComponentFixture<View4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [View4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(View4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
