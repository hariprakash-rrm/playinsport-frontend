import { Component, OnInit } from '@angular/core';
import QRCode from 'qrcode';
import { AdminService } from '../admin.service';
import * as qrcode from 'qrcode-terminal';
@Component({
  selector: 'app-qr-code',
  template: '<canvas #qrCanvas></canvas>'
})
export class QrCodeComponent implements OnInit {
  constructor(private qr:AdminService){
    
  }
  async ngOnInit() {
    let accessToken =await localStorage.getItem('accessToken');
    // let staticData = '2@gIBf3rmA9v+jwu2mZjIu8q4RY4Qyj5nr1jwu4HqWLkA5biO/QMH889omuqVIBns2kNmlQ0SmgQq+fQ==,ea/ySkulUuKH8Fe9I75nF3IdIyhabb8XcZ5SDMYRvzo=,UENZ4hqoBznYGJn9ZqoCZG12GSv5RJVWS7vxAPltin0=,CwUeb/qkXsBh9cqlq1qRCk+Lh7Pmf7GVLzriZmOdknw=,1';
   
    this.qr.getQr(accessToken).subscribe((res:string)=>{
      
      console.log(typeof(res))
      res=res.slice(1,-1)
      qrcode.generate(res, { small: true });
    })
  }
}
