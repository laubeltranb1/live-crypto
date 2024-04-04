import { Injectable } from "@angular/core";
import { WebSocketSubject } from "rxjs/webSocket";
import { Socket } from "ngx-socket-io";
import { environment } from "../environments/environment";
import { AssetPrice } from "../models/coin.model";

const ws_url = environment.ws_url;
@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  private socket$: WebSocketSubject<AssetPrice>;
  constructor() {
    this.socket$ = new WebSocketSubject<AssetPrice>(
      `${ws_url}/prices?assets=ALL`
    );
  }
  getWebSocket() {
    return this.socket$;
  }

  ngOnDestroy(): void {
    this.socket$.complete();
  }
}
