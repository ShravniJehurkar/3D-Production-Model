import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineBuilderComponent } from './line-builder';

describe('LineBuilderComponent', () => {
  let component: LineBuilderComponent;
  let fixture: ComponentFixture<LineBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineBuilderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LineBuilderComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});