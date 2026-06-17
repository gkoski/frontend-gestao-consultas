import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessaoExpirada } from './sessao-expirada';

describe('SessaoExpirada', () => {
  let component: SessaoExpirada;
  let fixture: ComponentFixture<SessaoExpirada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessaoExpirada],
    }).compileComponents();

    fixture = TestBed.createComponent(SessaoExpirada);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
