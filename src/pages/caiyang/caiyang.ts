import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController, ToastController } from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {photo} from "../newpz1/newpz1";
import {ActionSheet, ActionSheetOptions} from "@ionic-native/action-sheet";
import {File} from "@ionic-native/file";
import {FileTransfer,FileUploadOptions,FileTransferObject} from "@ionic-native/file-transfer";
import {Headers, Http, RequestOptions} from "@angular/http";

/**
 * Generated class for the CaiyangPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export class Sample{
  public  SampleID:number;
  public  TaskID:string;
  public  FinallyTime;
  public  Text:string;
  public  PictureURL:string;
}
@IonicPage()
@Component({
  selector: 'page-caiyang',
  templateUrl: 'caiyang.html',
})
export class CaiyangPage {
  photoes:photo[]=[];
  public shijian;
  public didian;
  public part;
  planEndTime;
  public curTaskId;
  public smp:Sample;
  public info;
  loader;
  public head;
  public item:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              private actionSheet:ActionSheet,private transfer: FileTransfer,
              private file: File ,public http:Http,
              private imagePicker: ImagePicker,public loadingCtrl: LoadingController, public toastCtrl: ToastController){
    this.curTaskId = this.navParams.get('curTaskId');
    this.smp = new Sample();
    this.smp.TaskID = this.curTaskId;
    this.info = this.navParams.get('info');
    this.item = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaiyangPage');
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
 upload(){
   if(typeof (this.smp.TaskID)=='undefined'){
     alert('没有任务正在执行');
     return;
   }
   this.loader = this.loadingCtrl.create({
     content: "Uploading..."
   });
   this.loader.present();
   this.upFile(0);
 }

    upFile(i) {
    console.log(this.photoes.length);
   if (i < this.photoes.length) {

     var fileTransfer: FileTransferObject = this.transfer.create();

     let options: FileUploadOptions = {
       fileKey: 'ionicfile',
       fileName: 'ionicfile',
       chunkedMode: false,
       mimeType: "image/jpeg",
       headers: {}
     }
       fileTransfer.upload(this.photoes[i].src, 'http://192.168.1.108/SoTest/api/t_Task/Post?panzhangid=' + this.curTaskId + '&EmployeeId=1001', options)
         .then((data) => {
           i++;
           if (i == this.photoes.length ) {
             this.loader.dismiss();
           } else {
             this.presentToast(i-1 + "Image uploaded successfully");
              return this.upFile(i);
           }

         }, (err) => {
           console.log(err);
           this.loader.dismiss();
           this.presentToast(err);
         });
   }else{
     this.loader.dismiss();
     this.presentToast("Image uploaded successfully");
   }
 }

  uploadFile(){
    if(typeof (this.smp.TaskID)=='undefined'){
      alert('没有任务正在执行');
      return;
    }
    for(var s=0;s<this.photoes.length;s++){
      if(s!=this.photoes.length-1){
        this.smp.PictureURL = 'D:/Uploads/'+ this.curTaskId+'_this.info_'+s+",";
      }else {
        this.smp.PictureURL = 'D:/Uploads/'+ this.curTaskId+'_this.info_'+s;
      }
    }
    if(this.photoes.length==0){
      this.smp.PictureURL=' ';
    }
    this.smp.TaskID = this.curTaskId;
    if(this.planEndTime==null){
      alert('请选择时间');
      return;
    }else {
      this.smp.FinallyTime = this.planEndTime.toString();
    }

    this.smp.Text = this.didian;
    this.head = new Headers({  "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"});
    var options =new RequestOptions({headers:this.head});
    var data = 'TaskID='+this.smp.TaskID+'&FinallyTime='+this.smp.FinallyTime+'&Text='+ this.smp.Text+'&PictureURL='+this.smp.PictureURL;
    this.http.post('http://192.168.1.108/SoTest/api/t_Sample/Postt_Sample',data,options).subscribe(res=>{
      this.info = res.json();
      this.item.TaskState =1;
      this.item.t_CollectionPoint=undefined;
      this.item.t_Sample=undefined;
      var itemdata= 'id='+this.item.TaskID+'&TaskID='+this.item.TaskID+'&UserID='+this.item.UserID+'&TaskState='+this.item.TaskState+
                    '&CollectionPointID='+this.item.CollectionPointID+'&TimeRequest='+this.item.TimeRequest+'&Reason='+this.item.Reason+
                    '&SuperimposedLandSubtype='+this.item.SuperimposedLandSubtype+'&SuperimposedLandType='+this.item.SuperimposedLandType+
                    '&SuperimposedLandUse='+this.item.SuperimposedLandUse;
      this.http.post('http://192.168.1.108/SoTest/api/t_Task/Test?id='+this.item.TaskID+'&t_Task={}',itemdata,options).subscribe(res=>{
        alert('执行完毕');
      },error=>{
        alert('failed');
      });
    },error=>{
      alert(error.json());
    });
  }
  changePlanDate():void {
    let planEndTime=this.planEndTime.toString();
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
