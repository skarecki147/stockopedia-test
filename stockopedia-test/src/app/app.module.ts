import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewTransactionComponent } from './components/new-transaction/new-transaction.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { ApiService } from './sevices/api.service';
import { TransactionService } from './sevices/transactions.service';
import { CurrencyWithSign } from './shared/pipes/currency-with-sign.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TransactionsComponent,
    NewTransactionComponent,
    CurrencyWithSign
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [ApiService, TransactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
