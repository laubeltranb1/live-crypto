import { TestBed } from "@angular/core/testing";

import { CoinsService } from "./coins.service";
import { HttpClientModule } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { coinsMocked } from "../mocks/coins";
import { ApiResponse, Asset } from "../models/coin.model";
import { environment } from "../environments/environment";

describe("CoinsService", () => {
  let service: CoinsService;
  let httpMock: HttpTestingController;
  let dataCoins = coinsMocked;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoinsService],
    });
    service = TestBed.inject(CoinsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should fetch assets from the API", () => {
    const mockResponse: ApiResponse = {
      data: dataCoins,
      timestamp: 1619782200000,
    };

    service.getAssets().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.base_url}/assets/`);
    expect(req.request.method).toBe("GET");
    req.flush(mockResponse);
  });
});
