import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
@IonicPage()
export class photo
{
  public src:any;
}
@Component({
  selector: 'page-newpz1',
  templateUrl: 'newpz1.html',
})
export class Newpz1Page {
    startTime:any;
    endTime:any;
    planStartTime:any;
    planEndTime :any;
    part:any;
    gongxu:any;
    findProblem:any;
    dealCase:any;
    sgCase:any={w1:"",w2:"",w3:"",w4:"",w5:"",
                 w6:"",w7:"",w8:"",w9:"",w10:"",
                w11:"",w12:"",w13:"",w14:"",w15:"",
                 w16:"",w17:"",w18:"",w19:"",w20:"",w21:""};
    photoes:photo[]=[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              private actionSheet:ActionSheet,
              private imagePicker: ImagePicker) {

  }

  changeDate():void{
    let startTime=this.startTime.toString();
    let endTime=this.endTime.toString();
    if(startTime>endTime)
    {
      alert("开始时间不能大于结束时间，请重新输入");
      this.endTime=this.startTime;
    }
  }

  changePlanDate():void {
    let planEndTime=this.planEndTime.toString();
    let planStartTime=this.planStartTime.toString();
    if(planStartTime>planEndTime){
      alert("计划开始时间不能大于计划结束时间,请重新输入");
      this.planEndTime=this.planStartTime;
       }
   }

  addPhoto():void{
    const options0: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum:true
    };
    // 设置选项
    const options1: ImagePickerOptions = {
      maximumImagesCount:9,
      quality: 100
    };

    let buttonLabels = ['拍照', '从相册选择照片'];

    const options: ActionSheetOptions = {
      title: '请选择您想要获取图片的方式',
      buttonLabels: buttonLabels,
      addDestructiveButtonWithLabel: '取消',
      androidTheme: this.actionSheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
      destructiveButtonLast: true
    };

    this.actionSheet.show(options).then((buttonIndex: number) => {
      if(buttonIndex==1)
        this.camera.getPicture(options0).then((imageData) => {
          let base64Image = 'data:image/jpeg;base64,' + imageData;
          let p=new photo();
          p.src=base64Image;
          this.photoes.push(p);
        }, (err) => {
          console.log(err);
        });
      if(buttonIndex==2)
        this.imagePicker.getPictures(options1).then((results) => {
          for (var i = 0; i < results.length; i++) {
            let p=new photo();
            p.src=results[i];
            this.photoes.push(p);
          }
        }, (err) => {
          console.log('获取图片失败');
        });
    });
  }

  deletePhoto(i:number){
    if(0<=i&&i<=this.photoes.length-1)
    {
      for(let k=i;k<this.photoes.length-1;k++)
      {
        this.photoes[k]=this.photoes[k+1];
      }
      this.photoes.length--;
    }
  }
}
