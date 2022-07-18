// core modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Primeng components
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

// Developed components
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { RegisterFormComponent } from './register/registerForm/registerForm.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/loginForm/loginForm.component';
import { ProfileSetupComponent } from './profile/setup/profileSetup.component';
import { ServerErrorComponent } from './serverError/serverError.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'profile', 
    children: [
      { path: 'setup', component: ProfileSetupComponent }
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
    ServerErrorComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
