import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { SlotTokenComponent } from './slot-token.component';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
export const SlotTokenRouting: Route[] = [
    {
        path: '',
        component: SlotTokenComponent,
    },
];
