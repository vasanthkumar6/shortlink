import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountactivationComponent } from './accountactivation/accountactivation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { PasswordchangeComponent } from './passwordchange/passwordchange.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [ { path: "",redirectTo:"login",pathMatch:"full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "activate/:token", component: AccountactivationComponent},
  { path: "login/forgotpassword", component: ForgotpasswordComponent },
  { path: "passwordchange/:token", component: PasswordchangeComponent },
  { path: "dashboard", component: DashboardComponent },
]
  

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
