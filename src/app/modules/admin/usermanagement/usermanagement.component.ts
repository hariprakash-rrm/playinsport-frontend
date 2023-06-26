import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-usermanagement',
    templateUrl: './usermanagement.component.html',
    styleUrls: ['./usermanagement.component.css'],
})
export class UsermanagementComponent {

    users = [
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Smith', email: 'jane@example.com' },
        { name: 'Bob Johnson', email: 'bob@example.com' },
    ];
}
