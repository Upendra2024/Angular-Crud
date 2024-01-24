import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{
   loginForm!: FormGroup;
  // submitted=false
   Regex = /^(?=[^a-z]*[a-z])(?=.*[$@$!%*?&])(?=[^A-Z]*[A-Z]).{6,12}$/;
   nameaRegex = /[^\s\\]/;
  usersForm!:FormGroup
  
  constructor(private formbuilder: FormBuilder, private router: Router) {
    this.initializeForm()

  }
 

  private initializeForm() {
    this.loginForm = this.formbuilder.group({
      username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10),Validators.pattern(this.nameaRegex)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern(this.Regex)]]
    })
  }
  ngOnInit(): void {
  }

  onSubmit() {
    // this.submitted = true;
    if (this.loginForm.valid) {
      // this.router.navigate(['delete-popup']);
      console.log(this.loginForm.value);
    }
  }
  resetForm(){
    this.loginForm.reset()
  }

}
