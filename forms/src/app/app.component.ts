import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  registrationform!: FormGroup;
  get firstname(){
    return this.registrationform.get('firstname');
  }
  get email(){
    return this.registrationform.get('email');
  }
  get alternateemail(){
    return this.registrationform.get('alternateemail') as FormArray;
  }
  get alternatemobile(){
    return this.registrationform.get('alternatemobile') as FormArray;
  }
  get lastname(){
    return this.registrationform.get('lastname');
  }
  get username(){
    return this.registrationform.get('username');
  }
  get mobile(){
    return this.registrationform.get('mobile');
  }

 


  addalternateemail(){
    this.alternateemail.push(this.fb.control(''));
  }
  addalternatemobile(){
    this.alternatemobile.push(this.fb.control(''));
  }


  constructor(private fb:FormBuilder){}
  ngOnInit(){
    this.registrationform = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]], 
      lastname: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      subscribe: [false],
    
      address: this.fb.group({
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required]
      }),
      alternateemail: this.fb.array([]),
      alternatemobile: this.fb.array([]),
      
      
    },{} );
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
  load(){
    this.registrationform.patchValue({
      firstname: 'Ritik',
      lastname: 'Mrinal',
      email:'ritik.mrinal007@gmail.com',
      username:'Ritik123',
      address:{
        country:'India'
      }
    });

  }
  onSubmit(){
    console.log(this.registrationform.value);
  }
}
 