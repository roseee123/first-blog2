import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesComponent } from './articles/articles.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './edit/edit.component';
const routes: Routes = [
  { path: 'articles', component: ArticlesComponent },
  { path: 'edit', component: EditComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: ArticleDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
