// import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
// import { DashboardComponent } from "./dashboard.component";
// import { CoinsService } from "src/app/services/coins.service";
// import { WebSocketService } from "src/app/services/web-socket.service";
// import { MatDialog, MatDialogModule } from "@angular/material/dialog";
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { ToastrModule } from "ngx-toastr";
// import { ActivatedRoute } from "@angular/router";
// import { of } from "rxjs";
// import { ApiResponse } from "src/app/models/coin.model";
// import { coinsMocked } from "src/app/mocks/coins";

// describe("DashboardComponent", () => {
//   let component: DashboardComponent;
//   let fixture: ComponentFixture<DashboardComponent>;
//   let coinsServiceSpy: jasmine.SpyObj<CoinsService>;
//   let webSocketServiceSpy: jasmine.SpyObj<WebSocketService>;
//   let dialogSpy: jasmine.SpyObj<MatDialog>;

//   beforeEach(waitForAsync(() => {
//     const coinsService = jasmine.createSpyObj("CoinsService", ["getAssets"]);
//     const webSocketService = jasmine.createSpyObj("WebSocketService", [
//       "getWebSocket",
//     ]);
//     const dialog = jasmine.createSpyObj("MatDialog", ["open", "afterClosed"]);

//     TestBed.configureTestingModule({
//       declarations: [DashboardComponent],
//       imports: [
//         MatDialogModule,
//         BrowserAnimationsModule,
//         ToastrModule.forRoot(),
//       ],
//       providers: [
//         { provide: CoinsService, useValue: coinsService },
//         { provide: WebSocketService, useValue: webSocketService },
//         { provide: MatDialog, useValue: dialog },
//         {
//           provide: ActivatedRoute,
//           useValue: { data: of({ coinsData: { data: [], error: false } }) },
//         },
//       ],
//     }).compileComponents();

//     coinsServiceSpy = TestBed.inject(
//       CoinsService
//     ) as jasmine.SpyObj<CoinsService>;
//     webSocketServiceSpy = TestBed.inject(
//       WebSocketService
//     ) as jasmine.SpyObj<WebSocketService>;
//     dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(DashboardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it("should create", () => {
//     expect(component).toBeTruthy();
//   });

//   it("should load coins on initialization", () => {
//     const mockApiResponse: ApiResponse = {
//       data: coinsMocked,
//       timestamp: 1620000000,
//     };
//     coinsServiceSpy.getAssets.and.returnValue(of(mockApiResponse));

//     component.ngOnInit();

//     expect(coinsServiceSpy.getAssets).toHaveBeenCalled();
//     expect(component.additionalCoins.length).toBe(2);
//     expect(component.coinsData.length).toBe(2);
//   });
// });
