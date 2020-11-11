import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MsalModule, MsalInterceptor } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    AppRoutingModule,
    MsalModule.forRoot({
      auth: {
        clientId: 'ad6030ce-f101-42cf-9c0b-fdcb979b4cef', // This is your client ID
        authority: 'https://login.microsoftonline.com/c29e3fa8-132e-45d5-b9b5-d16ef9ae69cd', // This is your tenant ID
        redirectUri: 'http://localhost:4200',
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // set to true for IE 11
      },
    },
      {
        popUp: !isIE,
        consentScopes: [
          'user.read',
          'openid',
          'profile',
        ],
        unprotectedResources: [],
        protectedResourceMap: [
          ['https://graph.microsoft.com/v1.0/me', ['user.read']]
        ],
        extraQueryParameters: {}
      })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
