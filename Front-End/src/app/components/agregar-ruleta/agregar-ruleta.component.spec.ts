import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarRuletaComponent } from './agregar-ruleta.component';

describe('AgregarRuletaComponent', () => {
  let component: AgregarRuletaComponent;
  let fixture: ComponentFixture<AgregarRuletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarRuletaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarRuletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
