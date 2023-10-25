import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule} from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatToolbarModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatListModule,
        MatIconModule,
        MatSlideToggleModule,
        MatInputModule
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatToolbarModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatListModule,
        MatIconModule,
        MatSlideToggleModule,
        MatInputModule
    ],
})

export class MaterialModule {

}