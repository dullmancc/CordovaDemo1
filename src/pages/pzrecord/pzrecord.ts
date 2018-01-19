import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ModalController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {Newpz1Page} from "../newpz1/newpz1";
import {Newpz2Page} from "../newpz2/newpz2";

@IonicPage()
export class uncompleteItem{
  public part:string;
  public datetime:string;
}
@Component({
  selector: 'page-pzrecord',
  templateUrl: 'pzrecord.html'
})
export class PzrecordPage {
  flag:boolean[]=[true,true,true];
  iconName:string[]=["arrow-dropright","arrow-dropright","arrow-dropright"];
  hiddenItem:boolean[]=[true,true,true];
  recordClasses:string[]=["我未完成的表单","上一个人提交的表单","我完成的表单"];


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl:ModalController,public alertCtrl:AlertController) {

  }

  //展开和收缩列表
  togglelist(i):void{
    this.flag[i]=!this.flag[i];
    if(!this.flag[i]){
      this.iconName[i]="arrow-dropdown";
      this.hiddenItem[i]=false;
    }
    else{
      this.iconName[i]="arrow-dropright";
      this.hiddenItem[i]=true;
       }
  }

getRecord(recordClass){
  if(recordClass==this.recordClasses[0])
    return [
    {part: "部位01", datetime: "2017/12/10"},
    {part: "部位02", datetime: "2017/12/10"},
    {part: "部位03", datetime: "2017/12/10"}
  ];

  if(recordClass==this.recordClasses[1])
    return [
      {part: "部位11", datetime: "2017/12/10"},
      {part: "部位12", datetime: "2017/12/10"},
      {part: "部位13", datetime: "2017/12/10"}
    ];

  if(recordClass==this.recordClasses[2])
    return [
      {part: "部位21", datetime: "2017/12/10"},
      {part: "部位22", datetime: "2017/12/10"},
      {part: "部位23", datetime: "2017/12/10"}
    ];
}

  newRecord(){
      let alert=this.alertCtrl.create({
        title:"请选择您需要新建的旁站记录类型！",
        cssClass:'projectList'
      });

      alert.addInput({
      type: 'radio',
      label: '混凝土浇筑旁站',
      value: 'hltPZ',
      checked: true
      });
    alert.addInput({
      type: 'radio',
      label: '砼旁站',
      value: 'tPZ',
      checked:false
    });
    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: data => {
        if(data=='hltPZ')
        {
          let modal=this.modalCtrl.create(Newpz1Page);
          modal.present();
        }
        if(data=='tPZ')
        {
          let modal=this.modalCtrl.create(Newpz2Page);
          modal.present();
        }
      }
    });
    alert.present();
  }
}
