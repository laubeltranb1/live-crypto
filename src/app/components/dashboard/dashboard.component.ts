import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CoinsService } from "src/app/services/coins.service";
import { WebSocketService } from "src/app/services/web-socket.service";
import { DialogComponent } from "../dialog/dialog.component";
import { ApiResponse, Asset, AssetPrice } from "src/app/models/coin.model";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  additionalCoins: Asset[] = [];
  coinsData: Asset[] = [];

  constructor(
    private coinsService: CoinsService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private webSocketService: WebSocketService
  ) {
    this.LoadCoins();
  }

  ngOnInit(): void {
    this.listenToWebSocket();
  }

  LoadCoins() {
    this.coinsService.getAssets().subscribe((resp: ApiResponse) => {
      this.additionalCoins = resp.data;
      this.coinsData = resp.data.slice(0, 6);
    });
  }

  listenToWebSocket() {
    this.webSocketService.getWebSocket().subscribe((data: AssetPrice) => {
      Object.keys(data).forEach((coinName) => {
        const coinIndex = this.coinsData.findIndex(
          (coin) => coin.id === coinName
        );
        if (coinIndex !== -1) {
          this.coinsData[coinIndex].priceUsd = data[coinName];
        }
      });
      this.changeDetectorRef.detectChanges();
    });
  }

  addCoin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.additionalCoins;

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (!this.coinExist(result)) {
          this.coinsData.push(result);
        } else {
          alert({
            title: "The coin already exists",
          });
        }
      }
    });
  }

  removeItem(event: string) {
    this.coinsData = this.coinsData.filter((coin) => coin.id !== event);
  }
  coinExist(coin: Asset) {
    for (var i = 0; i < this.coinsData.length; i++) {
      if (JSON.stringify(this.coinsData[i]) === JSON.stringify(coin)) {
        return true;
      }
    }
    return false;
  }
}
