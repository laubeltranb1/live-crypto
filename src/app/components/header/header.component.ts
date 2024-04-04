import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @Output() openDialogEmiter = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  openDialog() {
    this.openDialogEmiter.emit();
  }
}
