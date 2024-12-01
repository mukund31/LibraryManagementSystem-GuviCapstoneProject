import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { BookCatalogComponentComponent } from './components/book-catalog-component/book-catalog-component.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AdminDashboardService } from './services/admin-dashboard.service';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { AdminEditBookComponent } from './components/admin-edit-book/admin-edit-book.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    BookCatalogComponentComponent,
    BookDetailsComponent,
    AddBookComponent,
    BookListComponent,
    AdminEditBookComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AdminDashboardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
