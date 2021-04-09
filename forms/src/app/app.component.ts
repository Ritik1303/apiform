import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private fb: FormBuilder, private commonService: CommonService) { }
  registrationform!: FormGroup;
  alluser: any;
  isEdit=false;
  userObj = {
    firstname: "",
    lastname: "",
    username:"",
    mobile:"",
    email:"",
    city:"",
    state:"",
    country:"",
  }
  get firstname() {
    return this.registrationform.get('firstname');
  }
  get email() {
    return this.registrationform.get('email');
  }
  get alternateemail() {
    return this.registrationform.get('alternateemail') as FormArray;
  }
  get alternatemobile() {
    return this.registrationform.get('alternatemobile') as FormArray;
  }
  get lastname() {
    return this.registrationform.get('lastname');
  }
  get username() {
    return this.registrationform.get('username');
  }
  get mobile() {
    return this.registrationform.get('mobile');
  }




  addalternateemail() {
    this.alternateemail.push(this.fb.control(''));
  }
  addalternatemobile() {
    this.alternatemobile.push(this.fb.control(''));
  }


 
  addUser(formobj: object) {
    console.log("adduser")
    console.log(formobj)
    this.commonService.createuser(formobj).subscribe((response) => {
      window.alert("User Has been added.")
      this.getlatestuser();
      this.registrationform.patchValue({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        country: '',
        mobile:'',
        city:'',
        state:'',
        id:'',
      });
    })
    location.reload()
  }
  getlatestuser() {
    this.commonService.getuser().subscribe((response) => {
      this.alluser = response
    })
  }
  edituser(user: { firstname: string; lastname: string; username: string; mobile: string; email: string; city: string; state: string; country: string; id: string; }) { 
    this.userObj=user;
    this.isEdit=true;
  }
  updateuser(){
    this.isEdit=!this.isEdit;
    this.commonService.updateuser(this.userObj).subscribe(()=>{
      this.getlatestuser();
    })
    
    
    location.reload()
  }

  deleteuser(user: any) {
    this.commonService.deleteuser(user).subscribe(() => {
      this.getlatestuser();
    })
  }
  ngOnInit() {
    this.getlatestuser()
    this.registrationform = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.minLength(10)]],


      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
    
      alternateemail: this.fb.array([]),
      alternatemobile: this.fb.array([]),


    }, {});
  }




  title = 'Form';
  // registrationform= new FormGroup({
  //   firstname: new FormControl('Ritik'),
  //   lastname: new FormControl(''),
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  //   conpassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     country: new FormControl('')
  //   })
  // });
  
  onSubmit() {
    console.log(this.registrationform.value);
  }
}
