import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_GATEWAY_URL = environment.apiGatewayUrl;

@Injectable({
    providedIn: 'root'
})
export class CurrencyConversionService {
    private apiUrl = `${API_GATEWAY_URL}/currency-conversion`;

    constructor(private http: HttpClient) { }

    convertCurrency(from: string, to: string, quantity: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/from/${from}/to/${to}/quantity/${quantity}`);
    }

    getConversionHistory(): Observable<any> {
        return this.http.get(`${this.apiUrl}/history`);
    }
}
