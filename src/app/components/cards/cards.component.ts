import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["./cards.component.css"],
})
export class CardsComponent implements OnInit {
  @Input() coinsData: any;
  @Output() itemSelected = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  removeItem(item: any) {
    console.log(item.id);
    this.itemSelected.emit(item.id);
  }
}
