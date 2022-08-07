import { AbpApplicationConfigurationService, AuthService, ConfigStateService, CurrentUserDto, LocalizationService, NAVIGATE_TO_MANAGE_PROFILE, SessionStateService } from '@abp/ng.core';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <div>
      <router-outlet></router-outlet> 
    </div>
  `,
})
export class AppComponent {
  currentUser$: Observable<CurrentUserDto> = this.configState.getOne$('currentUser');
  constructor(
    @Inject(NAVIGATE_TO_MANAGE_PROFILE) public navigateToManageProfile,
    private configState: ConfigStateService, 
    private _router: Router, private oAuthService: AuthService, private sessionState: SessionStateService){
    this.sessionState.setLanguage('zh-Hans');
    this.currentUser$.subscribe((res)=>{
      if (!res.isAuthenticated) {
        this.jumpRouter('/login');
      } else {
        this.jumpRouter('/pay');
      }
    })
  }
  jumpRouter(url: string){
    this._router.navigateByUrl(url);
  }
}
