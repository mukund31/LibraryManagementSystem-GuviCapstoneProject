import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { BookCatalogComponentComponent } from './components/book-catalog-component/book-catalog-component.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BorrowerListComponent } from './components/borrower-list/borrower-list.component';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'books', component: BookCatalogComponentComponent },
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [RoleGuard], data: {role: 'ROLE_User'}},
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [RoleGuard], data: {role: 'ROLE_Admin'}},
  { path: 'borrower-list', component: BorrowerListComponent, canActivate: [RoleGuard], data: {role: 'ROLE_Admin'}},
  { path: 'books-list', component: BookListComponent, canActivate: [RoleGuard], data: {role: 'ROLE_Admin'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
