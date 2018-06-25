import { Taskitem, Task } from "../Taskitem";

import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { ActivatedRoute } from '@angular/router';
enum Taskstatus{"incomplete","complete"};

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css']
})
export class ViewTasksComponent implements OnInit {

  public updateCheckbox()
  {
    this.storage.TaskList[this.location].timestamp=new Date();
    this.storage.saveTasklist();
  }

  public location:number;

  itemRemove(index:number){
    let name:string;
    name=this.storage.TaskList[this.location].taskItemList[index].name;
    this.storage.prepareUndo(); // save a copy for undo
    this.storage.TaskList[this.location].taskItemList.splice(index,1); 
    //TODO allow undo for short time
    this.storage.saveTasklist();
    this.storage.askUndo(`Deleted ${name} successfully`); // allow user to undo
    this.storage.saveTasklist(); // save the changes now assuming no undo
  
  }
  
  constructor(public storage:LocalStorageService,private route: ActivatedRoute) { }
  public id:number;
  ngOnInit() {
    this.route.params.subscribe(params => this.id=params.id);
    this.location=this.storage.Tasks[this.id];
    
  }

}
