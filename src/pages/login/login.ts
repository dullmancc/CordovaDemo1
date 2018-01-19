import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectProjectPage } from '../select-project/select-project';
import {ModalController} from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
              public user={checkState:'',
                            userID:''
                          };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl:ModalController,
              private http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(username:HTMLInputElement,password:HTMLInputElement){
    this.http.request('http://localhost:4729/api/User_Info/CheckLogin?userAccount='+username.value+'&password='+password.value)
      .subscribe((res: Response) => {
        this.user= res.json();
        if(this.user.checkState=='1'||this.user.checkState=='-1')
          alert('账号或密码不能为空');
        if(this.user.checkState=='0') {
          alert("输入的账号或密码有误");
          username.value='';
          password.value='';
        }
        if(this.user.checkState=='2')
        {
          alert("登录成功");
          let modal=this.modalCtrl.create(SelectProjectPage);
          modal.present();
        }
      },(error:any)=>{
        alert('获取数据失败'+error);
      });
  }

}
