import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Taskitem } from '../Taskitem';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-task-item',
  templateUrl: './new-task-item.component.html',
  styleUrls: ['./new-task-item.component.css']
})
export class NewTaskItemComponent implements OnInit {
  
  public id:number;
  public model:Taskitem={
    name:"",
    complete:false
  };

  constructor(private storage:LocalStorageService,private route: ActivatedRoute) { }
  public fastSave()
  {    
    if( !this.storage.Tasks.hasOwnProperty(this.id) )
    {
      console.error("Trying to add item no non existing list");
      //this.storage.TaskList[this.id].taskItemList.push(this.model);
      //this.storage.Tasks[this.id]=true;
    }
    else
    {
      // should always happen in normal execution
      let location=this.storage.Tasks[this.id];
      this.storage.TaskList[location].taskItemList.push(this.model);

    }
  }
  @ViewChild('popkeyboard') private elementRef: ElementRef;

  ngOnInit() {
    this.elementRef.nativeElement.focus();
    this.route.params.subscribe(params => this.id=params.id);
    
  }

}
