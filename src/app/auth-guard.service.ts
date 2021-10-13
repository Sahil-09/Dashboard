import { Injectable } from "@angular/core";
import { ActivatedRoute, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Appservice } from "./app.service";


@Injectable({
    providedIn:"root"
})

export class Authguard implements CanActivate{

    constructor(private serv:Appservice ,private router:Router){}

   canActivate(){
        this.serv.isauthenticate().then(data=>{
            if(!data){
                this.router.navigate(['/'])
            }
        })
        return true
   }
}