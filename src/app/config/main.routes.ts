import { Routes } from "@angular/router";
import { DashboardComponent } from "../components/dashboard/dashboard.component";
import { CONSTANTS_URIS } from "../constants/constants.uris";
import { CoinsResolver } from "../services/coins-resolver.service";

export const APP_ROUTES: Routes = [
  {
    path: "",
    component: DashboardComponent,
    // resolve: { coinsData: CoinsResolver },
  },
  {
    path: CONSTANTS_URIS.Dashboard,
    component: DashboardComponent,
    // resolve: { coinsData: CoinsResolver },
  },
  { path: "**", redirectTo: CONSTANTS_URIS.Dashboard, pathMatch: "full" },
];
