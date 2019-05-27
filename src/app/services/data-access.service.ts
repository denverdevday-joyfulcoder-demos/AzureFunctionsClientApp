import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataAccessService {
    private functionUrl = 'https://laurie-denver-devday.azurewebsites.net/api/ratings';

    constructor(protected httpClient: HttpClient) { }

    getRating(score: number) {
        return this.httpClient.get(`${this.functionUrl}?score=${score}`, {responseType: 'text'})
            .pipe(
                catchError(this.handleError)
            );
    }

    getRatingForList(scoreList: Array<number>) {
        return this.httpClient.post(`${this.functionUrl}`, { scores: scoreList }, {responseType: 'text'})
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(response: HttpErrorResponse) {
        const errMsg = (response.error) ? response.error : response.status ?
            `${response.status} - ${response.statusText}` : 'Server error';
        return throwError(errMsg);
    }
}
