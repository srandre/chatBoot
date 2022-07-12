import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatTabsModule } from '@angular/material/tabs'
import { MatButtonModule } from '@angular/material/button'
import { MatBadgeModule } from '@angular/material/badge';

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
        MatTabsModule,
        MatButtonModule,
        MatBadgeModule
    ]
})
export class InterfaceModule { }
