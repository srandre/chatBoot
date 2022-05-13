import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    exports: [MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatDividerModule,
    ]
})
export class InterfaceModule { }
