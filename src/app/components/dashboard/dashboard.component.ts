import { Component, OnInit } from "@angular/core";
import { CoinsService } from "src/app/services/coins.service";
import { WebSocketService } from "src/app/services/web-socket.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  coinsData: any[] = [];

  constructor(
    private coinsService: CoinsService,
    private webSocketService: WebSocketService
  ) {
    this.LoadCoins();
    this.listenToWebSocket();
  }

  ngOnInit(): void {}

  LoadCoins() {
    this.coinsService.getAssets().subscribe((resp: any) => {
      this.coinsData = resp.data;
      console.log(this.coinsData);
    });
  }

  listenToWebSocket() {
    this.webSocketService.listenToWebSocket().subscribe((data: any) => {
      console.log("Received WebSocket event:", data);

      this.coinsData = data;
    });
  }

  removeItem(event: any) {
    this.coinsData = this.coinsData.filter((coin) => coin.id !== event);
  }
}
