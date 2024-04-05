import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { CoinsService } from "./coins.service";
import { ApiResponse } from "../models/coin.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoinsResolver implements Resolve<Observable<ApiResponse>> {
  constructor(private coinsService: CoinsService) {}

  resolve(): Observable<ApiResponse> {
    return this.coinsService.getAssets();
  }
}
