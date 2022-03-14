import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './sevices/api.service';
import { TransactionService } from './sevices/transactions.service';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { NewTransactionComponent } from './components/new-transaction/new-transaction.component';
import { HttpClientModule } from '@angular/common/http';
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
    NgbModule
  ],
  providers: [ApiService, TransactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
