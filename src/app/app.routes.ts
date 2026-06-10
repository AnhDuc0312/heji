import { Routes } from '@angular/router';
import { LandingAComponent } from './features/landing-a/landing-a';
import { LandingBComponent } from './features/landing-b/landing-b';
import { SphereShowcaseComponent } from './features/sphere-showcase/sphere-showcase';
import { DesignSystemComponent } from './features/design-system/design-system';
import { ConsoleComponent } from './features/console/console';
import { ContentPageComponent } from './features/content-page/content-page';
import { DashboardComponent } from './features/dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'draft',
    children: [
      { path: 'landing-a', component: LandingAComponent },
      { path: 'landing-b', component: LandingBComponent },
      { path: 'sphere', component: SphereShowcaseComponent },
      { path: 'design-system', component: DesignSystemComponent },
      { path: 'console', component: ConsoleComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: ':category/:page', component: ContentPageComponent },
      { path: '', redirectTo: 'landing-b', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'draft/landing-b', pathMatch: 'full' },
  { path: '**', redirectTo: 'draft/landing-b' }
];
