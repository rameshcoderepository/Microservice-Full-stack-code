import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { LoadingService } from '@core/services/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
    title = 'Microservices Dashboard';
    isLoading$ = this.loadingService.loading$;
    isAuthenticated$ = this.authService.isAuthenticated$;

    constructor(
        private authService: AuthService,
        private loadingService: LoadingService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.authService.checkAuthentication();
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/home']);
    }

    navigate(route: string): void {
        this.router.navigate([route]);
    }
}
