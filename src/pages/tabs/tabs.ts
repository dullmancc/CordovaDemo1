import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { SettingPage} from '../setting/setting'
import {Http, RequestOptions,Headers} from "@angular/http";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabRoots:Object[];
  static info;
  head;
  constructor(private http:Http) {

this.tabRoots=[
  {
    root:HomePage,
    tabTitle:'首页',
    tabIcon:'home'
  },
  {
    root:SettingPage,
    tabTitle:'个人中心',
    tabIcon:'person'
  }
];
  this.head = new Headers({  "Accept": "application/json",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"});
  var options =new RequestOptions({headers:this.head});
  this.http.get('http://192.168.1.108/SoTest/api/t_User/Gett_User?id=1001',options).subscribe(res=>{
    TabsPage.info = res.json();
  },error=>{
    alert(error.json());
  });
  }
}
