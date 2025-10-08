import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeetCode } from './leet-code';

describe('LeetCode', () => {
  let component: LeetCode;
  let fixture: ComponentFixture<LeetCode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeetCode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeetCode);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
