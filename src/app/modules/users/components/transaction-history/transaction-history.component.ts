import { Component, OnInit } from '@angular/core';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls      : ['./transaction-history.component.css'],
})
export class TransactionHistoryComponent implements OnInit {
  errorMessage: any;
  transactionHistory: [];

  constructor(private _snackBar: SnackbarServiceService,
    private _userService: UserService) { }

  ngOnInit(): void {
    this.viewTransactionHistory();
  }

  viewTransactionHistory() {
    // console.log("HELLO")
    const token = localStorage.getItem('accessToken');
    
    this._userService.getTransactionHistory(token).subscribe(
      (response: any) => {
        // console.log("response", response);
        // console.log(response.data.data);
        this.transactionHistory = response.data.data;
        if (response.statusCode === 201) {
          this.errorMessage = '';
        }
      },
      (error) => {
        this._snackBar.error(error.error.message, 4000);
        // // console.log(error);
      }
    )
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}

