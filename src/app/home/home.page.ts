import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
/*Para formulários, importar ReactiveFormsModule*/
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  public formLogin: FormGroup;

  public mensagens_validacao = {
    email: [
      {tipo: 'required', mensagem: "O campo Email é obrigatório. "},
      {tipo: 'email', mensagem:"Email inválido"},
    ],
    senha: [
      {tipo: 'required', mensagem: "É obrigatório digitar a senha "},
      {tipo: 'minLength', mensagem: "A senha deve ter pelo menos 6 caracteres"},
      {tipo: 'maxLength', mensagem: "A senha deve ter no máximo 8 caracteres"}
    ],
  };
  
  
  constructor(public formBuilder: FormBuilder, public alertController: AlertController, public router:Router) {

    this.formLogin = formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(8), Validators.required])]
    });
  }
  public login(){
    if(this.formLogin.valid){
let email =this.formLogin.value.email;
let senha = this.formLogin.value.senha;

if (email == "admin@admin.com" && senha == "123456"){
  this.router.navigateByUrl('painel-usuario');
}else{
  this.alertUserInvalid();
}


    }else{
this.alertFormInvalid();
    }
  } 

  async alertFormInvalid(){
    const alert = await this.alertController.create({
      header: 'ERRO!',
      message: 'Formulário inválido, confira os dados',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertUserInvalid(){
    const alert = await this.alertController.create({
      header: 'ERRO!',
      message: 'Email/Senha inválidos, confira os dados',
      buttons: ['OK']
    });

    await alert.present();
  }

}
