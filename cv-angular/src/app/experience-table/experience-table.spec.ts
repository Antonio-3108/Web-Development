import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceTable } from './experience-table';

describe('ExperienceTable', () => {
  let component: ExperienceTable;
  let fixture: ComponentFixture<ExperienceTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
