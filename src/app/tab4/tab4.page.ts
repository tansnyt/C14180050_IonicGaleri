import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../services/foto.service';

export interface filefoto {
  name: string, // filepath
  path: string // webviewpath
}

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  urlImageStorage: string[] = [];
  constructor(
    private afStorage: AngularFireStorage,
    public fotoService: FotoService) { }

  async ngOnInit() {
    await this.fotoService.loadFoto();
  }

  async ionViewDidEnter() {
    await this.fotoService.loadFoto();
    this.tampilkanData();
  }

  hapusFoto() {
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          itemRef.delete().then(() => {
            // menampilkan data
            this.tampilkanData();
          });
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  tampilkanData() {
    this.urlImageStorage = [];
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          itemRef.getDownloadURL().then((url) => {
            this.urlImageStorage.unshift(url);
          });
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  uploadFoto() {
    this.urlImageStorage = [];
    for (var index in this.fotoService.dataFoto) {
      const imgFilepath = `imgStorage/${this.fotoService.dataFoto[index].filePath}`;

      console.log(this.fotoService.dataFoto[index].dataImage);
      this.afStorage.upload(imgFilepath, this.fotoService.dataFoto[index].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url) => {
          this.urlImageStorage.unshift(url);
          console.log(url);
        });
      });
    }
  }

}
