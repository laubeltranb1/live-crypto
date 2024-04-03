import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { environment } from "../environments/environment";

const ws_url = environment.ws_url;
@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  private webSocket: Socket;
  constructor() {
    this.webSocket = new Socket({
      url: `${ws_url}/prices?assets=ALL`,
      options: {},
    });
  }

  connectSocket() {
    this.webSocket.emit("connect", {
      apikey: "c7bf1e64-ab68-48c5-b28f-72541bbb1f02",
      heartbeat: false,
      subscribe_data_type: ["trade"],
      subscribe_filter_asset_id: ["BTC", "ETH"],
    });
  }

  receiveStatus() {
    return this.webSocket.fromEvent("/get-response");
  }
  listenToWebSocket() {
    return this.webSocket.fromEvent("websocket-event");
  }

  disconnectSocket() {
    this.webSocket.disconnect();
  }
}
