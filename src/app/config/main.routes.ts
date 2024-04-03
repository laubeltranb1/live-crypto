import { Routes } from "@angular/router";
import { DashboardComponent } from "../components/dashboard/dashboard.component";
import { CONSTANTS_URIS } from "../constants/constants.uris";

export const APP_ROUTES: Routes = [
  { path: "", component: DashboardComponent },
  { path: CONSTANTS_URIS.Dashboard, component: DashboardComponent },
  { path: "**", redirectTo: CONSTANTS_URIS.Dashboard, pathMatch: "full" },
];
