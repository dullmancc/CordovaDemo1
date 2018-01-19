import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DetailPage} from "../detail/detail";

@IonicPage()
export class item{
  public part:any;
  public color:any;
}
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})

export class ListPage {
   info;
   color;
   State;
   items;//:item[]=[{part:"黄石",ypID:"001",jobCondition:"完成"},{part:"黄石",ypID:"002",jobCondition:"完成"},
      //{part:"黄石",ypID:"003",jobCondition:"完成"},{part:"黄石",ypID:"004",jobCondition:"完成"}];
  proitems:item[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.info = this.navParams.get('info');
    this.items = this.info.t_Task;
    this.proitems =  [];
    for(var s=0;s<this.items.length;s++){
      var i = new item();
      if(this.items[s].TaskState==-1){
        i.color = 'red';
        i.part= '未完成';
      }else if(this.items[s].TaskState==1){
        i.color = 'green';
        i.part='已完成';
      }else if (this.items[s].TaskState==0){
        i.color = 'yellow';
        i.part='执行中';
      }else {
        i.color = 'red';
        i.part= 'error';
      }
      this.proitems.push(i);
    }
  }
detail(item){
  this.navCtrl.push(DetailPage,{rwxq:item});
}

TaskState(item){
    console.log(item.TaskState);
    if(item.TaskState==-1){
      this.color = 'red';
       return '未完成';
    }else if(item.TaskState==1){
      this.color = 'green';
      return '已完成';
    }else if (item.TaskState==0){
      this.color = 'yellow';
      return'执行中';
    }else {
      this.color = 'red';
      return 'error';
    }

}
}
