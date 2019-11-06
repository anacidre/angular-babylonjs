import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BabylonComponent } from './babylon-component/babylon.component'

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, BabylonComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
