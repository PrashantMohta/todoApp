import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HovereffectService {
  private record=[];
  private hoverTimer:number;

  public isWaitingToHover:boolean=false;
  public maxHover:number=500;
  public router:Router;
  public allowNavigationDelay:boolean=true;
  private enableNavigationDelay:boolean=false;

  constructor(){}

  public  Hoverlink(params)
  {
    if(this.enableNavigationDelay)
    {window.setTimeout(()=>{this.router.navigate(params);},this.maxHover);}
    else
    {this.router.navigate(params);}
  }

  private reset(){
    for (let x of this.record){
      x.htmlelement.classList.add(x.class);
    }
    this.record = [];
  }

  private removehover(){
    let ele=  document.getElementsByClassName("_h");
    for (let i=0;i<ele.length;i++){
      for (let x=0;x<ele[i].classList.length; x++){
        let temp = ele[i].classList[x].toString();
        if(temp.endsWith("__hover")){
        ele[i].classList.remove(ele[i].classList[x])
        this.record.push({
            htmlelement:ele[i],
            class:temp
          });
        }
      }
      
    }
    this.isWaitingToHover=false;
  }
   //@HostListener('document:touchstart',['$event'])
   public touch(ev:TouchEvent)
  {
   
    if(this.allowNavigationDelay && !this.enableNavigationDelay){this.enableNavigationDelay=true;}

    if(!this.isWaitingToHover){
    this.reset();    
    this.hoverTimer= window.setTimeout(()=>{this.removehover();},this.maxHover);
    this.isWaitingToHover=true;}
    else
    {
      window.clearTimeout(this.hoverTimer);
      this.hoverTimer=window.setTimeout(()=>{this.removehover();},this.maxHover);
      this.isWaitingToHover=true;
    }

  }

}
