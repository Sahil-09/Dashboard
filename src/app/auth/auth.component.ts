import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Event, Router } from '@angular/router';
import { Appservice } from '../app.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router:Router,private serv:Appservice) { }
  islogin:boolean=true;
  admin:boolean=false;
  count:number=0;

  success:string | undefined
  error:string | undefined

  signupform=new FormGroup({
    Name:new FormControl(null,Validators.required),
    Email:new FormControl(null,[Validators.required,Validators.email]),
    Phone:new FormControl(null,[Validators.required,Validators.minLength(10)]),
    Password:new FormControl(null,Validators.required),
    Cpassword:new FormControl(null,Validators.required),
    Gender:new FormControl(null,Validators.required),
    Address:new FormControl(null,Validators.required),
    Role:new FormControl("User",Validators.required)
  })

  loginform=new FormGroup({
    Email:new FormControl(null,Validators.required),
    Password:new FormControl(null,Validators.required)
  })

  ngOnInit(){
    
  }

  switch(){

    this.islogin=!this.islogin
  }

  Adminac(){
    this.count+=1
    if(this.count>=4){
      this.signupform.patchValue({Role:"Admin"})
      console.log(this.count)
    }
  }

  

  signup(form:FormGroup){
    this.serv.signup(form.value).subscribe(data=>{
      this.signupform.reset()
      console.log(data)
      this.islogin=true
      if(data.result){
        this.success=data.result
        setTimeout(()=>{
          document.getElementById("alert")?.classList.add("close")
        },2000)
        setTimeout(()=>{
          document.getElementById("alert")?.classList.remove("close")
          document.getElementById("alert")?.classList.remove("success")
          this.success=undefined
        },2010)
      }
      if(data.error){
        this.error=data.error
        setTimeout(()=>{
          document.getElementById("alert")?.classList.add("close");
        },2000)
        setTimeout(()=>{
          document.getElementById("alert")?.classList.remove("close");
          document.getElementById("alert")?.classList.remove("error");
          this.error=undefined
        },2010)
      }
      
    })
  }

  Login(form:FormGroup){
    console.log(form.value)
    this.serv.login(form.value).subscribe(data=>{
      this.router.navigate(["dashboard"])
      console.log(data)
    })
  }


  get f(){
    if(!this.islogin) {
      return this.signupform.controls; 
    }else{
      return this.loginform.controls;
    }
  }

  get form(){
    if(!this.islogin) {
      return this.signupform 
    }else{
      return this.loginform
    }
  }

  
}
