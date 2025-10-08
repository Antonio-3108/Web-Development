import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationTable } from './education-table';

describe('EducationTable', () => {
  let component: EducationTable;
  let fixture: ComponentFixture<EducationTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
