import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
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

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private apiUrl = environment.apiUrl;
    showTxnHistory = false;

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
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
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
                        if (response.statusCode === 201) {
                            this.errorMessage = '';
                            this.userName = response.data.username;
                            this.phonenumber = response.data.number;
                            this.wallet = response.data.wallet;
                            this.txnHistory = Object.values(response.data.txnHistory);
                        }

                        if (response.data.isAdmin) {
                            this.currentNavigation = this.navigation.compact;
                        } else {
                            this.currentNavigation = this.navigation.default;
                        }
                    },
                   
                    (error) => {
                        this._snackBar.error(error.error.message, 4000);
                        console.log(error);
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

    viewWallet(): void{
        // this.currentPage = 2;
        this.showPopup = true;
    }
    viewTransaction(): void{
        this.showTxnHistory = true;
    }
    closePopup(): void{
        this.showPopup = false;
    }
}
