import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiMenu } from './ui-menu.component';

describe('UiMenu', () => {
  let component: UiMenu;
  let fixture: ComponentFixture<UiMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
