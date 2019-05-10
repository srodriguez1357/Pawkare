import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { AgregarPage } from '../agregar/agregar';
import { LoginPage } from '../login/login';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  db: firebase.firestore.Firestore;
  items= [];

  agregarPage = AgregarPage;
  loginPage = LoginPage;
  user: firebase.User;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController) {
    this.user = firebase.auth().currentUser;
    this.db = firebase.firestore();
  }

  ionViewDidEnter(){
    this.items= [];

    this.getDocuments("libros");
  }
  getDocuments(collection:string){
    this.db.collection(collection).where('user', '==', this.user.uid).get()
    .then((res: any)=> {
    res.forEach(element => {
      let libro= {
        id: element.id,
        titulo: element.data().titulo,
        autor: element.data().autor,
        portada: element.data().portada,
        ano: element.data().año,
      };
      this.items.push(libro);
    });
})
.catch(error =>{
  console.log('error al conectar');
});
}

agregar(){
  this.navCtrl.push(this.agregarPage);
}

logout(){
  firebase.auth().signOut()
  .then(data=>{
    const toast = this.toastCtrl.create({
      message: "Se cerró correctamente",
      duration: 3000,
      position: 'top'
    });
    toast.present();
    this.navCtrl.setRoot(this.loginPage);
  })
  .catch(error=> {
    const toast = this.toastCtrl.create({
      message: "Intente cerrar sesión más tarde",
      duration: 3000,
      position: 'top'
  });
  toast.present();
});
}
}
