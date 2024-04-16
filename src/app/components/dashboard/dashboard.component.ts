import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CoinsService } from "src/app/services/coins.service";
import { WebSocketService } from "src/app/services/web-socket.service";
import { DialogComponent } from "../dialog/dialog.component";
import { ApiResponse, Asset, AssetPrice } from "src/app/models/coin.model";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  additionalCoins: Asset[] = [];
  coinsData: Asset[] = [];
  loading: boolean = true;
  showNoData: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private coinsService: CoinsService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private webSocketService: WebSocketService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCoins();
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
        }
        this.coinsData = resp.data.slice(0, 6);
        this.updateLocalStorage();
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
        const coin = this.coinsData.find((coin) => coin.id === coinName);
        if (coin) {
          coin.priceUsd = data[coinName];
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
      if (result && !this.coinExist(result)) {
        this.coinsData.push(result);
        this.updateLocalStorage();
      } else if (result) {
        this.toastr.error(
          "The coin exists already! Please select another one.",
          "Error"
        );
      }
    });
  }

  removeItem(event: string) {
    this.coinsData = this.coinsData.filter((coin) => coin.id !== event);
    this.updateLocalStorage();
  }
  coinExist(coin: Asset) {
    return this.coinsData.some((c) => c.id === coin.id);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
