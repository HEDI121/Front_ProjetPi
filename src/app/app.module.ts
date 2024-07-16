import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ToastrModule } from "ngx-toastr";
import { TagInputModule } from "ngx-chips";
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { PresentationModule } from "./pages/presentation/presentation.module";

import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from "./components/components.module";

import { AppRoutingModule } from './app-routing.module';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component'; 
import { SidebarAdminComponent } from "./sidebar-admin/sidebar-admin.component";
import { AuthInterceptorService } from "./services/jwt-interceptor.service";
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UploadProfileImageComponent } from './upload-profile-image-component/upload-profile-image-component.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    EmailVerificationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardAdminComponent,
    SidebarAdminComponent,
    AddUserComponent,
    UpdateUserComponent,
    UploadProfileImageComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ComponentsModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    TagInputModule,
    PresentationModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
