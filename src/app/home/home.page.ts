import { Component, OnInit } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  ImageOptions,
} from '@capacitor/camera';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  base64 = '';
  utils: any;
  imageUrl: any;
  constructor(
    public photoService: PhotoService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    //Camera.requestPermissions({ permissions: ['photos'] });
  }

  //Code to pick an image from gallery

  pickImageFromGallery() {
    const options: ImageOptions = {
      source: CameraSource.Photos,
      resultType: CameraResultType.DataUrl,
    };
    Camera.getPhoto(options).then(
      (result) => {
        this.base64 = result.dataUrl;
      },
      (err) => {
        alert(err);
      }
    );
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  onUploadSuccess(url) {
    // console.log('###uploadSuccess', res);
    const imageUrl = url;
    console.log(imageUrl);
  }

  onUploadError(err: any) {
    // console.log('###uploadError', err);
    this.utils.handleError(err);
  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Select Option',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Take Picture',
          value: 'camera',
          checked: true,
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Upload from Device',
          value: 'filestack',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: (choice) => {
            if (choice === 'camera') {
              this.addPhotoToGallery();
            }
            console.log('Confirm Ok');
          },
        },
      ],
    });

    await alert.present();
  }
}
