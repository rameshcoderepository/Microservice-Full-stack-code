import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CurrencyConversionComponent } from './components/currency-conversion/currency-conversion.component';
import { CanDeactivateGuard } from '@core/guards/can-deactivate.guard';

const routes: Routes = [
    {
        path: '',
        component: CurrencyConversionComponent,
        canDeactivate: [CanDeactivateGuard]
    }
];

@NgModule({
    declarations: [CurrencyConversionComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export class CurrencyConversionModule { }
