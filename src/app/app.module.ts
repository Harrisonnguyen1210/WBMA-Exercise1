import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginRegisterPage } from '../pages/login-register/login-register';
import { LogoutPage } from '../pages/logout/logout';
import { MenuPage } from '../pages/menu/menu';
import { MediaProvider } from '../providers/media/media';
import { RegisterPage } from '../pages/register/register';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginRegisterPage,
    LogoutPage,
    MenuPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginRegisterPage,
    LogoutPage,
    MenuPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PhotoViewer,
    MediaProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MediaProvider,
  ],
})
export class AppModule {
}
