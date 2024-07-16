import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
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
import { AddCongeComponent } from './add-conge/add-conge.component';
import { AddSalaireComponent } from './add-salaire/add-salaire.component';
import { ListSalaireComponent } from './list-salaire/list-salaire.component';
import { CongeListComponent } from './conge-list/conge-list.component';
import { SalaireDetailsComponent } from './salaire-details/salaire-details.component';
import { DemandeCongeComponent } from './demande-conge/demande-conge.component';
import { DetailsCongeComponent } from './details-conge/details-conge.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    EmailVerificationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AddCongeComponent,
    AddSalaireComponent,
    ListSalaireComponent,
    CongeListComponent,
    SalaireDetailsComponent,
    DemandeCongeComponent,
    DetailsCongeComponent,
    DashboardComponent
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
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
