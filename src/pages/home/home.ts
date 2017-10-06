import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import firebase from 'firebase';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {InAppBrowser} from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {

  public domainsList: Array<any>;
  public loadedDomainsList: Array<any>;
  public domainsRef: firebase.database.Reference;

  constructor(public sanitizer: DomSanitizer, private iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams) {
    this.domainsRef = firebase.database().ref('/domains');

    // const browser = this.iab.create('https://www.google.com.co/');

    this.domainsRef.set({
      "some": {
        originalDomain: "www.lamoda.ua",
        subid: "jdfef8fjf8efwefewh7hf7fhf7wef7hw",
        marketing_text: "вам доступен cashback 5%"
      }
    });

    this.domainsRef.on('value', domainsList => {
      let domains = [];
      domainsList = domainsList.val();
      for (let obj in domainsList) {
        domains.push(domainsList[obj]);
      }

      console.log(domains);

      (<any>window).domains = domains;
      this.domainsList = domains;
      this.loadedDomainsList = domains;
    });
  }

  gcsesearch: SafeHtml;

  ngOnInit() {
    this.gcsesearch = this.sanitizer.bypassSecurityTrustHtml("<gcse:search linktarget=\"_parent\"></gcse:search>");
    let cx = '009046662989887159290:vdj3wqiaht8';
    let gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    let s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
    // console.log(document.getElementsByClassName("gsc-search-button")[0]);
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
    this.domainsList[0].originalDomain = "linkedin.com";
    console.log(q, this.domainsList);
  }

  closeFrame() {
    let baseFrame = document.body.querySelector(".base-frame") as HTMLIFrameElement;
    baseFrame.style.display = "none";
    let searchContent = document.body.querySelector(".gsc-results-wrapper-visible") as HTMLUnknownElement;
    if (searchContent) searchContent.style.display = "block";
    let closeButton = document.body.querySelector("#close-frame") as HTMLButtonElement;
    closeButton.style.display = "none";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    window.onclick = function(e) {
      let node = e.target as HTMLAnchorElement;
      while (node != undefined && node.localName != 'a') {
        node = node.parentNode as HTMLAnchorElement;
      }
      let baseRef = '';
      if (node != undefined) {
        let match = node.dataset.ctorig.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
        if (match != null) {
          console.log(match);
          baseRef = 'http://' + match[2];
        }

        for (let i = 0; i < (<any>window).domains.length; i++) {
          if ((<any>window).domains[i].originalDomain === match[2]) {
            baseRef += '/c/4153/default-women/?is_new=1&genders=women';
            // baseRef += '/' + (<any>window).domains[i].somePopupTrigger...;
            break;
          }
        }
        console.log(node.dataset.ctorig);
        let searchContent = document.body.querySelector(".gsc-results-wrapper-visible") as HTMLUnknownElement;
        searchContent.style.display = "none";
        let baseFrame = document.body.querySelector(".base-frame") as HTMLIFrameElement;
        baseFrame.style.display = "block";
        let closeButton = document.body.querySelector("#close-frame") as HTMLButtonElement;
        closeButton.style.display = "block";
        baseFrame.src = baseRef;
        baseFrame.onload = function() {
          baseFrame.style.background = '';
        };

        return false;
      }
    };
    // window.onload = function () {
    //   let searchButton = document.body.querySelector(".gsc-search-button") as HTMLInputElement;
    //   let textSearch = document.body.querySelector("#gsc-i-id1") as HTMLInputElement;
    //   let chosedRef = document.body.querySelector(".gs-title");
    //   if (chosedRef) {
    //     chosedRef.addEventListener("click", (event) => {
    //       console.log(event);
    //       event.stopImmediatePropagation();
    //       event.preventDefault();
    //       return false;
    //     });
    //   }
    //   if (searchButton) {
    //     searchButton.addEventListener("click", () => {
    //       console.log(textSearch.value);
    //     });
    //   }
    // };
  }
}
