import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  rests:  Observable<any>;  
  
  apiUrl = 'https://uatcbd.srei.com/SaleApprovalApp/SAService/';
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getAllPendingApproval() {   
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'all').subscribe(data => { 
         
        resolve(data);
      }, err => {
        console.log(err);
      });
    }); 
    
  }

  getPendingItemDetail(ContractId,AssetId) {   
    return new Promise(resolve => {
      this.http.get(this.apiUrl+ContractId+'/'+AssetId).subscribe(data => {          
        resolve(data);
      }, err => {
        console.log(err);
      });
    }); 
    
  }

  postDataForSave(postData) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'save', postData)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
