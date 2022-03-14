import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { TransactionTypeEnum } from 'src/app/shared/models/transaction-type.enum';


@Component({
    selector: 'app-new-transaction',
    templateUrl: './new-transaction.component.html',
    styleUrls: ['./new-transaction.component.scss']
})
export class NewTransactionComponent implements OnInit {

    title = 'stockopedia-test';
    transactionTypes: TransactionTypeEnum;

    newTransactionForm = new FormGroup({
        value: new FormControl(),
        type: new FormControl(),
        date: new FormControl(),
        cashflow: new FormControl(),
    })

    ngOnInit(): void {
        console.log(Object.keys(TransactionTypeEnum))
        // Object.keys(TransactionTypeEnum)
    }

    onSubmit() {
        console.log(this.newTransactionForm.value);
    }

}
