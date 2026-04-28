import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'currency-exchange',
        loadChildren: () => import('./modules/currency-exchange/currency-exchange.module').then(m => m.CurrencyExchangeModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'currency-conversion',
        loadChildren: () => import('./modules/currency-conversion/currency-conversion.module').then(m => m.CurrencyConversionModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'limits',
        loadChildren: () => import('./modules/limits/limits.module').then(m => m.LimitsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
