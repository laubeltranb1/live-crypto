import { TestBed, fakeAsync, tick } from "@angular/core/testing";

import { WebSocketService } from "./web-socket.service";
import { WebSocketSubject } from "rxjs/webSocket";
import { environment } from "../environments/environment";
import { Subscription, take } from "rxjs";

describe("WebSocketService", () => {
  let service: WebSocketService;
  let mockSocketSubject: WebSocketSubject<any>;

  beforeEach(() => {
    mockSocketSubject = new WebSocketSubject<any>(
      "wss://ws.coincap.io/prices?assets=ALL"
    );

    spyOn(WebSocketSubject.prototype, "next");
    spyOn(WebSocketSubject.prototype, "subscribe").and.callThrough();

    TestBed.configureTestingModule({
      providers: [{ provide: WebSocketSubject, useValue: mockSocketSubject }],
    });
    service = TestBed.inject(WebSocketService);
    mockSocketSubject.next("wss://ws.coincap.io/prices?assets=ALL");
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should connect to the WebSocket with the correct URL", () => {
    expect(WebSocketSubject.prototype.next).toHaveBeenCalledWith(
      `${environment.ws_url}/prices?assets=ALL`
    );
  });

  it("should return the WebSocketSubject", () => {
    const webSocketSubject = service.getWebSocket();
    expect(webSocketSubject).toEqual(mockSocketSubject);
  });

  it("should complete the WebSocketSubject on ngOnDestroy", () => {
    spyOn(mockSocketSubject, "complete");
    service.ngOnDestroy();
    expect(mockSocketSubject.complete).toHaveBeenCalled();
  });

  it("should receive data from the WebSocket", fakeAsync(() => {
    const testData = { bitcoin: 50000 };
    let receivedData: any;
    service.getWebSocket().subscribe((data) => (receivedData = data));
    mockSocketSubject.next(testData);
    tick();
    expect(receivedData).toEqual(testData);
  }));
});
