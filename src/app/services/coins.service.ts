import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";

const base_url = environment.base_url;

@Injectable({
  providedIn: "root",
})
export class CoinsService {
  constructor(private http: HttpClient) {}

  getAssets() {
    return this.http.get(`${base_url}/assets/`);
  }
}
