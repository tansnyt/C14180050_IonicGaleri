import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  angka: number = 0;
  tebak: number;
  jawaban: boolean = false;
  constructor() { }

  ngOnInit() {
    this.angka = Math.floor((Math.random() * 10) + 1);
  }

  cekAngka() {
    if (this.tebak == this.angka) {
      this.jawaban = true;
    } else this.jawaban = false;
    this.tebak = null;
  }
}
