import { Component, OnInit } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  ImageOptions,
} from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  base64 = '';
  constructor(public photoService: PhotoService, private alertController: AlertController) {}

  ngOnInit() {
    Camera.requestPermissions({ permissions: ['photos'] });
  }

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
}
