import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Asset } from "src/app/models/coin.model";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"],
})
export class DialogComponent implements OnInit {
  coins: Asset[];
  coinSelected: any;
  selectedCoin = {} as Asset;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.coins = Object.values(this.data);
  }

  ngOnInit(): void {
    this.selectedCoin = this.coins[0];
  }

  onSelectChange(event: any) {
    this.coinSelected = event;
  }

  add() {
    this.dialogRef.close(this.coinSelected);
  }
}
