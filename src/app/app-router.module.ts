import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Authguard } from "./auth-guard.service";
import { AuthComponent } from "./auth/auth.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const Approute:Routes=[
    {path:"",component:AuthComponent},
    {path:"dashboard",component:DashboardComponent,canActivate:[Authguard]}
]

@NgModule({
    imports:[RouterModule.forRoot(Approute)],
    exports:[RouterModule]
})



export class ApproutingModule{}