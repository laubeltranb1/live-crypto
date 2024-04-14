import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CoinsService } from "src/app/services/coins.service";
import { WebSocketService } from "src/app/services/web-socket.service";
import { DialogComponent } from "../dialog/dialog.component";
import { ApiResponse, Asset, AssetPrice } from "src/app/models/coin.model";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  additionalCoins: Asset[] = [];
  coinsData: Asset[] = [];
  loading: boolean = true;
  showNoData: boolean = false;
  datax: number = 0;

  constructor(
    private coinsService: CoinsService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private webSocketService: WebSocketService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loadCoins();
  }

  ngOnInit(): void {
    this.listenToWebSocket();
  }

  updateLocalStorage() {
    localStorage.setItem("dashboardCoins", JSON.stringify(this.coinsData));
  }

  loadCoins() {
    this.coinsService.getAssets().subscribe({
      next: (resp: ApiResponse) => {
        this.additionalCoins = resp.data;

        if (resp.data.length === 0) {
          this.showNoData = true;
          this.router.navigate(["/error"]);
          return;
        } else {
          this.coinsData = resp.data.slice(0, 6);
          this.updateLocalStorage();
        }
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.error("Failed to load coins:", error);
        this.toastr.error(
          "Failed to load coins. Please try again later.",
          "Error"
        );
      },
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
          this.updateLocalStorage();
        } else {
          this.toastr.error(
            "The coin exists already!  Please select another one.",
            "Error"
          );
        }
      }
    });
  }

  removeItem(event: string) {
    this.coinsData = this.coinsData.filter((coin) => coin.id !== event);
    this.updateLocalStorage();
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
