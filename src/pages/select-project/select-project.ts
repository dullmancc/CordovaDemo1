import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PzrecordPage} from "../pzrecord/pzrecord";

@IonicPage()
export class project{
  name:string;
}
@Component({
  selector: 'page-select-project',
  templateUrl: 'select-project.html',
})
export class SelectProjectPage {
      projects:project[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.init();
  }
  init():void{
        this.projects=[{
              name:"武汉工程大学填湖工程1"
        },
          {
            name:"武汉工程大学扫黄工程2"
          },
          {
            name:"451大扫除工程3"
          },
          {
            name:"武汉工程大学填湖工程4"
          },
          {
            name:"武汉工程大学填湖工程5"
          },
          {
            name:"武汉工程大学填湖工程6"
          },
          {
            name:"武汉工程大学填湖工程7"
          },
          {
            name:"武汉工程大学填湖工程8"
          },
          {
            name:"武汉工程大学填湖工程9"
          },
          {
            name:"武汉工程大学填湖工程10"
          },
          {
            name:"武汉工程大学填湖工程11"
          }
        ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectProjectPage');
  }
  enterPro(project:project){
    if(project.name=='451大扫除工程3')
    {
      this.navCtrl.push(PzrecordPage);
    }
  }

}
