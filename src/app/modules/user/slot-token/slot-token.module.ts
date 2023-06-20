import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SlotTokenRouting } from './slot-token-routing.module';
import { SlotTokenComponent } from './slot-token.component';


@NgModule({
    declarations: [SlotTokenComponent],
    imports: [CommonModule, RouterModule.forChild(SlotTokenRouting)],
})
export class SlotTokenModule {}
