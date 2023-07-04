import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenRoutingModule } from './token-routing.module';
import { TokenComponent } from './token.component';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';

@NgModule({
    declarations: [TokenComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TokenRoutingModule,
    ],
})
export class TokenModule {}
