import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import firebase from 'firebase';
import { DomSanitizer } from '@angular/platform-browser';
import {InAppBrowser} from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  public sanitized;
  public domainsList: Array<any>;
  public loadedDomainsList: Array<any>;
  public domainsRef: firebase.database.Reference;

  constructor(public sanitizer: DomSanitizer, private iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams) {
    this.domainsRef = firebase.database().ref('/domains');

    // const browser = this.iab.create('https://ionicframework.com/');

    this.domainsRef.set({"some": {
      originalDomain: "http://lamoda.ua/",
      subid: "jdfef8fjf8efwefewh7hf7fhf7wef7hw",
      marketing_text: "вам доступен cashback 5%"
    }});

    this.domainsRef.on('value', domainsList => {
      let domains = [];
      domainsList = domainsList.val();
      for (let obj in domainsList) {
        domains.push(domainsList[obj]);
      }
      console.log(domains);

      this.domainsList = domains;
      this.loadedDomainsList = domains;
    });

    this.sanitized = sanitizer.bypassSecurityTrustResourceUrl(this.domainsList[0].originalDomain);
  }

  ngOnInit() {
    // const browser = this.iab.create("http://jsfiddle.net/tj_vantoll/K2yqc/show", "_blank",
    //   "location=true");
  }

  initializeItems(): void {
    this.domainsList = this.loadedDomainsList;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    let q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.domainsList = this.domainsList.filter((v) => {
      if (v.originalDomain && q) {
        return v.originalDomain.toLowerCase().indexOf(q.toLowerCase()) > -1;
      }
    });

    console.log(q, this.domainsList);
  }

  getHostName(url) {
    let match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
      return match[2];
    }
    else {
      return null;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
}
