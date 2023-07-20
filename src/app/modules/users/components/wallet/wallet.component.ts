import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'app/mock-api/common/user/data';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
import { WalletService } from '../wallet.service';
import { ClassyLayoutComponent } from 'app/layout/layouts/vertical/classy/classy.component';
import { Subject } from 'rxjs';

interface Option {
  label: string;
  value: any;
}

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  options: Option[] = [
    { label: 'Gpay', value: 'gpay' },
    { label: 'PhonePe', value: 'PhonePe' },
    { label: 'Paytm', value: 'paytm' },
    { label: 'BHIM', value: 'bhim' }
  ];

  depositForm: FormGroup
  activeTab: string = 'deposit';
  withdrawNumber: string = '';
  withdrawAmount: string = '';
  payMethod: any;
  names: any
  selectedValue: any;
  phoneNumberOfUser: any;


  constructor(private snackBar: SnackbarServiceService,
    private formBuilder: FormBuilder,
    private _walletService: WalletService, private _classyComponent: ClassyLayoutComponent) { }

  ngOnInit(): void {
    this._classyComponent.name$.subscribe((res: any) => {
      this.names = res
    })

    this._classyComponent.number$.subscribe((res:any)=> {
      this.phoneNumberOfUser = res
    })

    this.depositForm = this.formBuilder.group({
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{10}'),
      ]),
      amount: ['', Validators.required],
      transactionId: ['', [Validators.required]],
    });
  }

  get mobileNumber() {
    return this.depositForm.get('mobileNumber');
}


  // handleFileInput(event: any) {
  //   // Handle file input logic here
  //   const file: File = event.target.files[0];

  //   if (file) {
  //     console.log(file.type);
  //     // Check if the file type is allowed (PNG, JPG, or JPEG)
  //     if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
  //       // Check if the file size is within the allowed limit (e.g., 2MB)
  //       const maxFileSizeInBytes = 2 * 1024 * 1024; // 2MB
  //       if (file.size <= maxFileSizeInBytes) {
  //         // The file is valid, you can handle the file upload here
  //         this.snackBar.success(`File is valid. Type:', ${file.type}, 'Size:', ${file.size}`, 4000)
  //       } else {
  //         // File size exceeds the limit
  //         this.snackBar.error('File size exceeds the limit', 4000);
  //       }
  //     } else {
  //       // File type is not allowed
  //       this.snackBar.error('File type not allowed. Only PNG, JPG, or, JPEG files are allowed', 4000);
  //     }
  //   }
  // }

  walletTransaction(): void {

    if (this.depositForm.valid) {
      let data = {
        transactionId: this.depositForm.value.transactionId,
        amount: this.depositForm.value.amount,
        mobileNumber: this.depositForm.value.mobileNumber,
        paymentMethod: this.selectedValue,
        userPhoneNumber: this.phoneNumberOfUser
      }
      this._walletService.walletTransaction(data).subscribe(
        (response) => {
          console.log(response);
          if (response.statusCode === 201) {
            console.log(response);
            this.snackBar.success(response.message, 4000);
          }
        },
        (error) => {
          this.snackBar.error(error.error.message, 4000);
        }
      );
    }
  }
  // submitDeposit() {
  //   // Handle deposit submission logic here
  // }

  // submitWithdraw() {
  //   // Handle withdraw submission logic here
  // }
  selectItem() {
    this.selectedValue = this.payMethod.label;
  }

}
