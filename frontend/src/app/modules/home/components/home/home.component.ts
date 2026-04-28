import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent {
    loginForm!: FormGroup;
    submitted = false;
    errorMessage = '';

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.initializeForm();
    }

    initializeForm(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get f() { return this.loginForm.controls; }

    onSubmit(): void {
        this.submitted = true;
        this.errorMessage = '';

        if (this.loginForm.invalid) {
            this.errorMessage = 'Please fill in all required fields correctly';
            return;
        }

        const credentials = {
            username: this.f['username'].value,
            password: this.f['password'].value
        };

        this.authService.login(credentials).subscribe({
            next: (response) => {
                this.router.navigate(['/dashboard']);
            },
            error: (error) => {
                this.errorMessage = 'Login failed. Please try again.';
                console.error('Login error:', error);
            }
        });
    }

    get isAuthenticated$() {
        return this.authService.isAuthenticated$;
    }
}
