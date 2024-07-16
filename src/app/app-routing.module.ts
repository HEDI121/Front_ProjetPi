import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { PresentationComponent } from "./pages/presentation/presentation.component";
import { EmailVerificationComponent } from "./email-verification/email-verification.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { AddCongeComponent } from "./add-conge/add-conge.component";
import { AddSalaireComponent } from "./add-salaire/add-salaire.component";
import { ListSalaireComponent } from "./list-salaire/list-salaire.component";
import { CongeListComponent } from "./conge-list/conge-list.component";
import { SalaireDetailsComponent } from "./salaire-details/salaire-details.component";
import { DemandeCongeComponent } from "./demande-conge/demande-conge.component";
import { DetailsCongeComponent } from "./details-conge/details-conge.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  { path: 'verify', component: EmailVerificationComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  
  {
    path: "",
    redirectTo: "/presentation",
    pathMatch: "full"
  },
  { path: 'add-salaire', component: AddSalaireComponent },
  {path: 'list-salaire', component: ListSalaireComponent},
  { path:'conge-list', component:CongeListComponent},
  { path: 'salaire/details/:id', component: SalaireDetailsComponent },
  {path:'demande-conge',component: DemandeCongeComponent},
  { path: 'conge/:id', component: DetailsCongeComponent}, 
  {path: 'dashbord',component: DashboardComponent},
  {
    path: "presentation",
    component: PresentationComponent
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "dashboards",
        loadChildren: () => import('./pages/dashboards/dashboards.module').then(m => m.DashboardsModule)

      },
      {
        path: "components",
        loadChildren: () => import('./pages/components/components.module').then(m => m.ComponentsModule)
      },
      {
        path: "forms",
        loadChildren: () => import('./pages/forms/forms.module').then(m => m.FormsModules)
      },
      {
        path: "tables",
        loadChildren: () => import('./pages/tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: "maps",
        loadChildren: () => import('./pages/maps/maps.module').then(m => m.MapsModule)
      },
      {
        path: "widgets",
        loadChildren: () => import('./pages/widgets/widgets.module').then(m => m.WidgetsModule)
      },
      {
        path: "charts",
        loadChildren: () => import('./pages/charts/charts.module').then(m => m.ChartsModule)
      },
      {
        path: "calendar",
        loadChildren: () => import('./pages/calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: "examples",
        loadChildren: () => import('./pages/examples/examples.module').then(m => m.ExamplesModule)
      }
    ]
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "examples",
        loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  },
  {
    path: "**",
    redirectTo: "dashboard"
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
