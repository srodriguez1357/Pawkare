import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import * as firebase from 'firebase';

import 'firebase/firestore';
/**
 * Generated class for the AgregarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregar',
  templateUrl: 'agregar.html',
})
export class AgregarPage {

  autor:string = '';
  titulo:string = '';
  ano:string = '';
  portada:string = '';

  db: firebase.firestore.Firestore;

  user: firebase.User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController) {
      this.user = firebase.auth().currentUser;
      this.db = firebase.firestore()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarPage');
  }

  agregar(){
    let libro= {
      titulo : this.titulo,
      autor : this.autor,
      ano : this.ano,
      portada : this.portada,
      user: this.user.uid
    };
    console.log(JSON.stringify(libro));
    this.addDocument('libros', libro);
  }

  addDocument(collection:string, obj:any){
    this.db.collection(collection).add(obj)
    .then((res:any)=>{
      console.log('agregado');
      let alert = this.alertCtrl.create(
        {
          title: "Éxito",
          subTitle:"Se agregó el disco",
          buttons: ["OK"]
        }
        );
      alert.present();
      this.navCtrl.pop();
    })
    .catch((error:any)=>{
      console.log('error');
      let alert = this.alertCtrl.create(
        {
          title: "Error",
          subTitle:"No se agregó el disco",
          buttons: ["OK"]
        }
      );
      alert.present();
    });
  }

}
