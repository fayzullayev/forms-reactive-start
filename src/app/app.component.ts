import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;

  forbiddenUsersNames = ['Chris', 'Anna'];

  ngOnInit() {
    this.signupForm = new FormGroup<any>({
      userData: new FormGroup({
        username: new FormControl('', [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          '',
          [Validators.required, Validators.email],
          [this.forbiddenEmails]
        ),
      }),
      gender: new FormControl('female'),
      hobbies: new FormArray([]),
    });

    this.signupForm.statusChanges.subscribe((value) => {
      console.log(value);
    });

    this.signupForm.valueChanges.subscribe((value) => {
      console.log(value);
    });

    this.signupForm.setValue({
      userData: {
        username: 'Odil',
        email: 'test@test.com',
      },
      gender: 'female',
      hobbies: [],
    });

    this.signupForm.patchValue({
      userData: {
        email: 'test2@test.com',
      },
    });
  }

  submit() {
    console.log(this.signupForm.value);
    console.log(this.signupForm);
  }

  addHobby() {
    const control = new FormControl('', [Validators.required]);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsersNames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }
}
