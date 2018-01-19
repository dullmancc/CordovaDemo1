import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import { Events } from 'ionic-angular';
import {Headers, Http, RequestOptions} from "@angular/http";
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  public item;
  public mytask;
  public rwzt:string;
  public rwztz:string;
  public imgPath;
  color;
  IsStart;
  head;
  MytaskState;
  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events,private http:Http) {
      this.item = this.navParams.get('rwxq');

      this.mytask =this.item.t_CollectionPoint;
    if(this.item.TaskState==-1){
      this.MytaskState = '未完成';
      this.color = 'red';
    }else if(this.item.TaskState==1){
      this.color = 'green';
      this.IsStart = 'none';
      this.MytaskState = '已完成';
    }else if (this.item.TaskState==0){
      this.color = 'yellow';
      this.IsStart = 'none';
      this.MytaskState = '执行中';
    }else {
      this.color = 'red';
      this.IsStart = 'none';
      this.MytaskState = 'error';
    }
      /*
      this.mytask.ypid = 34;
      this.mytask.xzqid = '荆州';
      this.mytask.xjid = '石首市';
      this.mytask.distance='321公里';
      this.mytask.JDN = '112.68';
      this.mytask.WDN = '29.677';
      this.mytask.newProdiAdrs='测试1';
      this.mytask.newClosiAdrs='武汉市第二小学';
      this.mytask.UseTR = '平原水田';
      this.mytask.TypeTR='红土';
      this.mytask.YtypeTR='红土';
      this.mytask.IsStart =0;
*/
      if( this.mytask.IsStart ==0){
        this.rwzt ='red';
        this.rwztz = '未完成';
      }else {
        this.rwzt='green';
        this.rwztz='已完成';
      }
  }

  publishEvents() {
    if(this.imgPath!='./assets/imgs/ZXZ.png'){
      this.imgPath='./assets/imgs/ZXZ.png';

      this.events.publish('imgpath:change',{img:this.imgPath,TaskId: this.item.TaskID}, Date.now());
      console.log(this.imgPath);
      this.item.TaskState=0;
      this.head = new Headers({  "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"});
      var options =new RequestOptions({headers:this.head});
      var itemdata= 'id='+this.item.TaskID+'&TaskID='+this.item.TaskID+'&UserID='+this.item.UserID+'&TaskState='+this.item.TaskState+
        '&CollectionPointID='+this.item.CollectionPointID+'&TimeRequest='+this.item.TimeRequest+'&Reason='+this.item.Reason+
        '&SuperimposedLandSubtype='+this.item.SuperimposedLandSubtype+'&SuperimposedLandType='+this.item.SuperimposedLandType+
        '&SuperimposedLandUse='+this.item.SuperimposedLandUse;
      this.http.post('http://192.168.1.108/SoTest/api/t_Task/Test?id='+this.item.TaskID+'&t_Task={}',itemdata,options).subscribe(res=>{
        alert('开始执行');
      },error=>{
        alert(error.json());
      });
    }else {
      alert('已有任务在执行')
    }

  }

  stopEvents() {
    if(this.item.TaskState==0){
      this.imgPath='./assets/imgs/favorite.png';
      this.events.publish('imgpath:change',this.imgPath, Date.now());
      console.log(this.imgPath)
      this.head = new Headers({  "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"});
      var options =new RequestOptions({headers:this.head});
      this.item.TaskState=1;
      var itemdata= 'id='+this.item.TaskID+'&TaskID='+this.item.TaskID+'&UserID='+this.item.UserID+'&TaskState='+this.item.TaskState+
        '&CollectionPointID='+this.item.CollectionPointID+'&TimeRequest='+this.item.TimeRequest+'&Reason='+this.item.Reason+
        '&SuperimposedLandSubtype='+this.item.SuperimposedLandSubtype+'&SuperimposedLandType='+this.item.SuperimposedLandType+
        '&SuperimposedLandUse='+this.item.SuperimposedLandUse;
      this.http.post('http://192.168.1.108/SoTest/api/t_Task/Test?id='+this.item.TaskID+'&t_Task={}',itemdata,options).subscribe(res=>{
        alert('正在执行中');
      },error=>{
        this.item.TaskState=0;
        alert(error.json());
      });
    }else {
      alert('当前任务未执行');
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
  Start(){
    this.imgPath='./assets/imgs/ZXZ.png';
  }
  Stop(){

  }

}

class MyTask{
  public ypid:number;
  public xzqid:string;
  public xjid:string;
  public distance:string;
  public JDN:string;
  public WDN:string;
  public newProdiAdrs:string;
  public newClosiAdrs:string;
  public UseTR:string;
  public TypeTR:string;
  public YtypeTR:string;
  public Reason:string;
  public timerequest:string;
  public IsStart:number;
}
