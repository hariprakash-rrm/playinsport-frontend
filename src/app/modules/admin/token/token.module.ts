import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TokenRoutingModule } from './token-routing.module';
import { TokenComponent } from './token.component';


@NgModule({
    declarations: [TokenComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule, // Import the FormsModule here
        TokenRoutingModule,
    ],
})
export class TokenModule {}
