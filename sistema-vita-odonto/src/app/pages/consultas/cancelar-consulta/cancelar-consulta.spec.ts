import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarConsulta } from './cancelar-consulta';

describe('CancelarConsulta', () => {
  let component: CancelarConsulta;
  let fixture: ComponentFixture<CancelarConsulta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelarConsulta],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelarConsulta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
