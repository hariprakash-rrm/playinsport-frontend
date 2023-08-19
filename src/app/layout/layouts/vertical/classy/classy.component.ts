import { Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { SnackbarServiceService } from 'app/shared/snackbar-service.service';
@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    navigation: Navigation;
    user: User;
    isAdmin: boolean = true;
    currentNavigation: FuseNavigationItem[];
    errorMessage: string;
    userName: string;
    phonenumber: number;
    wallet: number | null;
    txnHistory: any | null;
    currentPage: number = 1;
    showPopup: boolean;
    private nameSubject = new Subject<any>();
    name$ = this.nameSubject.asObservable();
    showPopupForUser: boolean;

    private numberSubject = new Subject<any>();
    number$ = this.numberSubject.asObservable();

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private apiUrl = environment.apiUrl;
    showTxnHistory = false;

    private inactivityTimeout: number = 3 * 60 * 1000; // 30 minutes

    private inactivityTimer: any;

    private referralCode: any;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _userService: UserService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private _httpClient: HttpClient,
        private _snackBar: SnackbarServiceService
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }
    updateName(value: any) {
        this.nameSubject.next(value);
    }
    updateNumber(value: any) {
        this.numberSubject.next(value);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                this.navigation = navigation;
            });


        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {

            this._userService.getUserDetails(accessToken).subscribe(
                (response) => {
                    console.log(response);
                    if (response.statusCode === 201) {
                        this.errorMessage = '';
                        this.userName = response.data.username;
                        this.phonenumber = response.data.number;
                        this.wallet = response.data.wallet;
                        this.referralCode= response.data.referralCode;
                        this.txnHistory = Object.values(response.data.txnHistory);
                        this.updateName(this.userName)
                        this.updateNumber(this.phonenumber);

                    }

                    if (response.data.isAdmin) {
                        this.currentNavigation = this.navigation.compact;
                    } else {
                        this.currentNavigation = this.navigation.default;
                    }
                },

                (error) => {
                    this._snackBar.error(error.error.message, 4000);
                    // console.log(error);
                    localStorage.clear()
                    window.location.reload()
                }
            ),

                // Subscribe to the user service
                this._userService.user$
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((user: User) => {
                        this.user = user;
                    });

            // Subscribe to media changes
            this._fuseMediaWatcherService.onMediaChange$
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(({ matchingAliases }) => {
                    // Check if the screen is small
                    this.isScreenSmall = !matchingAliases.includes('md');
                });
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }

    viewWallet(): void {
        // this.currentPage = 2;
        this.showPopup = true;
    }
    viewTransaction(): void {
        this.showTxnHistory = true;
    }
    closePopup(): void {
        this.showPopup = false;
    }
    viewUserDetails(): void {
        this.showPopupForUser = !this.showPopupForUser;
    }
    refresh(): void {
        window.location.reload();
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

