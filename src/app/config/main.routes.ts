import { Routes } from "@angular/router";
import { DashboardComponent } from "../components/dashboard/dashboard.component";
import { CONSTANTS_URIS } from "../constants/constants.uris";
import { ErrorComponent } from "../components/error/error.component";

export const APP_ROUTES: Routes = [
  {
    path: "",
    component: DashboardComponent,
  },
  {
    path: CONSTANTS_URIS.Dashboard,
    component: DashboardComponent,
  },
  { path: CONSTANTS_URIS.Error, component: ErrorComponent },
  { path: "**", redirectTo: CONSTANTS_URIS.Dashboard, pathMatch: "full" },
];
