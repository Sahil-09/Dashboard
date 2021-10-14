import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BehaviorSubject, Subject } from "rxjs"
import {tap} from "rxjs/operators"



@Injectable({
    providedIn:"root"
})
export class Appservice{

    token=new BehaviorSubject<string | null>(null)

    constructor(private http:HttpClient){}


    isauthenticate(){
        let islogin=new Promise((resolve,reject)=>{
            this.token.subscribe((data)=>{
                console.log(data)
                resolve(data)
            })
        })
        return islogin
    }

    delete(id:string){
        return this.http.delete("http://localhost:3000/delete/"+id)
    }

    login(data:any){
        return this.http.post<{token:any}>("http://localhost:3000/login",data).pipe(tap(token=>{
            localStorage.setItem("token",token.token)
            this.token.next(token.token)
        }))
    }

    signup(data:any){
       return this.http.post<{result:string,error:string}>("http://localhost:3000/signup",data)
    }

    getusers(){
        return this.http.get<{users:USER[],current:USER[]}>("http://localhost:3000/users")
    }

    update(data:any){
        return this.http.put<{result:string,error:string}>("http://localhost:3000/update",data)
    }

    logout(){
        this.token.next(null);
        localStorage.removeItem("token")
    }

    autologin(){
        let token:null | string=localStorage.getItem("token")
        this.token.next(token)
    }
}

export interface USER {
    _id:string;
    Name: string;
    Email: string;
    Phone: number;
    Password:string;
    Address: string;
    Role:string;
    Gender:string;
    __v: number
  }