import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Asset } from "src/app/models/coin.model";

@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["./cards.component.css"],
})
export class CardsComponent {
  @Input() coinsData: Asset[] = [];
  @Output() itemSelected = new EventEmitter();

  parseNumber(value: string): number {
    return parseFloat(value);
  }

  removeItem(item: Asset) {
    this.itemSelected.emit(item.id);
  }
}
