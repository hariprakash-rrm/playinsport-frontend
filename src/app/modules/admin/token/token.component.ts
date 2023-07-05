import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
} from '@angular/forms';

@Component({
    selector: 'app-token',
    templateUrl: './token.component.html',
    styleUrls: ['./token.component.css'],
})
export class TokenComponent implements OnInit {
    maximumTokenPerUser: number;
    name: string;
    date: number;
    totalTokenNumber: number;
    prize: number;
    tokenPrice: number;
    tokenForm: FormGroup;

    constructor() {}

    ngOnInit(): void {}
}
