import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCatalogComponentComponent } from './book-catalog-component.component';

describe('BookCatalogComponentComponent', () => {
  let component: BookCatalogComponentComponent;
  let fixture: ComponentFixture<BookCatalogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCatalogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCatalogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
