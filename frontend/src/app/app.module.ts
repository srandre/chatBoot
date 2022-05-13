import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './interface/sidebar/sidebar.component';
import { ChatBoxComponent } from './interface/chat-box/chat-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterfaceModule } from './interface/interface.module';
import { ChatMiniatureComponent } from './interface/sidebar/chat-miniature/chat-miniature.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
        ChatBoxComponent,
        ChatMiniatureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InterfaceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
