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

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.book.coverImageBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  
  onSubmit(): void {
    this.bookService.addBook(this.book).subscribe(
      (response) => {
        // console.log('Response from server:', response);
        this.successMessage = 'Book added successfully!';
        this.book = {
          title: '',
          author: '',
          genre: '',
          publicationYear: new Date().getFullYear(),
          isbn: '',
          copiesAvailable: 1,
          location: '',
          coverImageBase64: ''
        };
        setTimeout(() => {
          this.successMessage = null;
        }, 2000);
      },
      (error) => {
        console.error('Error adding book:', error);
        this.errorMessage = 'Error adding book.';
        this.successMessage = null;
      }
    );
  }
}
