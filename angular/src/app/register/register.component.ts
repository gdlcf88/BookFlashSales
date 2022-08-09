import { AuthService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService, RegisterDto } from '@proxy/volo/abp/account';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  validateForm: FormGroup;
  constructor(private fb: FormBuilder,private _router: Router, private _account: AccountService, 
    private _snackBar: MatSnackBar, private authService: AuthService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      phone: [null, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{11}$')]],
      email: [null],
      userName: [null],
      wishes: [null],
      name: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&].{6,}$')]],
      address: [null, [Validators.required]]
    });
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      let data : RegisterDto = {
        appName: 'pc',
        password: this.validateForm.value.password,
        emailAddress: this.validateForm.value.phone + '@qq.com',
        userName: this.validateForm.value.phone,
        extraProperties: {
          'phone': this.validateForm.value.phone,
          'name': this.validateForm.value.name,
          'wishes': this.validateForm.value.wishes,
          'address':  this.validateForm.value.address
        }
      };
      this._account.register(data).subscribe(res=>{
        this._snackBar.open('注册成功!','关闭',{
          duration: 2000
        });
        this.jumpRouter('/login');
      }, err=>{

      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAllAsTouched();
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  jumpRouter(url: string){
    this._router.navigateByUrl(url);
  }
}
