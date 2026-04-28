import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LimitsService } from '@core/services/limits.service';

@Component({
    selector: 'app-limits',
    templateUrl: './limits.component.html',
    styleUrls: ['./limits.component.css'],
    standalone: false
})
export class LimitsComponent implements OnInit {
    limitsForm!: FormGroup;
    currentLimits: any = null;
    loading = false;
    error = '';
    success = '';
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private limitsService: LimitsService
    ) {
        this.initializeForm();
    }

    ngOnInit(): void {
        this.loadLimits();
    }

    initializeForm(): void {
        this.limitsForm = this.formBuilder.group({
            maximum: [1000, [Validators.required, Validators.min(100)]],
            minimum: [10, [Validators.required, Validators.min(1)]]
        });
    }

    get f() { return this.limitsForm.controls; }

    loadLimits(): void {
        this.loading = true;
        this.error = '';

        this.limitsService.getLimits().subscribe({
            next: (response) => {
                this.currentLimits = response;
                this.limitsForm.patchValue({
                    maximum: response.maximum,
                    minimum: response.minimum
                });
                this.loading = false;
            },
            error: (error) => {
                this.error = 'Failed to load limits. Using default values.';
                this.loading = false;
                console.error('Load limits error:', error);
            }
        });
    }

    updateLimits(): void {
        this.submitted = true;
        this.error = '';
        this.success = '';

        if (this.limitsForm.invalid) {
            this.error = 'Please fill in all fields correctly';
            return;
        }

        const { maximum, minimum } = this.limitsForm.value;

        if (minimum >= maximum) {
            this.error = 'Minimum value must be less than maximum value';
            return;
        }

        this.loading = true;

        const limitsData = {
            maximum,
            minimum
        };

        this.limitsService.updateLimits(limitsData).subscribe({
            next: (response) => {
                this.currentLimits = response;
                this.success = 'Limits updated successfully!';
                this.loading = false;
                this.submitted = false;
                setTimeout(() => this.success = '', 3000);
            },
            error: (error) => {
                this.error = 'Failed to update limits. Please try again.';
                this.loading = false;
                console.error('Update limits error:', error);
            }
        });
    }

    resetForm(): void {
        if (this.currentLimits) {
            this.limitsForm.patchValue({
                maximum: this.currentLimits.maximum,
                minimum: this.currentLimits.minimum
            });
        }
        this.submitted = false;
        this.error = '';
        this.success = '';
    }
}
