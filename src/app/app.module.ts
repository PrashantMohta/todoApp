import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ViewListComponent } from './view-list/view-list.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';
import { AppRoutingModule } from './/app-routing.module';
import { NewTaskComponent } from './new-task/new-task.component';
import { NewTaskItemComponent } from './new-task-item/new-task-item.component';


@NgModule({
  declarations: [
    AppComponent,
    ViewListComponent,
    ViewTasksComponent,
    NewTaskComponent,
    NewTaskItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
