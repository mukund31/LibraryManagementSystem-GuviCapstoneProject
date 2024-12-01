import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-edit-book',
  templateUrl: './admin-edit-book.component.html',
  styleUrl: './admin-edit-book.component.scss'
})
export class AdminEditBookComponent implements OnInit {
  book: Book = { bookId: '', title: '', author: '', genre: '', publicationYear: 0, isbn: '', copiesAvailable: 0, location: '' };

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.paramMap.get('id');
    if (bookId) {
      this.bookService.getBookById(bookId).subscribe(
        (book: Book) => {
          this.book = book;
        },
        (error) => {
          console.error('Error fetching book details:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.book.bookId) {
      this.bookService.updateBook(this.book.bookId, this.book).subscribe(
        (updatedBook) => {
          console.log('Book updated successfully:', updatedBook);
          this.router.navigate(['/books-list']);
        },
        (error) => {
          console.error('Error updating book:', error);
        }
      );
    }
  }
}
