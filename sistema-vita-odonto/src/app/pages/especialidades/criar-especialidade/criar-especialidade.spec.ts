import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarEspecialidade } from './criar-especialidade';

describe('CriarEspecialidade', () => {
  let component: CriarEspecialidade;
  let fixture: ComponentFixture<CriarEspecialidade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarEspecialidade],
    }).compileComponents();

    fixture = TestBed.createComponent(CriarEspecialidade);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
