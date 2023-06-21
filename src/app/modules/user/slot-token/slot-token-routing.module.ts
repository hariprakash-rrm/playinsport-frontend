import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlotTokenComponent } from './slot-token.component';
import { Route } from '@angular/router';
// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })

export const SlotTokenRouting: Route[] = [
  {
      path     : '',
      component: SlotTokenComponent
  },
]
