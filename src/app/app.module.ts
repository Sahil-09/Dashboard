import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ HttpClientModule, HTTP_INTERCEPTORS }from "@angular/common/http"

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatFormFieldModule}from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button'
import {MatTableModule} from '@angular/material/table'
import {ApproutingModule} from './app-router.module';
import {ReactiveFormsModule} from "@angular/forms"
import { AppInterceptor } from './interceptor.service';




@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,HttpClientModule,
    MatTableModule,ReactiveFormsModule,
    ApproutingModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AppInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
