import { Component, OnInit } from '@angular/core';
import { HovereffectService } from '../hovereffect.service';
import { LocalStorageService } from '../local-storage.service';
import { Taskitem, Task } from "../Taskitem";


@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent implements OnInit { 
  public isListEmpty()
  {
      return  Object.keys(this.storage.Tasks).length==0;
  }           
  constructor(public Hv:HovereffectService,public storage:LocalStorageService) { }
public taskRemove($event,id:number)
{
  let x:Task,name:string="";
  this.storage.prepareUndo(); // save a copy for undo
  name=this.storage.TaskList[this.storage.Tasks[id]].name;
  this.storage.TaskList[this.storage.Tasks[id]]=x;
  delete  this.storage.Tasks[id];
  // dont navigate to the item
  $event.stopPropagation()
   //allow to undo for a short time TODO
  this.storage.askUndo(`Deleted ${name} successfully`); // allow user to undo
  this.storage.saveTasklist(); // save the changes now assuming no undo
  
}

  ngOnInit() {
    
  }

}
