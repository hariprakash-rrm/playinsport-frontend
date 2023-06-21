import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarServiceService {

  constructor(
    private _snackBar: MatSnackBar) {
  }

  error(message: string, duration: number) {
    return this._snackBar.open(message, undefined, { panelClass: ['snackbar-error'], duration });
  }

  success(message: string, duration: number) {
    return this._snackBar.open(message, undefined, { panelClass: ['snackbar-success'], duration });
  }

  info(message: string, duration: number) {
    return this._snackBar.open(message, undefined, { panelClass: ['snackbar-info'], duration });
  }
}
