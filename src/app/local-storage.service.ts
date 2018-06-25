import { Injectable, OnInit } from '@angular/core';
import { Taskitem, Task } from "./Taskitem";

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  
  constructor() {
    let localstorage:any = this.getLocalStorage();
    let temp=this.getItem("TaskList");

    /*let arr=[];
    for(let key in temp.keys() ){
      arr.push(temp[key])
    }
  */
    if(temp)
    { this.TaskList=temp;}
    else 
    { // first run !
      this.TaskList=[
        { 
          id:0,
          name:"My To-do List app",
          taskItemList:[
                        {name:"Make Lists and Add your task items !",complete:false},
                        {name:"complete your tasks",complete:false},
                        {name:"cross them off when you are done !",complete:true},
                        {name:"Stay productive !",complete:false},
                        ],
          timestamp:new Date()
        },
        { 
          id:1,
          name:"Shopping List",
          taskItemList:[
                        {name:"Apples",complete:true},
                        {name:"Oranges",complete:true},
                        {name:"Bananas",complete:false},
                        {name:"cereal",complete:false},
                        {name:"cheese",complete:false},
                        ],
          timestamp:new Date()
        }];
    }

    temp=this.getItem("Tasks");
    if(temp)
    { this.Tasks=temp;}
    else 
    {// first run !
      this.Tasks={0:0,1:1};
    }

   }

   private getLocalStorage() {
    return (typeof window !== "undefined") ? window.localStorage : null;
   }

   public setItem( key:string, object:any)
   {
    return localStorage.setItem(key,JSON.stringify(object));
   }

   public getItem(key:string) :any
   {
    return JSON.parse(localStorage.getItem(key));
   }

   public saveTasklist(){

    /*let dict={};
    for(let key in this.TaskList ){
     dict[this.TaskList[key].id]= this.TaskList[key];
    }*/
     this.setItem("TaskList",this.TaskList);
     this.setItem("Tasks",this.Tasks);

   }
   public prepareUndo(): any {

    // create deep copies of the objects
    this.BackupTaskList=JSON.parse(JSON.stringify(this.TaskList));
    this.BackupTasks=JSON.parse(JSON.stringify(this.Tasks));

  }

  public askUndo(message:string): any {
    // show undo message
    this.showUndoMessage=true;
    this.undoMessage=message;
    //hide undo message
    if(this.timeout)
        {
          window.clearTimeout(this.timeout);
        }
    this.timeout=window.setTimeout(()=>{
    this.showUndoMessage=false;
    this.undoMessage="This is Undo Message";
    },2000);
  }

  public doUndo()
  {
        // create deep copies of the objects
        this.TaskList=JSON.parse(JSON.stringify(this.BackupTaskList));
        this.Tasks=JSON.parse(JSON.stringify(this.BackupTasks));   
        if(this.timeout)
        {
          window.clearTimeout(this.timeout);
        }
        this.saveTasklist();
        this.undoMessage=" restored ";
        this.showUndoMessage=true;
        this.undoDone=true;
        this.timeout=window.setTimeout(()=>{
          this.showUndoMessage=false;
          this.undoDone=false;
          this.undoMessage="This is Undo Message";
        },600);

 
  }

   public TaskList:any;
   public Tasks:any;
   
   public showUndoMessage:boolean=false;
   public undoMessage:string="This is Undo Message";
   public undoDone:boolean=false;
   private timeout:number;
   private BackupTaskList:any;
   private BackupTasks:any;


}
