import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap, catchError, tap, share, retryWhen } from 'rxjs/operators';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class InsertAuthTokenInterceptor implements HttpInterceptor {
    private retryRequest = 'retryRequest';
    constructor(private adal: MsAdalAngular6Service) { }

    private refreshToken = this.adal.acquireToken(environment.adalConfig.clientId).pipe(
        tap(token => {
            if (token) {
                throw this.retryRequest;
            }
        }),
        share(),
    ) as Observable<any>;

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        // get api url from adal config
        const resource = this.adal.GetResourceForEndpoint(req.url);
        if (!resource) {
            return next.handle(req);
        }

        // merge the bearer token into the existing headers
        return this.adal.acquireToken(resource).pipe(
            mergeMap((token: string) => {
                const authorizedRequest = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${token}`),
                });
                return next.handle(authorizedRequest);
            }),
            catchError((error: Error | string) => {
                if ((error instanceof HttpErrorResponse && error.status === 401) ||
                    (typeof(error) === 'string' && error === 'Token renewal operation failed due to timeout')) {
                    this.adal.login();
                    return this.refreshToken;
                } else {
                    throw error;
                }
            }),
            retryWhen(err$ =>
                err$.pipe(
                    tap(err => {
                        if (err !== this.retryRequest) {
                            throw err;
                        }
                    })
                )
            ));
    }
}
