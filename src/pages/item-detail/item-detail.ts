import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';


@Component({
    selector: 'item-detail',
    templateUrl: 'item-detail.html'
  })

  export class ItemDetailPage {
    item: any;
    itemdtl:any;
    itempost: any;
    text_comment:string;
    form_valid_error:string = '';
    constructor(       
        public navParams: NavParams,public alerCtrl: AlertController,public loadingCtrl: LoadingController,public restProvider: RestProvider
    ) {
        this.item=this.navParams.get('item');
        let ContractId=this.item.CONTRACT_ID;
        let AssetId=this.item.ASSET_NO;
        this.presentLoading();   
        this.getPendingItemDetail(ContractId,AssetId);
    }

    presentLoading() {
        const loader = this.loadingCtrl.create({
          spinner:'dots',
          content: "Please wait...",
          duration: 2000
        });
        loader.present();
      }

    getPendingItemDetail(ContractId,AssetId) {
         this.restProvider.getPendingItemDetail(ContractId,AssetId)
        .then(data => { 
          this.itemdtl=data;
          console.log('====');
          //console.log(data);                

        });
      }

      doConfirm(event,item) {
        this.form_valid_error = '';     
        let confirm = this.alerCtrl.create({
          title: 'Are you sure?',
          message: 'Do you agree to do these action?',
          buttons: [
            {
              text: 'Disagree',
              handler: () => {
                console.log('Disagree clicked');
              }
            },
            {
              text: 'Agree',
              handler: () => {
                console.log('Agree clicked');
                
                let textPattern = /^\s*[a-zA-Z0-9,\s]+\s*$/;
                if(!textPattern.test(this.text_comment))
                {
                
                 this.text_comment = ''; 
                 this.form_valid_error = 'input type should be valid';                 
                  console.log('wrong with comment');                  
                }else{
                  //console.log('ok with comment');
                  let postData ={
                    "CONTRACTNO": item.ambit_contract_id,
                    "ASSETNO": item.asset_no,
                    "ROLE": 'VC',
                    "STATUS": event,
                    "RETURN_STATUS": 'FROM VC',
                    "REMARKS": this.text_comment,
                    "CREATIONID": '12345'                   
                };
                  
                //console.log(postData);
                //console.log('1->'+this.text_comment);
                //this.postDataForSave(postData);
                }       
             
              }
            }
          ]
        });
        confirm.present()
    }

    postDataForSave(data) {
        this.restProvider.postDataForSave(data)
       .then(res => { 
         console.log(res);  
       });
     }


    ionViewWillEnter() {
        //this.item = item;
        console.log('ionViewDidLoad ContactDetailPage');
    }
  }