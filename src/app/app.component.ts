import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HovereffectService } from './hovereffect.service';
import { LocalStorageService } from './local-storage.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title:string = 'To-do App';
  
  showBackNav:boolean;
  showNewNav:boolean;
  showSaveNav:boolean;

  newItemRoute:string="/newtask";
  backRoute:string="/list";
  public save(){
    this.storage.saveTasklist()
  }
  // bind hover effect to any touch event on the document (clicks run normally without issue)
  @HostListener('document:touchstart',['$event'])
  fn(event:TouchEvent){ this.Hv.touch(event); }
  constructor(private router:Router,private Hv:HovereffectService,public storage:LocalStorageService) { 
    //set up hovereffect
    Hv.maxHover=450;
    Hv.allowNavigationDelay=true;
    Hv.router=this.router;

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd ) {
        console.log("current url",event.url); // event.url has current url
        if(event.url.startsWith("/list" )|| event.url=="/")
        {
        this.showBackNav=false;
        this.showNewNav=true;
        this.showSaveNav=false;

        this.newItemRoute="/newtask";
        }
        else if(event.url.startsWith("/task"))
        {
          this.showBackNav=true;
          this.showNewNav=true;
          this.showSaveNav=false;
          this.backRoute="/list";
          if(!event.url.endsWith("/newitem"))          
          {

            this.newItemRoute=event.url+"/newitem";
          }
          else{  
            this.showNewNav=false;
            this.showBackNav=true;
            this.showSaveNav=true;
            this.backRoute=event.url.replace("/newitem","");
          }
        }
        else if(event.url.startsWith("/newtask"))
        {
          this.showSaveNav=true;
          this.showBackNav=true;
          this.showNewNav=false;
          this.backRoute="/list";

        }
        
      }
    });
  }
  
  public Enter(ev:KeyboardEvent)
  {
    if(ev.keyCode==13 && this.showSaveNav){
    this.save();
    this.Hv.Hoverlink([this.backRoute]);
   }
   }
}