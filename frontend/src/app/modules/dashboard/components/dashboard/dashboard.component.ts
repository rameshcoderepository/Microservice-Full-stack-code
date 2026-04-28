import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';

interface ServiceStatus {
    name: string;
    url: string;
    port: number;
    status: 'running' | 'pending' | 'stopped';
    description: string;
    instances?: number;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: false
})
export class DashboardComponent implements OnInit {
    currentUser$!: Observable<any>;

    services: ServiceStatus[] = [
        {
            name: 'Naming Server (Eureka)',
            url: 'http://localhost:8761',
            port: 8761,
            status: 'running',
            description: 'Service Registry & Discovery'
        },
        {
            name: 'Config Server',
            url: 'http://localhost:8888',
            port: 8888,
            status: 'running',
            description: 'Centralized Configuration Management'
        },
        {
            name: 'API Gateway',
            url: 'http://localhost:8765',
            port: 8765,
            status: 'running',
            description: 'API Entry Point & Routing'
        },
        {
            name: 'Currency Exchange Service',
            url: 'http://localhost:8000',
            port: 8000,
            status: 'running',
            description: 'Get exchange rates from database',
            instances: 3
        },
        {
            name: 'Currency Conversion Service',
            url: 'http://localhost:8100',
            port: 8100,
            status: 'running',
            description: 'Convert currencies using exchange rates',
            instances: 3
        },
        {
            name: 'Limits Service',
            url: 'http://localhost:8085',
            port: 8085,
            status: 'running',
            description: 'Transaction Limits Configuration'
        }
    ];

    features = [
        {
            title: 'Exchange Rates',
            icon: '💱',
            description: 'View real-time currency exchange rates',
            link: '/currency-exchange'
        },
        {
            title: 'Currency Conversion',
            icon: '🔄',
            description: 'Convert currencies with live rates',
            link: '/currency-conversion'
        },
        {
            title: 'Limits Management',
            icon: '⚙️',
            description: 'Configure transaction limits',
            link: '/limits'
        }
    ];

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.currentUser$ = this.authService.currentUser$;
    }

    navigateTo(link: string): void {
        this.router.navigate([link]);
    }

    openServiceUrl(service: ServiceStatus): void {
        window.open(service.url, '_blank');
    }

    getStatusColor(status: string): string {
        switch (status) {
            case 'running':
                return 'success';
            case 'pending':
                return 'warning';
            case 'stopped':
                return 'danger';
            default:
                return 'secondary';
        }
    }

    getStatusIcon(status: string): string {
        switch (status) {
            case 'running':
                return '✓';
            case 'pending':
                return '⏳';
            case 'stopped':
                return '✗';
            default:
                return '?';
        }
    }
}
