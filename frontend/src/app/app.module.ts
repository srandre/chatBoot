import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './interface/sidebar/sidebar.component';
import { ChatBoxComponent } from './interface/chat-box/chat-box.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ChatBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
