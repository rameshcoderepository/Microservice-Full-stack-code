import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_GATEWAY_URL = environment.apiGatewayUrl;

@Injectable({
    providedIn: 'root'
})
export class LimitsService {
    private apiUrl = `${API_GATEWAY_URL}/limits-service`;

    constructor(private http: HttpClient) { }

    getLimits(): Observable<any> {
        return this.http.get(`${this.apiUrl}/limits`);
    }

    updateLimits(limits: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/limits`, limits);
    }
}
