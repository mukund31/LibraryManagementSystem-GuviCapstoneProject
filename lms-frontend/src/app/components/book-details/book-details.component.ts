import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'] // Corrected from styleUrl to styleUrls
})
export class BookDetailsComponent implements OnInit {

  book: Book | undefined;
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id'); // Retrieve 'id' from the route
    if (bookId) {
      this.bookService.getBookById(bookId).subscribe(
        (data) => {
          this.book = data; // Set book data when successful
        },
        (error) => {
          this.errorMessage = 'Book not found or an error occurred'; // Handle error
          console.error('Error fetching book details:', error);
        }
      );
    }
  }

}
