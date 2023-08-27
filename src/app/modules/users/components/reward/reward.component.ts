import { Component, OnInit } from '@angular/core';
import { RewardService } from '../reward.service';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {

  couponCode: string;

  constructor(private _rewardService: RewardService,
    private _snackbar: SnackbarServiceService) { }

  ngOnInit(): void {

  }

  async claimReward() {
    let accessToken: any = await localStorage.getItem('accessToken')
    let data = {
      token: accessToken,
      code: this.couponCode
    }
    this._rewardService.claimCoupom(data).subscribe((res: any) => {
      this._snackbar.success("Claimed", 4000);
    },
      (error) => {
        console.log(error)
        this._snackbar.error(error.error.message, 4000);
      })
  }
}
