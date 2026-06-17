import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarUsuarios } from './criar-usuarios';

describe('CriarUsuarios', () => {
  let component: CriarUsuarios;
  let fixture: ComponentFixture<CriarUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarUsuarios],
    }).compileComponents();

    fixture = TestBed.createComponent(CriarUsuarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
