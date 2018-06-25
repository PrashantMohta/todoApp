import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {ViewListComponent} from './view-list/view-list.component';
import {ViewTasksComponent} from './view-tasks/view-tasks.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { NewTaskItemComponent } from './new-task-item/new-task-item.component';

const routes: Routes = [
  
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ViewListComponent },
  { path: 'task/:id/newitem', component: NewTaskItemComponent },
  { path: 'task/:id', component: ViewTasksComponent },
  { path: 'newtask', component: NewTaskComponent },
  
];

@NgModule({
  exports: [RouterModule],
  imports:[RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
