import { Component } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import { ItemDetailPage } from '../../pages/item-detail/item-detail';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selectedItem: any;
  icons: string[];
  //items: Array<{title: string, note: string, icon: string}>;
  //items: any = '';  
  items =[];
  page = 1;
  perPage = 4;
  totalData = 0;
  totalPage = 0;
  data : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public restProvider: RestProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    //this.presentLoading(); 
    this.getAllPendingApproval();   

  }

  getAllPendingApproval() {
    this.restProvider.getAllPendingApproval()
    .then(data => {
      this.items = data['ALL_RECORDS'];      
      //console.log(JSON.stringify(data));
      //console.log(data['ALL_RECORDS']);
      
    });
  }

  goToItemDetail(event, item) {
    // That's right, we're pushing to ourselves!
    // this.navCtrl.push(SessionDetailPage, { sessionId: sessionData.id, name: sessionData.name });
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      spinner:'dots',
      content: "Please wait...",
      duration: 1000
    });
    loader.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');    
    setTimeout(() => {

    // this.restProvider.getAllPendingApproval()
    // .then(data => {
    //   this.items = data['ALL_RECORDS']; 

    //   this.perPage = this.data.per_page;
    //   this.totalData = this.data.total;
    //   this.totalPage = this.data.total_pages;

    //   for (let i = 0; i < this.items.length; i++) {
    //     this.items.push( this.items[i] );
    //   }
      
    // });      

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

}
