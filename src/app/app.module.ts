// core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

// Primeng components
import { TabMenuModule } from 'primeng/tabmenu';

// Developed components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginRegisterComponent } from './home/login-register/login-register.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginRegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),

    TabMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
