import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, ImageOptions } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  base64= '';
  constructor() {}

  ngOnInit() {
    Camera.requestPermissions({permissions:['photos']}
    );

  }

  pickImageFromGallery() {
    const options: ImageOptions={
      source:CameraSource.Photos,
      resultType:CameraResultType.DataUrl
    };
    Camera.getPhoto(options).then((result)=> {
      this.base64 = result.dataUrl;
    }, (err)=> {
      alert(err);
    });
  }

}
