import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyExchangeService } from '@core/services/currency-exchange.service';

@Component({
    selector: 'app-currency-exchange',
    templateUrl: './currency-exchange.component.html',
    styleUrls: ['./currency-exchange.component.css'],
    standalone: false
})
export class CurrencyExchangeComponent implements OnInit {
    exchangeForm!: FormGroup;
    exchangeRates: any = null;
    loading = false;
    error = '';
    currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'CHF'];

    constructor(
        private formBuilder: FormBuilder,
        private currencyExchangeService: CurrencyExchangeService
    ) {
        this.initializeForm();
    }

    ngOnInit(): void {
        this.loadAllExchangeRates();
    }

    initializeForm(): void {
        this.exchangeForm = this.formBuilder.group({
            from: ['USD', Validators.required],
            to: ['INR', Validators.required]
        });
    }

    get f() { return this.exchangeForm.controls; }

    getExchangeRate(): void {
        if (this.exchangeForm.invalid) {
            this.error = 'Please select valid currencies';
            return;
        }

        this.loading = true;
        this.error = '';

        const { from, to } = this.exchangeForm.value;

        this.currencyExchangeService.getExchangeRate(from, to).subscribe({
            next: (response) => {
                this.exchangeRates = response;
                this.loading = false;
            },
            error: (error) => {
                this.error = 'Failed to fetch exchange rate. Please try again.';
                this.loading = false;
                console.error('Exchange rate error:', error);
            }
        });
    }

    loadAllExchangeRates(): void {
        this.loading = true;
        this.currencyExchangeService.getAllExchangeRates().subscribe({
            next: (response) => {
                this.loading = false;
            },
            error: (error) => {
                this.loading = false;
                console.error('Load error:', error);
            }
        });
    }
}
