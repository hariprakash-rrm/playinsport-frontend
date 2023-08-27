import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
})
export class CouponComponent implements OnInit {


  createCouponDto = {
    coupon: '',
    value: '',
    validFor: [],
    validFrom: '',
    validUpto: '',
    canUse:''
  };

  validForInput: string = '';
  constructor(private _adminService: AdminService,
    private _snackBar: SnackbarServiceService) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    let accessToken: any = await localStorage.getItem('accessToken')
    const validForArray = this.validForInput.split(',').map(item => parseInt(item.trim(), 10));
    this.createCouponDto.validFor = validForArray;
    let data = {
      code: this.createCouponDto.coupon,
      value: this.createCouponDto.value,
      validFor: this.createCouponDto.validFor,
      validFrom: this.createCouponDto.validFrom,
      validUpto: this.createCouponDto.validUpto,
      token: accessToken,
      canUse: this.createCouponDto.canUse
    }
console.log(data)
    this._adminService.createCoupon(data).subscribe((res: any) => {
      this._snackBar.success(res.data.message, 4000);
    }, (error: any) => {
      this._snackBar.error(error.error.message, 4000)
    })
  }
}

