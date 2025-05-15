import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductShowcaseAngularComponent } from './product-showcase-angular/product-showcase-angular.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductShowcaseAngularComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  // This schema is required to use custom elements in Angular
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
