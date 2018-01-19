import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
declare var LocationPlugin;
declare var AMapNavigation;

@Injectable()
export class NativeService {
  private loading;

  constructor(private platform: Platform) {
  }

  /**
   * 是否真机环境
   * @return {boolean}
   */
  isMobile() {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 获得用户当前坐标
   * @return {Promise<T>}
   */
  getUserLocation() {
    return new Promise((resolve, reject) => {
      if (this.isMobile()) {
        LocationPlugin.getLocation(data => {
          resolve({'lng': data.longitude, 'lat': data.latitude});
        }, msg => {
          console.error('定位错误消息' + msg);
          alert(msg.indexOf('缺少定位权限') == -1 ? ('错误消息：' + msg) : '缺少定位权限，请在手机设置中开启');
          reject('定位失败');
        });
      } else {
        console.log('非手机环境,即测试环境返回固定坐标');
        resolve({'lng': 113.350912, 'lat': 23.119495});
      }
    });
  }

  /**
   * 地图导航
   * @param startPoint 开始坐标
   * @param endPoint 结束坐标
   * @param type 0实时导航,1模拟导航,默认为模拟导航
   * @return {Promise<T>}
   */
  navigation(startPoint, endPoint, type = 1) {
    return new Promise((resolve, reject) => {
      if (this.platform.is('mobile') && !this.platform.is('mobileweb')) {
        AMapNavigation.navigation({
          lng: startPoint.lng,
          lat: startPoint.lat
        }, {
          lng: endPoint.lng,
          lat: endPoint.lat
        }, type, function (message) {
          resolve(message);//非手机环境,即测试环境返回固定坐标
        }, function (message) {
          alert('导航失败:' + message);
          reject('导航失败');
        });
      } else {
        console.log('非手机环境不能导航');
      }
    });
  }


}
