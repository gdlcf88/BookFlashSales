import { AuthService } from '@abp/ng.core';
import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService, RegisterDto } from '@proxy/volo/abp/account';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {
  validateForm: FormGroup;
  inProgress = false;
  constructor(protected injector: Injector,private fb: FormBuilder,private _router: Router, private _account: AccountService, 
    private _snackBar: MatSnackBar, private authService: AuthService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{11}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{6,}$')]],
      rememberMe: [false],
    });
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      this.inProgress = true;
      const redirectUrl = '/pay';
      const { username, password, rememberMe } = this.validateForm.value;
      this.authService
        .login({ username, password, rememberMe, redirectUrl })
        .pipe(
          catchError(err => {
            this._snackBar.open(err.error?.error_description ||
              err.error?.error.message ||
              'AbpAccount::DefaultErrorMessage');
            return throwError(err);
          }),
          finalize(() => (this.inProgress = false)),
        )
        .subscribe();
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
