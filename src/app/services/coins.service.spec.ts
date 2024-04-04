import { TestBed } from "@angular/core/testing";

import { CoinsService } from "./coins.service";
import { HttpClientModule } from "@angular/common/http";

describe("CoinsService", () => {
  let service: CoinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(CoinsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
