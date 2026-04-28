import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyConversionService } from '@core/services/currency-conversion.service';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '@core/guards/can-deactivate.guard';

@Component({
    selector: 'app-currency-conversion',
    templateUrl: './currency-conversion.component.html',
    styleUrls: ['./currency-conversion.component.css'],
    standalone: false
})
export class CurrencyConversionComponent implements OnInit, CanComponentDeactivate {
    conversionForm!: FormGroup;
    conversionResult: any = null;
    loading = false;
    error = '';
    currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'CHF'];
    formDirty = false;

    constructor(
        private formBuilder: FormBuilder,
        private currencyConversionService: CurrencyConversionService
    ) {
        this.initializeForm();
    }

    ngOnInit(): void {
        // Initial load if needed
    }

    initializeForm(): void {
        this.conversionForm = this.formBuilder.group({
            from: ['USD', Validators.required],
            to: ['INR', Validators.required],
            quantity: [1, [Validators.required, Validators.min(0.01)]]
        });

        this.conversionForm.valueChanges.subscribe(() => {
            this.formDirty = true;
        });
    }

    get f() { return this.conversionForm.controls; }

    convertCurrency(): void {
        if (this.conversionForm.invalid) {
            this.error = 'Please fill in all fields correctly';
            return;
        }

        this.loading = true;
        this.error = '';

        const { from, to, quantity } = this.conversionForm.value;

        this.currencyConversionService.convertCurrency(from, to, quantity).subscribe({
            next: (response) => {
                this.conversionResult = response;
                this.loading = false;
                this.formDirty = false;
            },
            error: (error) => {
                this.error = 'Conversion failed. Please try again.';
                this.loading = false;
                console.error('Conversion error:', error);
            }
        });
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.formDirty) {
            return confirm('You have unsaved changes. Do you want to leave?');
        }
        return true;
    }

    reset(): void {
        this.conversionForm.reset({
            from: 'USD',
            to: 'INR',
            quantity: 1
        });
        this.conversionResult = null;
        this.error = '';
        this.formDirty = false;
    }
}
