import { Component } from '@angular/core';
//import { CameraPlugin, PictureSourceType } from '@capacitor/camera';
import { ActionSheetController, NavController } from '@ionic/angular';
import { NgProgress } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
//import * as Tesseract from 'tesseract.js';
import { createWorker } from 'tesseract.js';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  picture: string;
  selectedImage: string;
  imageText: string;
  ocrResult = 'Recognizing...';

  constructor(
    public navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    //private camera: CameraPlugin,
    public progress: NgProgress,
    public ngphMod: NgProgressHttpModule,
    public ngprMod: NgProgressRouterModule
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.doOCR;
  }

  async doOCR() {
    console.log('Running OCR function');
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const files = (<HTMLInputElement>document.getElementById('myfile'))
      .files[0];
    console.log(files);
    const worker = createWorker({
      logger: (m) => console.log(m),
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const {
      data: { text },
    } = await worker.recognize('./src/assets/text.png');
    this.ocrResult = text;
    console.log(text);
    await worker.terminate();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });

    this.picture = image.dataUrl;
  }

  // async selectSource() {
  //   const actionSheet = await this.actionSheetCtrl.create({
  //     buttons: [
  //       {
  //         text: 'Use Library',
  //         handler: () => {
  //           this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
  //         },
  //       },
  //       {
  //         text: 'Capture Image',
  //         handler: () => {
  //           this.getPicture(this.camera.PictureSourceType.CAMERA);
  //         },
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //       },
  //     ],
  //   });
  //   actionSheet.present();
  // }

  // getPicture(sourceType: PictureSourceType) {
  //   this.camera
  //     .getPicture({
  //       quality: 100,
  //       destinationType: this.camera.DestinationType.DATA_URL,
  //       sourceType,
  //       allowEdit: true,
  //       saveToPhotoAlbum: false,
  //       correctOrientation: true,
  //     })
  //     .then((imageData) => {
  //       this.selectedImage = `data:image/jpeg;base64,${imageData}`;
  //     });
  // }

  // recognizeImage() {
  //   Tesseract.recognize(this.selectedImage)
  //     .progress((message) => {
  //       if (message.status === 'recognizing text') {
  //         this.progress.set(message.progress);
  //       }
  //     })
  //     .catch((err) => console.error(err))
  //     .then((result) => {
  //       this.imageText = result.text;
  //     })
  //     .finally((resultOrError) => {
  //       this.progress.complete();
  //     });
  // }
}
