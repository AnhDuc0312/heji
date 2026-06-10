import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService, LanguageType } from '../../../core/services/language.service';
import { ConnectService } from '../../../core/services/connect.service';

interface SubpageLink {
  labelKey: string;
  route: string;
}

interface NavCategory {
  labelKey: string;
  links: SubpageLink[];
  isOpenMobile?: boolean;
}

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  public readonly lang = inject(LanguageService);
  public readonly connect = inject(ConnectService);

  isMobileMenuOpen = false;
  isLangDropdownOpen = false;

  toggleLangDropdown() {
    this.isLangDropdownOpen = !this.isLangDropdownOpen;
  }

  selectLanguage(l: LanguageType) {
    this.lang.setLanguage(l);
    this.isLangDropdownOpen = false;
  }

  readonly categories = signal<NavCategory[]>([
    {
      labelKey: 'NAV_PLATFORM',
      links: [
        { labelKey: 'SUB_QUANTUM_COMPUTE', route: '/draft/platform/quantum-compute' },
        { labelKey: 'SUB_NEURAL_MESH', route: '/draft/platform/neural-mesh' },
        { labelKey: 'SUB_BIO_SYNC', route: '/draft/platform/bio-sync' },
        { labelKey: 'SUB_SECURITY', route: '/draft/platform/security' },
        { labelKey: 'SUB_API', route: '/draft/platform/api' },
        { labelKey: 'SUB_PERFORMANCE', route: '/draft/platform/performance' }
      ],
      isOpenMobile: false
    },
    {
      labelKey: 'NAV_ECOSYSTEM',
      links: [
        { labelKey: 'SUB_DASHBOARD', route: '/draft/dashboard' },
        { labelKey: 'SUB_NODES', route: '/draft/ecosystem/nodes' },
        { labelKey: 'SUB_VALIDATORS', route: '/draft/ecosystem/validators' },
        { labelKey: 'SUB_TOKENOMICS', route: '/draft/ecosystem/tokenomics' },
        { labelKey: 'SUB_GOVERNANCE', route: '/draft/ecosystem/governance' },
        { labelKey: 'SUB_INTEGRATIONS', route: '/draft/ecosystem/integrations' }
      ],
      isOpenMobile: false
    },
    {
      labelKey: 'NAV_SHOWCASE',
      links: [
        { labelKey: 'SUB_3D_EXPERIENCE', route: '/draft/showcase/3d-experience' },
        { labelKey: 'SUB_SPHERE', route: '/draft/sphere' },
        { labelKey: 'SUB_DESIGN_SYSTEM', route: '/draft/design-system' },
        { labelKey: 'SUB_LANDING_A', route: '/draft/landing-a' },
        { labelKey: 'SUB_LANDING_B', route: '/draft/landing-b' }
      ],
      isOpenMobile: false
    },
    {
      labelKey: 'NAV_DOCS',
      links: [
        { labelKey: 'SUB_GETTING_STARTED', route: '/draft/docs/getting-started' },
        { labelKey: 'SUB_ARCHITECTURE', route: '/draft/docs/architecture' },
        { labelKey: 'SUB_CLI', route: '/draft/docs/cli-reference' },
        { labelKey: 'SUB_API_REF', route: '/draft/docs/api-reference' },
        { labelKey: 'SUB_TUTORIALS', route: '/draft/docs/tutorials' },
        { labelKey: 'SUB_FAQ', route: '/draft/docs/faq' }
      ],
      isOpenMobile: false
    },
    {
      labelKey: 'NAV_LEGAL',
      links: [
        { labelKey: 'SUB_TERMS', route: '/draft/legal/terms' },
        { labelKey: 'SUB_PRIVACY', route: '/draft/legal/privacy' },
        { labelKey: 'SUB_SECURITY_POLICY', route: '/draft/legal/security-policy' },
        { labelKey: 'SUB_COMPLIANCE', route: '/draft/legal/compliance' },
        { labelKey: 'SUB_SLA', route: '/draft/legal/sla' }
      ],
      isOpenMobile: false
    }
  ]);

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleCategoryMobile(cat: NavCategory) {
    cat.isOpenMobile = !cat.isOpenMobile;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.categories.update(cats => {
      cats.forEach(c => c.isOpenMobile = false);
      return [...cats];
    });
  }

  onConnectClick() {
    if (this.connect.isConnected()) {
      this.connect.disconnect();
    } else {
      this.connect.openModal();
    }
    this.closeMobileMenu();
  }
}
