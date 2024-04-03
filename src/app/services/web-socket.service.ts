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

  connectSocket(message: any) {
    this.webSocket.emit("connect", message);
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
