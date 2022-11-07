import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

checked=false;
user!: SocialUser;
loggedIn!: boolean;
originalPath!:string;

constructor(private authService: SocialAuthService,
  private router:Router) {
    this.user = JSON.parse(localStorage.getItem('user')!);
    if(this.user){
      this.loggedIn = true;
      if(this.originalPath){
        this.router.navigate([this.originalPath]);
        this.originalPath='';
      }else{
        this.router.navigate(['']);
      }
    }else{

    this.authService.authState.subscribe((user) => {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user))
        this.loggedIn = (user != null);
        if(this.loggedIn){
          if(this.originalPath){
            this.router.navigate([this.originalPath]);
            this.originalPath='';
          }else
            this.router.navigate(['']);
        }else{
          this.router.navigate(['/login']);
        }
      });
  }
 }
isAuth():boolean{
  return this.loggedIn;
}
async refreshToken(): Promise<void> {
  return this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
}
/*
async signInWithGoogle():Promise<SocialUser> {
  return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
}*/
async signOut(): Promise<void> {
  return await this.authService.signOut();
}
}
