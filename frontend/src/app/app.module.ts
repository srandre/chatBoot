import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './interface/sidebar/sidebar.component';
import { ChatBoxComponent } from './interface/chat-box/chat-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterfaceModule } from './interface/interface.module';
import { ChatMiniatureComponent } from './interface/sidebar/chat-miniature/chat-miniature.component';
import { HttpClientModule } from '@angular/common/http';

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
        InterfaceModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
