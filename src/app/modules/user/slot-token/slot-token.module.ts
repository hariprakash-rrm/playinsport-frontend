import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SlotTokenRouting } from './slot-token-routing.module';
import { SlotTokenComponent } from './slot-token.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectTokenComponent } from './components/select-token/select-token.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
@NgModule({
    declarations: [SlotTokenComponent, SelectTokenComponent],
    imports: [CommonModule, RouterModule.forChild(SlotTokenRouting),MatFormFieldModule,MatDatepickerModule,MatInputModule,MatNativeDateModule,ReactiveFormsModule,FormsModule,NgxMatDatetimePickerModule,NgxMatTimepickerModule],
})
export class SlotTokenModule {}
