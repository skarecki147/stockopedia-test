import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { TransactionTypeEnum } from 'src/app/shared/models/transaction-type.enum';
import { TransactionService } from 'src/app/sevices/transactions.service';
import { TransactionModel } from 'src/app/shared/models/transaction.model';


@Component({
    selector: 'app-new-transaction',
    templateUrl: './new-transaction.component.html',
    styleUrls: ['./new-transaction.component.scss']
})
export class NewTransactionComponent implements OnInit {

    title = 'stockopedia-test';
    editing = false;
    public transactionTypeEnum = TransactionTypeEnum;
    newTransactionForm = new FormGroup({
        value: new FormControl(),
        type: new FormControl(),
        date: new FormControl(),
        security: new FormControl(),
        shares: new FormControl(),
    });

    submittedTransaction: TransactionModel;

    constructor(private _transactionService: TransactionService) { }

    ngOnInit(): void {

    }

    onSubmit(submittedTransaction: TransactionModel) {
        submittedTransaction.cashflow = submittedTransaction.type === ('buy' || 'withdraw') ? submittedTransaction.value : -submittedTransaction.value;
        this._transactionService.addTransaction(submittedTransaction);
        this.newTransactionForm.reset();
    }
}
