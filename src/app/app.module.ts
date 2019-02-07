import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginRegisterPage } from '../pages/login-register/login-register';
import { ProfilePage } from '../pages/profile/profile';
import { MenuPage } from '../pages/menu/menu';
import { MediaProvider } from '../providers/media/media';
import { RegisterPage } from '../pages/register/register';
import { PipesModule } from '../pipes/pipes.module';
import { UploadPage } from '../pages/upload/upload';
import { Chooser } from '@ionic-native/chooser';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginRegisterPage,
    ProfilePage,
    MenuPage,
    RegisterPage,
    UploadPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PipesModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginRegisterPage,
    ProfilePage,
    MenuPage,
    RegisterPage,
    UploadPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MediaProvider,
    Chooser,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MediaProvider,
  ],
})
export class AppModule {
}
