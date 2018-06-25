import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Task,Taskitem} from  '../Taskitem';
import { LocalStorageService } from '../local-storage.service';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {


  public generateSafeID()
  {
    let temp:number;
    do{
      temp=Math.floor(Math.random()*89898989);
    }
    while(this.storage.Tasks.hasOwnProperty(temp));
    return temp;
  }
  
  public model:Task={
    id:this.generateSafeID(),
    name:"",
    taskItemList:[],
    timestamp:new Date()
  };
  constructor(private storage:LocalStorageService) { }
  public fastSave()
  {    
    if( this.storage.Tasks.hasOwnProperty(this.model.id)) //subsequent saves
    {
      let location=this.storage.Tasks[this.model.id];
      this.storage.TaskList[location]=this.model;
    }
    else //initial save
    {      
      let location=this.storage.TaskList.length;
      this.storage.TaskList.push(this.model);
      this.storage.Tasks[this.model.id]=location;
    }
  }
  
  @ViewChild('popkeyboard') private elementRef: ElementRef;
  
  ngOnInit() {
    this.elementRef.nativeElement.focus();
  }

}
