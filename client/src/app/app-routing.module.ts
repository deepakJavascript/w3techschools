import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guard/auth.guard';


import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {PostEditComponent} from './components/post-edit/post-edit.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'post', component: PostComponent },
  { path: 'post-list', component: PostListComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'post-edit/:id', component: PostEditComponent },
  { path: 'dashboard', component: DashboardComponent },
  
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  exports: [ RouterModule ],

  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule {}