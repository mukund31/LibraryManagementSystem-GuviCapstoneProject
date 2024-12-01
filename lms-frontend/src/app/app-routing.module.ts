import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { BookCatalogComponentComponent } from './components/book-catalog-component/book-catalog-component.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { AdminEditBookComponent } from './components/admin-edit-book/admin-edit-book.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-dashboard', component: UserDashboardComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent},
  { path: 'books', component: BookCatalogComponentComponent },
  { path: 'books/:id', component: BookDetailsComponent },
  { path: 'admin/add-book', component: AddBookComponent },
  { path: 'books-list', component: BookListComponent },
  { path: 'edit-book/:id', component: AdminEditBookComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
