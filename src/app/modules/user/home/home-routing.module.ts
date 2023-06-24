import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { SelectTokenComponent } from '../slot-token/components/select-token/select-token.component';
// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class HomeRoutingModule { }


export const HomeRoute: Route[] = [
  {
      path     : '',
      component: HomeComponent
  },

];