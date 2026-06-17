import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarDentistas } from './criar-dentistas';

describe('CriarDentistas', () => {
  let component: CriarDentistas;
  let fixture: ComponentFixture<CriarDentistas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarDentistas],
    }).compileComponents();

    fixture = TestBed.createComponent(CriarDentistas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
