import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
  book: Book = {
    // bookId: '',
    title: '',
    author: '',
    genre: '',
    publicationYear: new Date().getFullYear(),
    isbn: '',
    copiesAvailable: 1,
    location: ''
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private bookService: BookService) {}

  // onSubmit(): void {
  //   console.log(this.book);
  //   this.bookService.addBook(this.book).subscribe(
  //     (response) => {
  //       this.successMessage = 'Book added successfully!';
  //       this.book = {
  //         title: '',
  //         author: '',
  //         genre: '',
  //         publicationYear: new Date().getFullYear(),
  //         isbn: '',
  //         copiesAvailable: 1,
  //         location: ''
  //       };
  //     },
  //     (error) => {
  //       this.errorMessage = 'Error adding book.';
  //       this.successMessage = null;
  //       console.error('Error adding book:', error);
  //     }
  //   );
  // }
  onSubmit(): void {
    this.bookService.addBook(this.book).subscribe(
      (response) => {
        console.log('Response from server:', response); // Debugging line
        this.successMessage = 'Book added successfully!';
        this.book = {
          title: '',
          author: '',
          genre: '',
          publicationYear: new Date().getFullYear(),
          isbn: '',
          copiesAvailable: 1,
          location: ''
        };
      },
      (error) => {
        console.error('Error adding book:', error);
        this.errorMessage = 'Error adding book.';
        this.successMessage = null;
      }
    );
  }
  
}
