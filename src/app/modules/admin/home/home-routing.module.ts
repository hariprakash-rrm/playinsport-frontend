import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { GameComponent } from '../game/game.component';
import { UsermanagementComponent } from '../usermanagement/usermanagement.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'game',
        component: GameComponent,
    },
    {
      path:'usermanagement',
      component: UsermanagementComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
