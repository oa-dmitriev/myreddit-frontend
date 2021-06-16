import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { LoginComponent } from './login/login.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostItemDetailComponent } from './post-item-detail/post-item-detail.component';
import { PostItemComponent } from './post-item/post-item.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  {
    path: 'posts',
    component: PostComponent,
    children: [
      {
        path: '',
        component: PostListComponent,
      },
      {
        path: 'create',
        component: PostCreateComponent,
        pathMatch: 'full',
      },
      {
        path: 'category/create',
        component: CategoryCreateComponent,
        pathMatch: 'full',
      },
      { path: ':category', component: PostListComponent },
      { path: ':category/:id', component: PostItemDetailComponent },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
