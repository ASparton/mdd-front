// core modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Primeng components
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';

// Developed components
import { AppComponent } from './app.component';
import { RootRedirectionComponent } from './rootRedirection.component';
import { RegisterComponent } from './register/register.component';
import { RegisterFormComponent } from './register/registerForm/registerForm.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/loginForm/loginForm.component';
import { ProfileSetupComponent } from './profileSetup/profileSetup.component';
import { HomeComponent } from './home/home.component';
import { AppMenuComponent } from './home/appMenu/appMenu.component';
import { AccountComponent } from './home/account/account.component';
import { FeedComponent } from './home/feed/feed.component';
import { DiaryComponent } from './home/diary/diary.component';
import { FriendsComponent } from './home/friends/friends.component';
import { ServerErrorComponent } from './serverError/serverError.component';
import { TestComponent } from './test/test.component';

// Routes guards
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: RootRedirectionComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile-setup', component: ProfileSetupComponent, canActivate: [AuthGuard] },
  { 
    path: 'app',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'account', component: AccountComponent },
      { path: 'feed', component: FeedComponent },
      { path: 'diary', component: DiaryComponent },
      { path: 'friends', component: FriendsComponent },
    ]
  },
  { path: 'internal-server-error', component: ServerErrorComponent },
  { path: 'test', component: TestComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    RegisterFormComponent,
    LoginComponent,
    LoginFormComponent,
    ProfileSetupComponent,
    HomeComponent,
    AppMenuComponent,
    AccountComponent,
    FeedComponent,
    DiaryComponent,
    FriendsComponent,
    FeedComponent,
    ServerErrorComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule,
    ButtonModule,
    BadgeModule,
    TooltipModule,
    MenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
