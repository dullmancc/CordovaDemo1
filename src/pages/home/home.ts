import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ListPage} from '../list/list';
import {DetailPage} from '../detail/detail';
import {DaohangPage} from '../daohang/daohang';
import {CaiyangPage} from '../caiyang/caiyang';
import { Events } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {Headers, Http, RequestOptions} from "@angular/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public  imgPath:string;
  info;
  head;
  public curTaskId;
  public item;
  constructor(public navCtrl: NavController,public events: Events,private http:Http) {

    this.head = new Headers({  "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"});
    var options =new RequestOptions({headers:this.head});
    this.http.get('http://192.168.1.108/SoTest/api/t_User/Gett_User?id=1001',options).subscribe(res=>{
      this.info = res.json();
      var i = 0;
      for(var s = 0;s<this.info.t_Task.length;s++){
        if(this.info.t_Task[s].TaskState==0){
          this.imgPath='./assets/imgs/ZXZ.png';
          this.curTaskId = this.info.t_Task[s].TaskID;
          this.item = this.info.t_Task[s];
          console.log(this.curTaskId);
        }else {
          this.imgPath='./assets/icon/favorite.png';
        }
      }
    },error=>{
      alert(error.json());
    });

    events.subscribe('imgpath:change', (user, time) => {
     this.imgPath = user.img;
     this.curTaskId = user.TaskId;
    });

  }
  gotoList(){
    if(typeof (TabsPage.info)=='undefined'){
      this.head = new Headers({  "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"});
      var options =new RequestOptions({headers:this.head});
      this.http.get('http://192.168.1.108/SoTest/api/t_User/Gett_User?id=1001',options).subscribe(res=>{
        TabsPage.info = res.json();
        this.navCtrl.push(ListPage,{info:TabsPage.info});
      },error=>{

        alert(error.json());
      });
    }else{
      this.navCtrl.push(ListPage,{info:TabsPage.info});
    }

  }
  gotoDetail(){
    console.log(this.imgPath);
  }
  gotoDaohang(){

    this.navCtrl.push(DaohangPage,{info:TabsPage.info});
  }
  gotoCaiyang(){
    if(typeof (TabsPage.info)=='undefined'){
      this.head = new Headers({  "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"});
      var options =new RequestOptions({headers:this.head});
      this.http.get('http://192.168.1.108/SoTest/api/t_User/Gett_User?id=1001',options).subscribe(res=>{
        TabsPage.info = res.json();
        this.navCtrl.push(CaiyangPage,{info:TabsPage.info,curTaskId:this.curTaskId ,item:this.item});
      },error=>{

        alert(error.json());
      });
    }else{
      this.navCtrl.push(CaiyangPage,{info:TabsPage.info,curTaskId:this.curTaskId ,item:this.item});
    }
  }
}
