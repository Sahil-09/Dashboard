import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Appservice } from "./app.service";


@Injectable({
    providedIn:"root"
})

export class AppInterceptor implements HttpInterceptor{
    
    constructor(private serv:Appservice){}

    intercept(req:HttpRequest<any>,next:HttpHandler){

        
        
        let token
        this.serv.token.subscribe(tok=>{
            token=tok
        })
        
        if(token){
            const modreq=req.clone({headers:new HttpHeaders().set("Auth",token)})
            return next.handle(modreq)
        }else{
            return next.handle(req)
        }
        
    }
}