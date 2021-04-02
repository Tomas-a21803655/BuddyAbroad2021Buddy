import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CreatePageRoutingModule} from './create-routing.module';

import {CreatePage} from './create.page';
import {FileSizeFormatPipe} from './file-size-format.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreatePageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [CreatePage, FileSizeFormatPipe
    ]
})
export class CreatePageModule {
}
