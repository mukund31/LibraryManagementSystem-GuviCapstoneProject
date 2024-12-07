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
import { AdminDashboardService } from './services/admin-dashboard.service';
import { BookListComponent } from './components/book-list/book-list.component';
import { BorrowerListComponent } from './components/borrower-list/borrower-list.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    BookCatalogComponentComponent,
    BookListComponent,
    BorrowerListComponent,
    NavBarComponent,
    FooterComponent
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
