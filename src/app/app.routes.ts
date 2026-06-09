import { Routes } from '@angular/router';
import { LandingAComponent } from './pages/landing-a/landing-a';
import { LandingBComponent } from './pages/landing-b/landing-b';
import { SphereShowcaseComponent } from './pages/sphere-showcase/sphere-showcase';
import { DesignSystemComponent } from './pages/design-system/design-system';
import { ConsoleComponent } from './pages/console/console';

export const routes: Routes = [
  {
    path: 'draft',
    children: [
      { path: 'landing-a', component: LandingAComponent },
      { path: 'landing-b', component: LandingBComponent },
      { path: 'sphere', component: SphereShowcaseComponent },
      { path: 'design-system', component: DesignSystemComponent },
      { path: 'console', component: ConsoleComponent },
      { path: '', redirectTo: 'landing-b', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'draft/landing-b', pathMatch: 'full' },
  { path: '**', redirectTo: 'draft/landing-b' }
];
