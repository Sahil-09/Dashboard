import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Appservice } from '../app.service';

export interface USER {
  _id:string;
  Name: string;
  Email: string;
  Phone: number;
  Password:string;
  Address: string;
  Role:string;
  Gender:string;
  __v: number;
}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit {


  updateform=new FormGroup({
    Name:new FormControl(null,Validators.required),
    Email:new FormControl(null,[Validators.required,Validators.email]),
    Phone:new FormControl(null,[Validators.required]),
    Password:new FormControl(null,Validators.required),
    Gender:new FormControl(null,Validators.required),
    Cpassword:new FormControl(null,Validators.required),
    Role:new FormControl(null,[Validators.required]),
    Address:new FormControl(null,Validators.required),
    id:new FormControl(null,Validators.required)
  })

  constructor(private Serv:Appservice,private router:Router) { }

  USER_DATA: USER[] = []
  CURRENT_USER:USER[]=[]
  switch:boolean=false;
  editmode:boolean=false;
  ferr:boolean=false

  success:string | undefined;
  error:string | undefined;

  index:number=-1;
  count:number=0;
  profileedit:boolean=false
  displayedColumns: string[] = ['SR','Name', 'Email', 'Phone','Role','Gender','edit','delete'];
  dataSource=new MatTableDataSource(this.USER_DATA);

  ngOnInit(){

    this.Serv.getusers().subscribe((users)=>{
      this.CURRENT_USER.push(...users.current)
      this.dataSource.data=users.users
    })
  }

  

  Adminac(){
    this.count+=1
    if(this.count>=4){
      this.updateform.patchValue({Role:"Admin"})
    }
  }

  edit(i:number,ad:string){
    console.log(i)
    this.editmode=true
    this.switch=true
    
    if(ad=="edit"){
      this.index=i
      this.updateform.patchValue({
        Name:this.dataSource.data[i].Name,
        Email:this.dataSource.data[i].Email,
        Phone:this.dataSource.data[i].Phone,
        Gender:this.dataSource.data[i].Gender,
        Role:this.dataSource.data[i].Role,
        Address:this.dataSource.data[i].Address,
        id:this.dataSource.data[i]._id
      })
    }else{
      this.profileedit=true
      this.index=this.dataSource.data.findIndex((v,ind)=>
        v.Email === this.CURRENT_USER[0].Email
      )
      this.updateform.patchValue({
        Name:this.CURRENT_USER[i].Name,
        Email:this.CURRENT_USER[i].Email,
        Phone:this.CURRENT_USER[i].Phone,
        Gender:this.CURRENT_USER[i].Gender,
        Role:this.CURRENT_USER[i].Role,
        Address:this.CURRENT_USER[i].Address,
        id:this.CURRENT_USER[i]._id
      })
    }
    
  }

  toggle(){
    this.switch=!this.switch;
    this.ferr=false
    this.updateform.reset()
  }

  get f(){ 
    return this.updateform.controls; 
  }

  get form(){
    return this.updateform
  }

  submit(form:FormGroup){
    if(this.updateform.valid){
      this.ferr=false
    if(this.editmode){
      console.log(this.index)
      this.Serv.update(form.value).subscribe(result=>{
        if(this.editmode){
          this.CURRENT_USER[0]=form.value
        }
        this.dataSource.data[this.index]=form.value
        this.dataSource.data=this.dataSource.data
        this.index=-1
        this.switch=false
        this.editmode=false
        if(result.result){
          this.success=result.result
          setTimeout(()=>{
            document.getElementById("alert")?.classList.add("close")
          },2000)
          setTimeout(()=>{
            document.getElementById("alert")?.classList.remove("close")
            document.getElementById("alert")?.classList.remove("success")
            this.success=undefined
          },2010)
        }
        if(result.error){
          this.error=result.error
          setTimeout(()=>{
            document.getElementById("alert")?.classList.add("close");
          },2000)
          setTimeout(()=>{
            document.getElementById("alert")?.classList.remove("close");
            document.getElementById("alert")?.classList.remove("error");
            this.error=undefined
          },2010)
        }
        this.updateform.reset()
      })
    }else{
      this.Serv.signup(form.value).subscribe((result=>{
        this.Serv.getusers().subscribe((users)=>{
          console.log(users)
          this.CURRENT_USER.push(...users.current)
          this.dataSource.data=users.users
          this.updateform.reset()
          this.switch=false
          if(result.result){
            this.success=result.result
            setTimeout(()=>{
              document.getElementById("alert")?.classList.add("close")
            },2000)
            setTimeout(()=>{
              document.getElementById("alert")?.classList.remove("close")
              document.getElementById("alert")?.classList.remove("success")
              this.success=undefined
            },2010)
          }
          if(result.error){
            this.error=result.error
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
      }))
    }
  }else{
    this.ferr=true
  }
    console.log(form.value)
  }

  delete(i:number,id:string){
    this.Serv.delete(id).subscribe(data=>{
      this.dataSource.data.splice(i,1);
      this.dataSource.data=this.dataSource.data
      console.log(this.dataSource.data)
    })
    
  }

  logout(){
    this.Serv.logout()
    this.router.navigate(['/'])
  }
}





