import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';

@Component({
  selector: 'app-refer-and-earn',
  templateUrl: './refer-and-earn.component.html',
  styleUrls: ['./refer-and-earn.component.scss']
})
export class ReferAndEarnComponent implements OnInit {
  referralCode:any
  constructor(private _userService: UserService,
    private _snackBar: SnackbarServiceService) { }

  ngOnInit(): void {

    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {

      this._userService.getUserDetails(accessToken).subscribe(
        (response) => {
          // console.log(response);
          if (response.statusCode === 201) {
            
            this.referralCode = response.data.referralCode;
            
          }

        },
    (error) => {
      this._snackBar.error(error.error.message, 4000);
      // // console.log(error);
      localStorage.clear()
      window.location.reload()
    }
      )
  }
  }
  copyToClipboard() {
    // Create a temporary input element
    const input = document.createElement('input');
    input.value = this.referralCode;

    // Append the input element to the body
    document.body.appendChild(input);

    // Select the input text and copy it to the clipboard
    input.select();
    document.execCommand('copy');

    // Remove the input element from the DOM
    document.body.removeChild(input);

    // Notify the user that the link has been copied
    alert('Referral link copied to clipboard');
  }
}
