import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CurrencyExchangeComponent } from './components/currency-exchange/currency-exchange.component';

const routes: Routes = [
    {
        path: '',
        component: CurrencyExchangeComponent
    }
];

@NgModule({
    declarations: [CurrencyExchangeComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export class CurrencyExchangeModule { }
