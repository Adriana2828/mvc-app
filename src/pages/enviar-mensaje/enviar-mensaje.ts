import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { HttpProvider } from "../../providers/http/http";
import { Usuario } from "../../app/models/Usuario";
import { BuzonJunta } from "../../app/models/BuzonJunta";
import { ImprimirMensajePage } from "../imprimir-mensaje/imprimir-mensaje";
/**
 * Generated class for the EnviarMensajePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-enviar-mensaje',
  templateUrl: 'enviar-mensaje.html',
  providers: [HttpProvider]
})
export class EnviarMensajePage {
  asunto:any;
  mensaje:any;
  remitente:any;
  usuario:Usuario;
  buzonJunta:BuzonJunta;
  fecha:any;
  fech:any;
  f:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) 
            {
             this.usuario=new Usuario();
             this.usuario.setId(firebase.auth().currentUser.uid);
             this.buzonJunta=new BuzonJunta();
             this.f=new Date();  
             this.fech={
                        dia:this.f.getDate(),
                        mes:this.f.getMonth()+1,
                        ano:this.f.getFullYear()
                       }
             this.fecha=this.fech.dia+"/"+this.fech.mes+"/"+this.fech.ano;
            }



enviarMensaje()
       {
        this.usuario.buscar(this.usuario.getId()).then(snapshot => 
            {
              var mensaje={
                           Remitente:snapshot.val().nombre+" "+snapshot.val().apellido,
                           Asunto:this.asunto,
                           Mensaje:this.mensaje,
                           Fecha:this.fecha,
                           RemitenteID:this.usuario.getId()
                          }
 this.buzonJunta.enviarMensajeJunta(mensaje);
 var texto="Su mensaje ha sido enviado exitosamente"
 this.navCtrl.push(ImprimirMensajePage,{mensaje:texto});
	});
  


}

}

