import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable, catchError, throwError } from "rxjs";
import { ApiResponse, Asset } from "../models/coin.model";

const base_url = environment.base_url;

@Injectable({
  providedIn: "root",
})
export class CoinsService {
  constructor(private http: HttpClient) {}

  getAssets(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${base_url}/assets/`).pipe(
      catchError(() => {
        console.error("Failed to fetch assets");
        return throwError(
          () => "Failed to fetch assets. Please try again later."
        );
      })
    );
  }
}
