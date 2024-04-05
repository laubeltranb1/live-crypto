import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CardsComponent } from "./cards.component";

describe("CardsComponent", () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should parse string to number", () => {
    const result = component.parseNumber("123.45");
    expect(result).toEqual(123.45);
  });

  it("should emit item id when removeItem is called", () => {
    spyOn(component.itemSelected, "emit");
    const item = {
      id: "bitcoin",
      rank: "1",
      symbol: "BTC",
      name: "Bitcoin",
      supply: "17193925.0000000000000000",
      maxSupply: "21000000.0000000000000000",
      marketCapUsd: "119150835874.4699281625807300",
      volumeUsd24Hr: "2927959461.1750323310959460",
      priceUsd: "6929.8217756835584756",
      changePercent24Hr: "-0.8101417214350335",
      vwap24Hr: "7175.0663247679233209",
    };
    component.removeItem(item);
    expect(component.itemSelected.emit).toHaveBeenCalledWith("bitcoin");
  });
});
