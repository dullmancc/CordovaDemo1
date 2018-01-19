import { Component  ,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NativeService} from "../../provider/NativeService";

/**
 * Generated class for the DaohangPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var AMap;
@IonicPage()
@Component({
  selector: 'page-daohang',
  templateUrl: 'daohang.html',
})
export class DaohangPage {
  @ViewChild('map2') map_container2: ElementRef;
  map: any;//地图对象
  marker;
  constructor() {

  }

  ionViewDidEnter() {
    var localMe;
    let map = new AMap.Map(this.map_container2.nativeElement, {
      view: new AMap.View2D({//创建地图二维视口
        center: [116.397428, 39.90923],//地图中心点
        zoom: 16, //设置地图缩放级别
        rotateEnable: true,
        showBuildingBlock: true
      })
    });
    map.plugin(['AMap.ToolBar'], function () {
      map.addControl(new AMap.ToolBar());
    });
    map.plugin('AMap.Geolocation', function () {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 100000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      map.addControl(geolocation);
      console.log(1);
      geolocation.getCurrentPosition(function(status,result){
        console.log(result);
        console.log(status);
      });
      AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
      function onComplete(data) {
        var poiArr = data.position;
        //添加marker
        alert(poiArr);
        var marker = new AMap.Marker({
          map: map,
          position: poiArr
        });
        map.setCenter(marker.getPosition());
        console.log(trans);
        localMe = data.formattedAddress;
      }
      AMap.event.addListener(geolocation, 'error', onError);
      function onError(data) {
        alert(JSON.stringify(data));
        document.getElementById('tip').innerHTML = '定位失败';
      }
    });
    var trans;
    /*
     * 调用公交换乘服务
     */
    //加载公交换乘插件
    AMap.service(["AMap.Transfer"], function() {
      var transOptions = {
        map: map,
        city: '北京市',
        panel:'panel',                            //公交城市
        //cityd:'乌鲁木齐',
        policy: AMap.TransferPolicy.LEAST_TIME //乘车策略
      };
      //构造公交换乘类
      trans = new AMap.Transfer(transOptions);
      //根据起、终点坐标查询公交换乘路线
      console.log(trans);
    });

    var placeSearch = new AMap.PlaceSearch({
      map: map
    });
    //详情查询 -> 首先定位到Xxx
    placeSearch.getDetails("Xxx", function (status, result) {
      if (status === 'complete' && result.info === 'OK') {
        placeSearch_CallBack(result);
      }
    });
    var autoOptions = {
      input: "keyword"
    };
    //搜索信息-自动匹配
    var autocomplete = new AMap.Autocomplete(autoOptions);
    AMap.event.addListener(autocomplete, "complete", function (e) {
      console.log(e);
    });

    //自定义监听——注册监听，当选中某条记录时会触发
    AMap.event.addListener(autocomplete, "select", select);//
    function select(e) {
      console.log(e.poi)
      placeSearch.setCity(e.poi.adcode);//通过ID定位
      placeSearch.getDetails(e.poi.id, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          placeSearch_CallBack(result);//执行回调函数
        }
      });
    }
    //通过 infoWindow  显示信息
    var infoWindow = new AMap.InfoWindow({
      autoMove: true,
      offset: { x: 0, y: -30 }
    });
    //回调函数
    function placeSearch_CallBack(data) {
      var poiArr = data.poiList.pois;
      //添加marker
      var marker = new AMap.Marker({
        map: map,
        position: poiArr[0].location
      });
      map.setCenter(marker.getPosition());
      infoWindow.setContent(createContent(poiArr[0]));
      infoWindow.open(map, marker.getPosition());
      console.log(localMe);
      console.log(poiArr[0].name);
      trans.search([{keyword:localMe},{keyword:poiArr[0].name}], function(status, result){
        console.log(status);
      });
    }
    //信息窗体 infoWindow 内容
    function createContent(poi) {
      var s = [];
      s.push("<b>名称：" + poi.name + "</b>");//里面有很多信息可以自定义
      s.push("地址：" + poi.address);
      s.push("电话：" + poi.tel);
      s.push("类型：" + poi.type);
      s.push("经度：" + poi.location.lng);
      s.push("纬度：" + poi.location.lng);
      return s.join("<br>");
    }

  }

}
