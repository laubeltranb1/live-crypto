import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { DialogComponent } from "./dialog.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("DialogComponent", () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DialogComponent],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize with the first coin selected", () => {
    expect(component.selectedCoin).toEqual(component.coins[0]);
  });

  it("should update the selected coin on selection change", () => {
    const newSelectedCoin = component.coins[1];
    component.onSelectChange(newSelectedCoin);
    expect(component.coinSelected).toEqual(newSelectedCoin);
  });

  it("should close the dialog with the selected coin on 'Ok' button click", () => {
    const dialogRefSpyObj = jasmine.createSpyObj({
      close: () => {},
    });
    TestBed.overrideProvider(MatDialogRef, { useValue: dialogRefSpyObj });
    fixture.detectChanges();

    component.coinSelected = component.coins[1];
    component.add();

    expect(dialogRefSpyObj.close).toHaveBeenCalledWith(component.coinSelected);
  });
});
