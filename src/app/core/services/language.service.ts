import { Injectable, signal, computed } from '@angular/core';

export type LanguageType = 'en' | 'vi' | 'ko';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // Use Signal to store the active language, initialized from localStorage if available
  readonly currentLang = signal<LanguageType>(this.getSavedLanguage());

  // Dictionary containing translations for English, Vietnamese, and Korean
  private readonly dictionary: Record<LanguageType, Record<string, string>> = {
    en: {
      // General Navigation & Switcher
      'SWITCHER_LABEL': 'Screen Switcher:',
      'NAV_LANDING_B': 'Interactive Landing (B)',
      'NAV_LANDING_A': 'Static Landing (A)',
      'NAV_SPHERE': '3D Crystal Stage',
      'NAV_SYSTEM': 'Obsidian Flux Specs',
      'NAV_CONSOLE': 'Neural Console',

      // Reusable Navbar & Categories
      'NAV_PLATFORM': 'Platform',
      'NAV_ECOSYSTEM': 'Ecosystem',
      'NAV_SHOWCASE': 'Showcase',
      'NAV_DOCS': 'Docs',
      'NAV_LEGAL': 'Legal',
      'NAV_EXPLORE_SECTIONS': 'Explore Sections',

      // Navbar B & Global Connect
      'CONNECT_BTN': 'Connect',
      'VERSION_TAG': 'VERSION 4.0 NOW LIVE',
      'HERO_TITLE_PRE': 'THE FUTURE OF ',
      'HERO_TITLE_SPAN': 'INTELLECT.',
      'HERO_SUBTITLE': 'Experience the next generation of neural computing with immersive 3D intelligence and decentralized processing power.',
      'GET_STARTED': 'Get Started',
      'VIEW_DOCS': 'View Documentation',

      // Features Section
      'FEAT_TITLE': 'Engineered Excellence',
      'FEAT_1_TITLE': 'Quantum Processing',
      'FEAT_1_DESC': 'Utilizing non-linear algorithmic structures to process petabytes of data with near-zero thermal signatures and infinite scalability.',
      'FEAT_1_LINK': 'EXPLORE SPECS',
      'FEAT_2_TITLE': 'Neural Mesh',
      'FEAT_2_DESC': 'A self-healing distributed network architecture that maintains 100% integrity even under extreme node variance conditions.',
      'FEAT_2_LINK': 'VIEW NETWORK',
      'FEAT_3_TITLE': 'Bio-Sync',
      'FEAT_3_DESC': 'Advanced haptic and cognitive synchronization layers that bridge the gap between human intent and machine execution.',
      'FEAT_3_LINK': 'LEARN SYNC',

      // Showcase Section
      'PERFORMANCE_FIRST': 'Performance First',
      'SCALE_TITLE': 'Architected for Global Scale',
      'SCALE_DESC': 'NEURALIS isn\'t just a platform; it\'s a foundation. We\'ve optimized every layer of the stack—from the bare metal to the front-facing API—to deliver an uncompromising cinematic experience.',
      'SCALE_POINT_1': 'End-to-end encrypted neural pathways',
      'SCALE_POINT_2': 'Real-time collaborative workspace synchronization',
      'SCALE_POINT_3': 'Dynamic resource allocation based on intent',

      // Statistics Section
      'STAT_UPTIME': 'Platform Uptime',
      'STAT_LATENCY': 'Global Latency',
      'STAT_NODES': 'Active Nodes',

      // Testimonials Section
      'TESTIMONIALS_TITLE': 'Trusted by Pioneers',
      'TEST_1_QUOTE': '"The shift to NEURALIS was the single most impactful infrastructure decision we\'ve made in a decade. The speed is incomparable."',
      'TEST_2_QUOTE': '"We needed a platform that felt as premium as our brand. Neuralis delivered a UI and API experience that is purely cinematic."',
      'TEST_3_QUOTE': '"Scaling was always a pain point until we moved to the mesh. Now, growth is a simple parameter shift. Absolutely brilliant."',

      // CTA Section
      'CTA_TITLE': 'JOIN THE VANGUARD.',
      'CTA_DESC': 'Become part of the most advanced neural computing network in existence. Secured, scalable, and built for the architects of tomorrow.',
      'CTA_BTN': 'Initialize Access',

      // Footer
      'FOOTER_SLOGAN': 'Pioneering the boundary between human intuition and machine intelligence.',
      'STAY_UPDATED': 'STAY UPDATED',
      'JOIN_BTN': 'Join',
      'EMAIL_PLACEHOLDER': 'Email address',

      // Sphere Showcase Page
      'SPHERE_PAGE_TITLE': '3D Crystal Stage Showcase',
      'SPHERE_DESC': 'A futuristic, translucent 3D holographic crystal sphere with internal fractals and electric cyan glowing cores. Rendering details are optimized for direct hardware-accelerated displays.',
      'FOCUS_ALL': 'Focus: All',
      'FOCUS_CORE': 'Focus: Core',
      'FOCUS_BG': 'Focus: Background',
      'STABILITY_TAG': 'STABILITY STATUS: NOMINAL',
      'ROTATION_TAG': 'ROTATION CODES: ACTIVE',

      // Design System Page
      'DS_TITLE': 'Obsidian Flux Specifications',
      'DS_SUBTITLE': 'The design system tokens governing the Neuralis interface - built for ultra-high contrast dark modes and premium holographic overlays.',
      'COLOR_PALETTE': 'Color Palette & Tokens',
      'TYPO_TOKENS': 'Typography Tokens',
      'SPACING_SCALE': 'Spacing & Layout Tokens',

      // Neural Console Page
      'CONSOLE_TITLE': 'Neural Command Console',
      'SYS_ALLOCATOR': 'System Resource Allocator',
      'CPU_ALLOC': 'Processing Power (CPU)',
      'MEM_ALLOC': 'Memory Depth (RAM)',
      'NET_ALLOC': 'Network Bandwidth',
      'EFFICIENCY_DIAL': 'Sync Efficiency',
      'NODE_MAP': 'Node Mesh Map',
      'TERMINAL_TITLE': 'Retro Terminal CLI',
      'NODE_DETAILS': 'Node Details',
      'NODE_NAME': 'Node Name',
      'NODE_STATUS': 'Status',
      'NODE_LATENCY': 'Latency',
      'NODE_TEMP': 'Core Temp',
      'CLI_PROMPT': 'Enter command (type help for list)...',
      'CLI_WELCOME': 'NEURALIS COMMAND INTERFACE [VERSION 4.0.2]\n(c) 2026 Neuralis Corp. All rights reserved.\n\nType "help" to view available diagnostic commands.\n--------------------------------------------------',
      'CMD_NOT_FOUND': 'Command not found: ',
      'CMD_HELP': 'Available commands:\n  help      - Display this diagnostics command list\n  status    - View current system allocation metrics\n  optimize  - Initiate neural link optimization sequence\n  clear     - Clear terminal logs\n  node [id] - Query details of a specific node (e.g. node 1)',
      'CMD_OPTIMIZE_START': 'Initiating optimization sequence...\nAllocating buffer zones...\nClearing node interference...',
      'CMD_OPTIMIZE_DONE': 'Optimization completed. Processing efficiency synchronized at 100%. All pathways NOMINAL.',

      // Global Wallet Modal
      'MODAL_CONNECT_TITLE': 'Connect Neural Link',
      'MODAL_CONNECT_DESC': 'Select a gateway validator interface to synchronize your wallet balance and establish a secure decentralized socket node.',

      // Integrated Diagnostic Simulator
      'SIM_TITLE': 'Integrated Diagnostic Simulator',
      'SIM_RUN': 'Initiate Diagnostic',
      'SIM_RUN_AGAIN': 'Re-run Diagnostic',
      'SIM_WELCOME': 'Diagnostics offline. Click "Initiate Diagnostic" above to execute automated pathway node integrity checks.',

      // Dropdown Switch Subpages Labels
      'SUB_QUANTUM_COMPUTE': 'Quantum Compute',
      'SUB_NEURAL_MESH': 'Neural Mesh',
      'SUB_BIO_SYNC': 'Bio-Sync',
      'SUB_SECURITY': 'E2E Security',
      'SUB_API': 'Developer API',
      'SUB_PERFORMANCE': 'Hardware Specs',
      'SUB_NODES': 'Active Nodes',
      'SUB_VALIDATORS': 'Validators',
      'SUB_TOKENOMICS': 'Tokenomics',
      'SUB_GOVERNANCE': 'Governance',
      'SUB_INTEGRATIONS': 'Integrations',
      'SUB_3D_EXPERIENCE': '3D Stage',
      'SUB_SPHERE': 'Crystal Sphere',
      'SUB_DESIGN_SYSTEM': 'Design System',
      'SUB_LANDING_A': 'Static Landing (A)',
      'SUB_LANDING_B': 'Interactive Landing (B)',
      'SUB_GETTING_STARTED': 'Getting Started',
      'SUB_ARCHITECTURE': 'Architecture',
      'SUB_CLI': 'CLI Reference',
      'SUB_API_REF': 'API Reference',
      'SUB_TUTORIALS': 'Tutorials',
      'SUB_FAQ': 'FAQ & Troubleshooting',
      'SUB_TERMS': 'Terms of Service',
      'SUB_PRIVACY': 'Privacy Policy',
      'SUB_SECURITY_POLICY': 'Security Policy',
      'SUB_COMPLIANCE': 'Compliance',
      'SUB_SLA': 'SLA Guarantees',

      // FAQ Accordion
      'FAQ_SECTION_TITLE': 'General Troubleshooting & Setup FAQ',
      'FAQ_Q_0': 'How do I run a local validator node?',
      'FAQ_A_0': 'Download the Neuralis CLI from NPM, run "neuralis login" to link your wallet, then call "neuralis node --start" to register your active validator.',
      'FAQ_Q_1': 'What are the token staking lockup periods?',
      'FAQ_A_1': 'Standard staking locks tokens for 14 days, providing 8.4% APY. Long-term pools offer lockups up to 180 days with yields up to 14.2% APY.',
      'FAQ_Q_2': 'How are gas fees calculated on the neural mesh?',
      'FAQ_A_2': 'Gas fees are calculated dynamically depending on processing queue length and node latencies. A typical execution costs under $0.001 equivalent in $NEURAL.',
      'FAQ_Q_3': 'Is the haptic cognitive sync safe for consumer hardware?',
      'FAQ_A_3': 'Yes, the bio-sync protocols utilize standard, non-invasive haptic frequencies approved by international hardware safety standards.',
      'FAQ_Q_4': 'What happens if my validation node goes offline?',
      'FAQ_A_4': 'Short outages result in temporary reward suspension. Extended outages (longer than 24 hours) may trigger minor staking slashes to protect mesh integrity.',

      // --- PLATFORM CATEGORY PAGES TRANSLATIONS ---
      'TITLE_PLATFORM_QUANTUM_COMPUTE': 'Quantum Computing Core',
      'DESC_PLATFORM_QUANTUM_COMPUTE_P1': 'Superconducting qubit architecture running non-linear algorithms at absolute zero. Processes petabytes of multi-dimensional tensor arrays instantaneously to enable instant cognitive decisions.',
      'DESC_PLATFORM_QUANTUM_COMPUTE_P2': 'Equipped with automated quantum state error correction and haptic node telemetry, our processing core bypasses the limits of classical silicon chips.',
      'STAT_LABEL_PLATFORM_QUANTUM_COMPUTE_1': 'Qubits Count', 'STAT_VAL_PLATFORM_QUANTUM_COMPUTE_1': '5,000 Qubits',
      'STAT_LABEL_PLATFORM_QUANTUM_COMPUTE_2': 'Error Rate', 'STAT_VAL_PLATFORM_QUANTUM_COMPUTE_2': '0.0001%',
      'STAT_LABEL_PLATFORM_QUANTUM_COMPUTE_3': 'Raw Speedup', 'STAT_VAL_PLATFORM_QUANTUM_COMPUTE_3': '15,000x',

      'TITLE_PLATFORM_NEURAL_MESH': 'Neural Mesh Network',
      'DESC_PLATFORM_NEURAL_MESH_P1': 'A self-healing, globally distributed network architecture connecting validator nodes. Utilizes dynamic packet routing algorithms to maintain 100% path uptime under heavy load.',
      'DESC_PLATFORM_NEURAL_MESH_P2': 'Data routing is secure and encrypted, providing direct serverless pipelines that synchronize state modifications across nodes instantly.',
      'STAT_LABEL_PLATFORM_NEURAL_MESH_1': 'Active Mesh', 'STAT_VAL_PLATFORM_NEURAL_MESH_1': '1.2M Nodes',
      'STAT_LABEL_PLATFORM_NEURAL_MESH_2': 'Failover Latency', 'STAT_VAL_PLATFORM_NEURAL_MESH_2': '< 1ms',
      'STAT_LABEL_PLATFORM_NEURAL_MESH_3': 'Network Bandwidth', 'STAT_VAL_PLATFORM_NEURAL_MESH_3': '10 Tbps',

      'TITLE_PLATFORM_BIO_SYNC': 'Haptic Cognitive Sync',
      'DESC_PLATFORM_BIO_SYNC_P1': 'Direct brain-computer cognitive synchronization loop. Uses sub-sensory neural stimulation to sync human intent and mechanical execution, creating an immersive computing link.',
      'DESC_PLATFORM_BIO_SYNC_P2': 'Utilizes advanced haptic feedbacks to map physical micro-actions to digital parameters in real-time, decreasing interface friction to absolute zero.',
      'STAT_LABEL_PLATFORM_BIO_SYNC_1': 'Sync Depth', 'STAT_VAL_PLATFORM_BIO_SYNC_1': '99.8%',
      'STAT_LABEL_PLATFORM_BIO_SYNC_2': 'Link Latency', 'STAT_VAL_PLATFORM_BIO_SYNC_2': '2ms',
      'STAT_LABEL_PLATFORM_BIO_SYNC_3': 'Active Users', 'STAT_VAL_PLATFORM_BIO_SYNC_3': '24,500 Users',

      'TITLE_PLATFORM_SECURITY': 'End-to-End Cryptography',
      'DESC_PLATFORM_SECURITY_P1': 'End-to-end cryptographic shielding secured by lattice-based math algorithms. Proof against decryption from future quantum computing threat models.',
      'DESC_PLATFORM_SECURITY_P2': 'Zero-knowledge proofs secure transactions and network identities without exposing sensitive user metadata, preserving privacy by design.',
      'STAT_LABEL_PLATFORM_SECURITY_1': 'Encryption Type', 'STAT_VAL_PLATFORM_SECURITY_1': 'Lattice 512',
      'STAT_LABEL_PLATFORM_SECURITY_2': 'Brute Crack Time', 'STAT_VAL_PLATFORM_SECURITY_2': '1.5B Years',
      'STAT_LABEL_PLATFORM_SECURITY_3': 'Security Rating', 'STAT_VAL_PLATFORM_SECURITY_3': 'A+ SECURE',

      'TITLE_PLATFORM_API': 'Developer API Gateway',
      'DESC_PLATFORM_API_P1': 'Low-latency REST, gRPC, and WebSocket connection frameworks. Stream neural data or spin up custom virtual agents in seconds using our global developer endpoints.',
      'DESC_PLATFORM_API_P2': 'Comprehensive sandbox testing environment, complete SDK packages, and webhook triggers for building automated software pipelines.',
      'STAT_LABEL_PLATFORM_API_1': 'Response Latency', 'STAT_VAL_PLATFORM_API_1': '4ms',
      'STAT_LABEL_PLATFORM_API_2': 'Uptime Guarantee', 'STAT_VAL_PLATFORM_API_2': '99.999%',
      'STAT_LABEL_PLATFORM_API_3': 'Daily API Calls', 'STAT_VAL_PLATFORM_API_3': '2.5 Billion',

      'TITLE_PLATFORM_PERFORMANCE': 'Hardware Performance',
      'DESC_PLATFORM_PERFORMANCE_P1': 'Dedicated ASIC-accelerated processing arrays configured for neural network computations. Runs bare-metal memory-mapped operations for maximum hardware throughput.',
      'DESC_PLATFORM_PERFORMANCE_P2': 'Direct hardware execution paths bypass standard virtualization layers, resulting in unmatched computational speeds and low thermal loading.',
      'STAT_LABEL_PLATFORM_PERFORMANCE_1': 'Maximum IOPS', 'STAT_VAL_PLATFORM_PERFORMANCE_1': '4.5 Million',
      'STAT_LABEL_PLATFORM_PERFORMANCE_2': 'Core Thermal', 'STAT_VAL_PLATFORM_PERFORMANCE_2': '38°C',
      'STAT_LABEL_PLATFORM_PERFORMANCE_3': 'Raw Power', 'STAT_VAL_PLATFORM_PERFORMANCE_3': '850 TFLOPS',

      // --- ECOSYSTEM CATEGORY PAGES TRANSLATIONS ---
      'TITLE_ECOSYSTEM_NODES': 'Active Node Distribution',
      'DESC_ECOSYSTEM_NODES_P1': 'Global distribution of validation nodes providing compute and memory services. Automatically loads and balances network traffic across geographic server points.',
      'DESC_ECOSYSTEM_NODES_P2': 'Allows any individual to spin up a local validator node and participate in securing the network while earning decentralized rewards.',
      'STAT_LABEL_ECOSYSTEM_NODES_1': 'Global Nodes', 'STAT_VAL_ECOSYSTEM_NODES_1': '150,000 Nodes',
      'STAT_LABEL_ECOSYSTEM_NODES_2': 'Est. Yield', 'STAT_VAL_ECOSYSTEM_NODES_2': '8.4% APY',
      'STAT_LABEL_ECOSYSTEM_NODES_3': 'Staked Tokens', 'STAT_VAL_ECOSYSTEM_NODES_3': '450M NEURAL',
      'NODES_EDU_P2P_TITLE': 'P2P Mesh Network & Propagation',
      'NODES_EDU_P2P_DESC': 'Decentralized networks rely on peer-to-peer gossip protocols to propagate blocks and transactions. When a node discovers new data, it broadcasts it to its immediate peers. This ripple effect propagates across the globe in milliseconds, measured as network propagation delay.',
      'NODES_EDU_VAL_TITLE': 'Validator Role & Latency',
      'NODES_EDU_VAL_DESC': 'Validators are dedicated node instances running consensus engines. They collect transactions, package them into blocks, verify cryptographic signatures, and vote on validity. Minimizing node latency prevents forks and ensures stable, high-throughput consensus.',

      'TITLE_ECOSYSTEM_VALIDATORS': 'Consensus Validators',
      'DESC_ECOSYSTEM_VALIDATORS_P1': 'Proof of Stake consensus mechanisms powered by Byzantine fault tolerance. Ensures decentralized data security, block integrity, and instant transaction validations.',
      'DESC_ECOSYSTEM_VALIDATORS_P2': 'Validators actively verify and stamp state updates, maintaining high computational reliability and trust on-chain without centralized authorities.',
      'STAT_LABEL_ECOSYSTEM_VALIDATORS_1': 'Active Validators', 'STAT_VAL_ECOSYSTEM_VALIDATORS_1': '4,800',
      'STAT_LABEL_ECOSYSTEM_VALIDATORS_2': 'Consensus Speed', 'STAT_VAL_ECOSYSTEM_VALIDATORS_2': '1.2 seconds',
      'STAT_LABEL_ECOSYSTEM_VALIDATORS_3': 'Slashed Nodes', 'STAT_VAL_ECOSYSTEM_VALIDATORS_3': '0 Slashed',

      'TITLE_ECOSYSTEM_TOKENOMICS': 'Token Utility & Allocation',
      'DESC_ECOSYSTEM_TOKENOMICS_P1': 'The $NEURAL token governs resource allocations, pays protocol gas fees, and secures the validation mesh. Distributed to reward computing node contributors.',
      'DESC_ECOSYSTEM_TOKENOMICS_P2': 'Designed with deflationary mechanics and yield-stretching distribution algorithms to promote long-term stability and sustainable ecosystem growth.',
      'STAT_LABEL_ECOSYSTEM_TOKENOMICS_1': 'Total Supply', 'STAT_VAL_ECOSYSTEM_TOKENOMICS_1': '1.0B NEURAL',
      'STAT_LABEL_ECOSYSTEM_TOKENOMICS_2': 'Circulating Supply', 'STAT_VAL_ECOSYSTEM_TOKENOMICS_2': '65%',
      'STAT_LABEL_ECOSYSTEM_TOKENOMICS_3': 'Tokens Burned', 'STAT_VAL_ECOSYSTEM_TOKENOMICS_3': '12.4 Million',

      'TITLE_ECOSYSTEM_GOVERNANCE': 'Decentralized Governance',
      'DESC_ECOSYSTEM_GOVERNANCE_P1': 'DAO governance model empowering community members to submit proposals and vote on protocol improvements, code upgrades, and resource allocations.',
      'DESC_ECOSYSTEM_GOVERNANCE_P2': 'Voting weight is determined by staked tokens, encouraging participants to align their choices with the long-term health and security of the network.',
      'STAT_LABEL_ECOSYSTEM_GOVERNANCE_1': 'Active Proposals', 'STAT_VAL_ECOSYSTEM_GOVERNANCE_1': '84 Proposals',
      'STAT_LABEL_ECOSYSTEM_GOVERNANCE_2': 'Voting Turnout', 'STAT_VAL_ECOSYSTEM_GOVERNANCE_2': '72%',
      'STAT_LABEL_ECOSYSTEM_GOVERNANCE_3': 'Community Vault', 'STAT_VAL_ECOSYSTEM_GOVERNANCE_3': '$45.2M USD',

      'TITLE_ECOSYSTEM_INTEGRATIONS': 'Third-Party Integrations',
      'DESC_ECOSYSTEM_INTEGRATIONS_P1': 'Seamless connection modules linking Neuralis nodes to external chains, databases, and enterprise systems. Expand your application capabilities without configuration overhead.',
      'DESC_ECOSYSTEM_INTEGRATIONS_P2': 'Allows developers to plug external computational triggers directly into the neural execution layers, enabling hybrid web3 integrations.',
      'STAT_LABEL_ECOSYSTEM_INTEGRATIONS_1': 'Connected Chains', 'STAT_VAL_ECOSYSTEM_INTEGRATIONS_1': '12 Chains',
      'STAT_LABEL_ECOSYSTEM_INTEGRATIONS_2': 'Middleware Modules', 'STAT_VAL_ECOSYSTEM_INTEGRATIONS_2': '250+ Modules',
      'STAT_LABEL_ECOSYSTEM_INTEGRATIONS_3': 'Setup Time', 'STAT_VAL_ECOSYSTEM_INTEGRATIONS_3': '< 5 minutes',

      // --- SHOWCASE CATEGORY PAGES TRANSLATIONS ---
      'TITLE_SHOWCASE_3D_EXPERIENCE': 'Interactive 3D Stages',
      'DESC_SHOWCASE_3D_EXPERIENCE_P1': 'Immersive WebGPU and WebGL graphics rendering interactive visual nodes. Explores the limits of browser-based 3D engines to create a futuristic user experience.',
      'DESC_SHOWCASE_3D_EXPERIENCE_P2': 'Includes dynamic light mapping and vector flow fields that respond to viewport resize and scroll events with zero latency.',
      'STAT_LABEL_SHOWCASE_3D_EXPERIENCE_1': 'Frame Rate', 'STAT_VAL_SHOWCASE_3D_EXPERIENCE_1': '120 FPS',
      'STAT_LABEL_SHOWCASE_3D_EXPERIENCE_2': 'Draw Calls', 'STAT_VAL_SHOWCASE_3D_EXPERIENCE_2': '120 Calls',
      'STAT_LABEL_SHOWCASE_3D_EXPERIENCE_3': 'GPU Utilization', 'STAT_VAL_SHOWCASE_3D_EXPERIENCE_3': '18% Load',

      // --- DOCS CATEGORY PAGES TRANSLATIONS ---
      'TITLE_DOCS_GETTING_STARTED': 'Installation & Setup Guide',
      'DESC_DOCS_GETTING_STARTED_P1': 'Learn how to fetch the Neuralis CLI packages, initialize configuration templates, and execute your first node link in a clean sandbox environment.',
      'DESC_DOCS_GETTING_STARTED_P2': 'Our quickstart guides help you deploy an optimized decentralized sandbox in under five minutes with step-by-step CLI commands.',
      'STAT_LABEL_DOCS_GETTING_STARTED_1': 'Setup Steps', 'STAT_VAL_DOCS_GETTING_STARTED_1': '3 Steps',
      'STAT_LABEL_DOCS_GETTING_STARTED_2': 'Install Duration', 'STAT_VAL_DOCS_GETTING_STARTED_2': '2 mins',
      'STAT_LABEL_DOCS_GETTING_STARTED_3': 'Support Available', 'STAT_VAL_DOCS_GETTING_STARTED_3': '24/7 Docs',

      'TITLE_DOCS_ARCHITECTURE': 'Deep-Dive Architecture',
      'DESC_DOCS_ARCHITECTURE_P1': 'Explore the internal processing layers of the Neuralis network, from bare-metal hardware up to the application routing structures.',
      'DESC_DOCS_ARCHITECTURE_P2': 'Detailed descriptions of the asynchronous memory queues, zero-copy socket buffers, and decentralized validation pathways.',
      'STAT_LABEL_DOCS_ARCHITECTURE_1': 'Layer Count', 'STAT_VAL_DOCS_ARCHITECTURE_1': '4 Layers',
      'STAT_LABEL_DOCS_ARCHITECTURE_2': 'Buffer Limit', 'STAT_VAL_DOCS_ARCHITECTURE_2': '64 MB',
      'STAT_LABEL_DOCS_ARCHITECTURE_3': 'Inner Latency', 'STAT_VAL_DOCS_ARCHITECTURE_3': '< 100ns',

      'TITLE_DOCS_CLI_REFERENCE': 'CLI Command Reference',
      'DESC_DOCS_CLI_REFERENCE_P1': 'Full syntax list and options for the neuralis terminal tool. Manage node allocations and optimize routing paths from the command shell.',
      'DESC_DOCS_CLI_REFERENCE_P2': 'Includes diagnostic arguments, validator checks, and automation triggers for custom server settings.',
      'STAT_LABEL_DOCS_CLI_REFERENCE_1': 'Total Commands', 'STAT_VAL_DOCS_CLI_REFERENCE_1': '45 Commands',
      'STAT_LABEL_DOCS_CLI_REFERENCE_2': 'Shell Type', 'STAT_VAL_DOCS_CLI_REFERENCE_2': 'Bash / PowerShell',
      'STAT_LABEL_DOCS_CLI_REFERENCE_3': 'Docs Updates', 'STAT_VAL_DOCS_CLI_REFERENCE_3': 'Weekly',

      'TITLE_DOCS_API_REFERENCE': 'REST & WebSockets APIs',
      'DESC_DOCS_API_REFERENCE_P1': 'Programmatic documentation for calling Neuralis endpoints. Features JSON-RPC payload structures and event listener pathways.',
      'DESC_DOCS_API_REFERENCE_P2': 'Allows secure remote command executions, real-time node query operations, and network analytics streaming with full authorization.',
      'STAT_LABEL_DOCS_API_REFERENCE_1': 'Endpoints Count', 'STAT_VAL_DOCS_API_REFERENCE_1': '64 Endpoints',
      'STAT_LABEL_DOCS_API_REFERENCE_2': 'Max Connections', 'STAT_VAL_DOCS_API_REFERENCE_2': '10M Conns',
      'STAT_LABEL_DOCS_API_REFERENCE_3': 'Auth Method', 'STAT_VAL_DOCS_API_REFERENCE_3': 'ECDSA Sign',

      'TITLE_DOCS_TUTORIALS': 'Tutorials & Guides',
      'DESC_DOCS_TUTORIALS_P1': 'Follow step-by-step guidelines to construct a chat validator agent, sync it to the network, and process client requests dynamically.',
      'DESC_DOCS_TUTORIALS_P2': 'Covers local environment building, module configurations, transaction signing, and deployment procedures in clear detail.',
      'STAT_LABEL_DOCS_TUTORIALS_1': 'Difficulty', 'STAT_VAL_DOCS_TUTORIALS_1': 'Beginner Friendly',
      'STAT_LABEL_DOCS_TUTORIALS_2': 'Guides Count', 'STAT_VAL_DOCS_TUTORIALS_2': '12 Guides',
      'STAT_LABEL_DOCS_TUTORIALS_3': 'Completed Users', 'STAT_VAL_DOCS_TUTORIALS_3': '45,000+ Devs',

      'TITLE_DOCS_FAQ': 'FAQ & Troubleshooting',
      'DESC_DOCS_FAQ_P1': 'Find quick answers to common issues involving node connections, validator rewards, staking lockups, and wallet signatures.',
      'DESC_DOCS_FAQ_P2': 'Check our detailed accordion sections below to troubleshoot signal interruptions or memory synchronization faults.',
      'STAT_LABEL_DOCS_FAQ_1': 'Solved Rate', 'STAT_VAL_DOCS_FAQ_1': '94%',
      'STAT_LABEL_DOCS_FAQ_2': 'Open Tickets', 'STAT_VAL_DOCS_FAQ_2': '0 Open',
      'STAT_LABEL_DOCS_FAQ_3': 'Response Time', 'STAT_VAL_DOCS_FAQ_3': '< 10 mins',

      // --- LEGAL CATEGORY PAGES TRANSLATIONS ---
      'TITLE_LEGAL_TERMS': 'Terms of Service',
      'DESC_LEGAL_TERMS_P1': 'Governs the terms and usage liabilities of the Neuralis network. By linking wallets, users agree to distributed validation rules and node sharing.',
      'DESC_LEGAL_TERMS_P2': 'Specifies compliance targets, gas fee structures, computational boundaries, and decentralized dispute resolutions.',
      'STAT_LABEL_LEGAL_TERMS_1': 'Version', 'STAT_VAL_LEGAL_TERMS_1': 'v4.2',
      'STAT_LABEL_LEGAL_TERMS_2': 'Effective Date', 'STAT_VAL_LEGAL_TERMS_2': 'June 2026',
      'STAT_LABEL_LEGAL_TERMS_3': 'Total Clauses', 'STAT_VAL_LEGAL_TERMS_3': '28 Clauses',

      'TITLE_LEGAL_PRIVACY': 'Privacy & Data Storage',
      'DESC_LEGAL_PRIVACY_P1': 'Outlines what metadata is processed. Neuralis does not log private keys, physical locations, or personal user names to protect user privacy.',
      'DESC_LEGAL_PRIVACY_P2': 'Local browser storage is used exclusively to cache interface configurations (e.g. selected language, dark mode, wallet connection states).',
      'STAT_LABEL_LEGAL_PRIVACY_1': 'Cookies Set', 'STAT_VAL_LEGAL_PRIVACY_1': '0 Cookies',
      'STAT_LABEL_LEGAL_PRIVACY_2': 'Data Tracking', 'STAT_VAL_LEGAL_PRIVACY_2': 'Disabled',
      'STAT_LABEL_LEGAL_PRIVACY_3': 'Local Encryption', 'STAT_VAL_LEGAL_PRIVACY_3': 'AES-GCM Cache',

      'TITLE_LEGAL_SECURITY_POLICY': 'Vulnerability Disclosure',
      'DESC_LEGAL_SECURITY_POLICY_P1': 'Guidelines for white-hat security researchers. Helps protect decentralized validation assets from exploits, breaches, or DDoS attacks.',
      'DESC_LEGAL_SECURITY_POLICY_P2': 'Provides contact pathways and details on our bug bounty programs for reporting zero-day critical bugs responsibly.',
      'STAT_LABEL_LEGAL_SECURITY_POLICY_1': 'Bounty Cap', 'STAT_VAL_LEGAL_SECURITY_POLICY_1': '$250,000 USD',
      'STAT_LABEL_LEGAL_SECURITY_POLICY_2': 'Initial Reply', 'STAT_VAL_LEGAL_SECURITY_POLICY_2': '< 12 hours',
      'STAT_LABEL_LEGAL_SECURITY_POLICY_3': 'Critical Bugs', 'STAT_VAL_LEGAL_SECURITY_POLICY_3': '0 Active',

      'TITLE_LEGAL_COMPLIANCE': 'Compliance & Audits',
      'DESC_LEGAL_COMPLIANCE_P1': 'Details regulatory standards followed by our validation nodes. Integrates security checks to align with global regulatory policies.',
      'DESC_LEGAL_COMPLIANCE_P2': 'Ensures AML/KYC checks for block validators running enterprise setups to maintain high trust and compliant network activities.',
      'STAT_LABEL_LEGAL_COMPLIANCE_1': 'Compliance Rate', 'STAT_VAL_LEGAL_COMPLIANCE_1': '100% OK',
      'STAT_LABEL_LEGAL_COMPLIANCE_2': 'Audited By', 'STAT_VAL_LEGAL_COMPLIANCE_2': 'ConsenSys Dil.',
      'STAT_LABEL_LEGAL_COMPLIANCE_3': 'Audits Passed', 'STAT_VAL_LEGAL_COMPLIANCE_3': '4 / 4 Audits',

      'TITLE_LEGAL_SLA': 'SLA Guarantees',
      'DESC_LEGAL_SLA_P1': 'Guarantees 99.99% uptime for decentralized endpoint gateways and RPC node pathways. Refund credits are issued for verified outages.',
      'DESC_LEGAL_SLA_P2': 'Maintains real-time failover networks and load distributors to prevent any node network disruption or data loss.',
      'STAT_LABEL_LEGAL_SLA_1': 'Uptime SLA', 'STAT_VAL_LEGAL_SLA_1': '99.99% SLA',
      'STAT_LABEL_LEGAL_SLA_2': 'Refund Rate', 'STAT_VAL_LEGAL_SLA_2': '100% Core',
      'STAT_LABEL_LEGAL_SLA_3': 'Latency Limit', 'STAT_VAL_LEGAL_SLA_3': '< 20ms',
      'SUB_DASHBOARD': 'Dashboard',
      'DASHBOARD_TITLE': 'Neural Access Dashboard',
      'DASHBOARD_LOCKED': 'Secure Workspace Access Locked',
      'DASHBOARD_LOCKED_DESC': 'You must connect your cryptographic Web3 wallet to initialize a secure credentials tunnel and access the validator delegations database.'
    },
    vi: {
      // General Navigation & Switcher
      'SWITCHER_LABEL': 'Chuyển Đổi Trang:',
      'NAV_LANDING_B': 'Giao Diện Tương Tác (B)',
      'NAV_LANDING_A': 'Giao Diện Tĩnh (A)',
      'NAV_SPHERE': 'Mô Hình Pha Lê 3D',
      'NAV_SYSTEM': 'Thông Số Obsidian Flux',
      'NAV_CONSOLE': 'Bảng Điều Khiển Console',

      // Reusable Navbar & Categories
      'NAV_PLATFORM': 'Nền tảng',
      'NAV_ECOSYSTEM': 'Hệ sinh thái',
      'NAV_SHOWCASE': 'Trình diễn',
      'NAV_DOCS': 'Tài liệu',
      'NAV_LEGAL': 'Pháp lý',
      'NAV_EXPLORE_SECTIONS': 'Khám phá các mục',

      // Navbar B & Global Connect
      'CONNECT_BTN': 'Kết nối',
      'VERSION_TAG': 'PHIÊN BẢN 4.0 ĐÃ HOẠT ĐỘNG',
      'HERO_TITLE_PRE': 'TƯƠNG LAI CỦA ',
      'HERO_TITLE_SPAN': 'TRÍ TUỆ.',
      'HERO_SUBTITLE': 'Trải nghiệm thế hệ máy tính thần kinh tiếp theo với trí tuệ 3D nhập vai và sức mạnh xử lý phi tập trung.',
      'GET_STARTED': 'Bắt Đầu Ngay',
      'VIEW_DOCS': 'Tài Liệu Hướng Dẫn',

      // Features Section
      'FEAT_TITLE': 'Kỹ Thuật Vượt Trội',
      'FEAT_1_TITLE': 'Xử Lý Lượng Tử',
      'FEAT_1_DESC': 'Sử dụng các cấu trúc thuật toán phi tuyến tính để xử lý hàng petabyte dữ liệu với mức sinh nhiệt gần như bằng 0 và khả năng mở rộng vô hạn.',
      'FEAT_1_LINK': 'XEM THÔNG SỐ',
      'FEAT_2_TITLE': 'Mạng Lưới Thần Kinh',
      'FEAT_2_DESC': 'Kiến trúc mạng lưới phân tán tự phục hồi duy trì tính toàn vẹn 100% ngay cả trong các điều kiện biến đổi node cực đoan.',
      'FEAT_2_LINK': 'XEM MẠNG LƯỚI',
      'FEAT_3_TITLE': 'Đồng Bộ Sinh Học',
      'FEAT_3_DESC': 'Các lớp đồng bộ hóa nhận thức và xúc giác tiên tiến giúp thu hẹp khoảng cách giữa ý định của con người và quá trình thực thi của máy móc.',
      'FEAT_3_LINK': 'TÌM HIỂU ĐỒNG BỘ',

      // Showcase Section
      'PERFORMANCE_FIRST': 'Hiệu Suất Hàng Đầu',
      'SCALE_TITLE': 'Kiến Trúc Cho Quy Mô Toàn Cầu',
      'SCALE_DESC': 'NEURALIS không chỉ là một nền tảng; nó là một nền móng. Chúng tôi đã tối ưu hóa mọi lớp của hệ thống—từ phần cứng vật lý đến các API giao tiếp—để mang lại trải nghiệm điện ảnh hoàn hảo.',
      'SCALE_POINT_1': 'Mã hóa đầu cuối các luồng truyền dẫn thần kinh',
      'SCALE_POINT_2': 'Đồng bộ hóa thời gian thực không gian làm việc cộng tác',
      'SCALE_POINT_3': 'Phân bổ tài nguyên động dựa trên ý định',

      // Statistics Section
      'STAT_UPTIME': 'Thời Gian Hoạt Động',
      'STAT_LATENCY': 'Độ Trễ Toàn Cầu',
      'STAT_NODES': 'Các Trạm Hoạt Động',

      // Testimonials Section
      'TESTIMONIALS_TITLE': 'Được Tin Dùng Bởi Những Người Tiên Phong',
      'TEST_1_QUOTE': '"Việc chuyển sang NEURALIS là quyết định cơ sở hạ tầng có tác động lớn nhất mà chúng tôi từng đưa ra trong một thập kỷ qua. Tốc độ thật không thể so sánh."',
      'TEST_2_QUOTE': '"Chúng tôi cần một nền tảng tạo cảm giác cao cấp như thương hiệu của mình. Neuralis đã mang lại trải nghiệm giao diện và API đậm chất điện ảnh."',
      'TEST_3_QUOTE': '"Mở rộng quy mô luôn là một điểm đau cho đến khi chúng tôi chuyển sang mạng lưới mesh. Giờ đây, việc tăng trưởng đơn giản chỉ là thay đổi một thông số. Tuyệt vời."',

      // CTA Section
      'CTA_TITLE': 'GIA NHẬP ĐỘI NGŨ TIÊN PHONG.',
      'CTA_DESC': 'Trở thành một phần của mạng lưới điện toán thần kinh tiên tiến nhất hiện nay. Bảo mật, khả năng mở rộng vượt trội, xây dựng cho những kiến trúc sư tương lai.',
      'CTA_BTN': 'Khởi Tạo Kết Nối',

      // Footer
      'FOOTER_SLOGAN': 'Tiên phong khai phá ranh giới giữa trực giác con người và trí tuệ máy móc.',
      'STAY_UPDATED': 'ĐĂNG KÝ CẬP NHẬT',
      'JOIN_BTN': 'Tham gia',
      'EMAIL_PLACEHOLDER': 'Địa chỉ email',

      // Sphere Showcase Page
      'SPHERE_PAGE_TITLE': 'Trình Diễn Quả Cầu Pha Lê 3D',
      'SPHERE_DESC': 'Quả cầu tinh thể pha lê ba chiều hologram tương lai, trong suốt với các cấu trúc fractals bên trong và lõi phát sáng màu xanh cyan huyền ảo. Chi tiết kết xuất được tối ưu hóa cho màn hình tăng tốc phần cứng trực tiếp.',
      'FOCUS_ALL': 'Chế độ: Tất Cả',
      'FOCUS_CORE': 'Chế độ: Lõi Pha Lê',
      'FOCUS_BG': 'Chế độ: Nền Phông',
      'STABILITY_TAG': 'TRẠNG THÁI ỔN ĐỊNH: BÌNH THƯỜNG',
      'ROTATION_TAG': 'MÃ XOAY PHÂN CỰC: HOẠT ĐỘNG',

      // Design System Page
      'DS_TITLE': 'Thông Số Kỹ Thuật Obsidian Flux',
      'DS_SUBTITLE': 'Các quy tắc thiết kế hệ thống giao diện điều hành của Neuralis - được tinh chỉnh cho chế độ nền siêu tối và các lớp phủ hình ảnh hologram cao cấp.',
      'COLOR_PALETTE': 'Bảng Màu & Các Mã Màu',
      'TYPO_TOKENS': 'Các Mã Kiểu Chữ',
      'SPACING_SCALE': 'Quy Chuẩn Khoảng Cách & Bố Cục',

      // Neural Console Page
      'CONSOLE_TITLE': 'Bảng Điều Khiển Hệ Thống',
      'SYS_ALLOCATOR': 'Bộ Phân Bổ Tài Nguyên Hệ Thống',
      'CPU_ALLOC': 'Hiệu Năng Vi Xử Lý (CPU)',
      'MEM_ALLOC': 'Dung Lượng Bộ Nhớ (RAM)',
      'NET_ALLOC': 'Băng Thông Đường Truyền',
      'EFFICIENCY_DIAL': 'Hiệu Suất Đồng Bộ',
      'NODE_MAP': 'Bản Đồ Mạng Lưới Node',
      'TERMINAL_TITLE': 'Cửa Sổ Dòng Lệnh Terminal',
      'NODE_DETAILS': 'Chi Tiết Trạm (Node)',
      'NODE_NAME': 'Tên Node',
      'NODE_STATUS': 'Trạng thái',
      'NODE_LATENCY': 'Độ trễ',
      'NODE_TEMP': 'Nhiệt độ lõi',
      'CLI_PROMPT': 'Nhập lệnh (gõ help để xem danh sách)...',
      'CLI_WELCOME': 'GIAO DIỆN DÒNG LỆNH ĐIỀU HÀNH NEURALIS [PHIÊN BẢN 4.0.2]\n(c) 2026 Tập đoàn Neuralis. Bảo lưu mọi quyền.\n\nGõ lệnh "help" để xem danh sách các lệnh chẩn đoán hệ thống.\n--------------------------------------------------',
      'CMD_NOT_FOUND': 'Lệnh không tồn tại: ',
      'CMD_HELP': 'Danh sách lệnh khả dụng:\n  help      - Hiển thị danh sách lệnh chẩn đoán này\n  status    - Xem các thông số phân bổ tài nguyên hiện tại\n  optimize  - Kích hoạt tiến trình tối ưu hóa đường truyền thần kinh\n  clear     - Xóa lịch sử màn hình dòng lệnh\n  node [id] - Truy vấn thông tin chi tiết của một node (VD: node 1)',
      'CMD_OPTIMIZE_START': 'Đang kích hoạt tiến trình tối ưu hóa...\nĐang phân bổ các vùng đệm dữ liệu...\nĐang làm sạch nhiễu tín hiệu các trạm...',
      'CMD_OPTIMIZE_DONE': 'Tối ưu hóa hoàn tất. Hiệu suất xử lý đã đồng bộ ở mức 100%. Tất cả các trạm ĐẠT CHUẨN.',

      // Global Wallet Modal
      'MODAL_CONNECT_TITLE': 'Kết Nối Đường Truyền',
      'MODAL_CONNECT_DESC': 'Chọn một giao diện trạm xác thực để đồng bộ hóa số dư ví của bạn và thiết lập một kết nối node bảo mật phi tập trung.',

      // Integrated Diagnostic Simulator
      'SIM_TITLE': 'Trình Giả Lập Chẩn Đoán Tích Hợp',
      'SIM_RUN': 'Chạy Chẩn Đoán',
      'SIM_RUN_AGAIN': 'Chạy Lại Chẩn Đoán',
      'SIM_WELCOME': 'Trình chẩn đoán ngoại tuyến. Bấm "Chạy Chẩn Đoán" phía trên để thực hiện kiểm tra tính toàn vẹn của các node.',

      // Dropdown Switch Subpages Labels
      'SUB_QUANTUM_COMPUTE': 'Xử Lý Lượng Tử',
      'SUB_NEURAL_MESH': 'Mạng Lưới Thần Kinh',
      'SUB_BIO_SYNC': 'Đồng Bộ Sinh Học',
      'SUB_SECURITY': 'Bảo Mật Đầu Cuối',
      'SUB_API': 'Cổng Kết Nối API',
      'SUB_PERFORMANCE': 'Thông Số Phần Cứng',
      'SUB_NODES': 'Các Trạm Hoạt Động',
      'SUB_VALIDATORS': 'Trạm Xác Thực',
      'SUB_TOKENOMICS': 'Kinh Tế Token',
      'SUB_GOVERNANCE': 'Quản Trị Phi Tập Trung',
      'SUB_INTEGRATIONS': 'Tích Hợp Mô-Đun',
      'SUB_3D_EXPERIENCE': 'Không Gian 3D',
      'SUB_SPHERE': 'Quả Cầu Pha Lê',
      'SUB_DESIGN_SYSTEM': 'Hệ Thống Thiết Kế',
      'SUB_LANDING_A': 'Landing Tĩnh (A)',
      'SUB_LANDING_B': 'Landing Tương Tác (B)',
      'SUB_GETTING_STARTED': 'Hướng Dẫn Bắt Đầu',
      'SUB_ARCHITECTURE': 'Kiến Trúc Chi Tiết',
      'SUB_CLI': 'Tài Liệu Lệnh CLI',
      'SUB_API_REF': 'Tài Liệu API',
      'SUB_TUTORIALS': 'Hướng Dẫn Chi Tiết',
      'SUB_FAQ': 'Câu Hỏi & Sửa Lỗi',
      'SUB_TERMS': 'Điều Khoản Dịch Vụ',
      'SUB_PRIVACY': 'Chính Sách Bảo Mật',
      'SUB_SECURITY_POLICY': 'Chính Sách Bảo Mật Lỗ Hổng',
      'SUB_COMPLIANCE': 'Tuân Thủ Quy Định',
      'SUB_SLA': 'Cam Kết Dịch Vụ SLA',

      // FAQ Accordion
      'FAQ_SECTION_TITLE': 'Câu Hỏi Thường Gặp & Sửa Lỗi Chung',
      'FAQ_Q_0': 'Làm thế nào để chạy một trạm xác thực cục bộ?',
      'FAQ_A_0': 'Tải xuống Neuralis CLI từ NPM, chạy lệnh "neuralis login" để liên kết ví của bạn, sau đó gọi "neuralis node --start" để đăng ký trạm xác thực hoạt động.',
      'FAQ_Q_1': 'Thời gian khóa token khi stake là bao lâu?',
      'FAQ_A_1': 'Thời gian khóa stake tiêu chuẩn là 14 ngày, mang lại lợi suất 8.4% APY. Các bể staking dài hạn cung cấp khóa tối đa 180 ngày với lợi suất lên đến 14.2% APY.',
      'FAQ_Q_2': 'Phí gas được tính như thế nào trên mạng lưới thần kinh?',
      'FAQ_A_2': 'Phí gas được tính toán động dựa trên độ dài hàng đợi xử lý và độ trễ của node. Một giao dịch thông thường tốn chưa đến 0.001 USD quy đổi bằng $NEURAL.',
      'FAQ_Q_3': 'Đồng bộ nhận thức xúc giác có an toàn cho thiết bị tiêu dùng không?',
      'FAQ_A_3': 'Có, các giao thức bio-sync sử dụng các tần số xúc giác tiêu chuẩn, không xâm lấn, được phê duyệt bởi các tiêu chuẩn an toàn phần cứng quốc tế.',
      'FAQ_Q_4': 'Điều gì xảy ra nếu trạm xác thực của tôi bị ngoại tuyến?',
      'FAQ_A_4': 'Mất kết nối ngắn hạn sẽ khiến phần thưởng bị tạm dừng. Việc mất kết nối kéo dài (hơn 24 giờ) có thể kích hoạt phạt stake nhẹ để bảo vệ tính toàn vẹn của mạng lưới.',

      // --- PLATFORM CATEGORY PAGES TRANSLATIONS ---
      'TITLE_PLATFORM_QUANTUM_COMPUTE': 'Lõi Điện Toán Lượng Tử',
      'DESC_PLATFORM_QUANTUM_COMPUTE_P1': 'Kiến trúc qubit siêu dẫn chạy các thuật toán phi tuyến tính ở nhiệt độ không tuyệt đối. Xử lý tức thời hàng petabyte mảng tensor đa chiều để kích hoạt các quyết định nhận thức ngay lập tức.',
      'DESC_PLATFORM_QUANTUM_COMPUTE_P2': 'Được trang bị hệ thống tự động sửa lỗi trạng thái lượng tử và đo lường từ xa node xúc giác, lõi xử lý của chúng tôi vượt qua hoàn toàn các giới hạn vật lý của chip silicon cổ điển.',
      'STAT_LABEL_PLATFORM_QUANTUM_COMPUTE_1': 'Số Qubits', 'STAT_VAL_PLATFORM_QUANTUM_COMPUTE_1': '5.000 Qubits',
      'STAT_LABEL_PLATFORM_QUANTUM_COMPUTE_2': 'Tỷ Lệ Lỗi', 'STAT_VAL_PLATFORM_QUANTUM_COMPUTE_2': '0.0001%',
      'STAT_LABEL_PLATFORM_QUANTUM_COMPUTE_3': 'Tăng Tốc Thô', 'STAT_VAL_PLATFORM_QUANTUM_COMPUTE_3': '15.000 lần',

      'TITLE_PLATFORM_NEURAL_MESH': 'Mạng Lưới Thần Kinh Phi Tập Trung',
      'DESC_PLATFORM_NEURAL_MESH_P1': 'Kiến trúc mạng lưới phân tán tự phục hồi kết nối các trạm xác thực điện toán toàn cầu. Sử dụng các thuật toán định tuyến gói tin động để duy trì thời gian hoạt động của đường truyền ở mức 100%.',
      'DESC_PLATFORM_NEURAL_MESH_P2': 'Các đường truyền dữ liệu được bảo mật và mã hóa đầu cuối, cung cấp các đường ống không máy chủ trực tiếp đồng bộ hóa các sửa đổi trạng thái trên các node ngay lập tức.',
      'STAT_LABEL_PLATFORM_NEURAL_MESH_1': 'Mạng Lưới Hoạt Động', 'STAT_VAL_PLATFORM_NEURAL_MESH_1': '1.2 Triệu Nodes',
      'STAT_LABEL_PLATFORM_NEURAL_MESH_2': 'Độ Trễ Chuyển Dự Phòng', 'STAT_VAL_PLATFORM_NEURAL_MESH_2': '< 1ms',
      'STAT_LABEL_PLATFORM_NEURAL_MESH_3': 'Băng Thông Mạng', 'STAT_VAL_PLATFORM_NEURAL_MESH_3': '10 Tbps',

      'TITLE_PLATFORM_BIO_SYNC': 'Đồng Bộ Nhận Thức Xúc Giác',
      'DESC_PLATFORM_BIO_SYNC_P1': 'Vòng đồng bộ nhận thức trực tiếp giữa não người và máy tính. Sử dụng kích thích thần kinh dưới cảm giác để đồng bộ ý định con người và quá trình thực thi cơ học, tạo ra liên kết nhập vai hoàn hảo.',
      'DESC_PLATFORM_BIO_SYNC_P2': 'Tận dụng các phản hồi xúc giác tiên tiến để ánh xạ các vi hành động vật lý sang các thông số kỹ thuật số trong thời gian thực, giảm ma sát giao diện về mức không.',
      'STAT_LABEL_PLATFORM_BIO_SYNC_1': 'Độ Sâu Đồng Bộ', 'STAT_VAL_PLATFORM_BIO_SYNC_1': '99.8%',
      'STAT_LABEL_PLATFORM_BIO_SYNC_2': 'Độ Trễ Đường Truyền', 'STAT_VAL_PLATFORM_BIO_SYNC_2': '2ms',
      'STAT_LABEL_PLATFORM_BIO_SYNC_3': 'Người Dùng Hoạt Động', 'STAT_VAL_PLATFORM_BIO_SYNC_3': '24.500 Người',

      'TITLE_PLATFORM_SECURITY': 'Bảo Mật Mã Hóa Đầu Cuối',
      'DESC_PLATFORM_SECURITY_P1': 'Lớp bảo vệ mã hóa đầu cuối được bảo mật bằng thuật toán toán học dựa trên cấu trúc lưới (lattice-based). Đảm bảo khả năng chống bẻ khóa trước các mô hình đe dọa lượng tử trong tương lai.',
      'DESC_PLATFORM_SECURITY_P2': 'Bằng chứng không kiến thức (ZKP) giúp bảo mật các giao dịch và danh tính mạng mà không làm lộ siêu dữ liệu nhạy cảm của người dùng, bảo vệ quyền riêng tư tuyệt đối.',
      'STAT_LABEL_PLATFORM_SECURITY_1': 'Loại Mã Hóa', 'STAT_VAL_PLATFORM_SECURITY_1': 'Lattice 512',
      'STAT_LABEL_PLATFORM_SECURITY_2': 'Thời Gian Bẻ Khóa', 'STAT_VAL_PLATFORM_SECURITY_2': '1.5 Tỷ Năm',
      'STAT_LABEL_PLATFORM_SECURITY_3': 'Đánh Giá Bảo Mật', 'STAT_VAL_PLATFORM_SECURITY_3': 'CHUẨN A+',

      'TITLE_PLATFORM_API': 'Cổng Kết Nối Nhà Phát Triển',
      'DESC_PLATFORM_API_P1': 'Khung kết nối API REST, gRPC và WebSockets độ trễ cực thấp. Truyền dữ liệu thần kinh hoặc khởi chạy các tác nhân ảo tùy chỉnh chỉ trong vài giây thông qua các điểm cuối toàn cầu của chúng tôi.',
      'DESC_PLATFORM_API_P2': 'Môi trường thử nghiệm sandbox toàn diện, các gói SDK hoàn chỉnh và trình kích hoạt webhook hỗ trợ xây dựng các quy trình phần mềm tự động hóa cao.',
      'STAT_LABEL_PLATFORM_API_1': 'Độ Trễ Phản Hồi', 'STAT_VAL_PLATFORM_API_1': '4ms',
      'STAT_LABEL_PLATFORM_API_2': 'Cam Kết Hoạt Động', 'STAT_VAL_PLATFORM_API_2': '99.999%',
      'STAT_LABEL_PLATFORM_API_3': 'Lượt Gọi Hàng Ngày', 'STAT_VAL_PLATFORM_API_3': '2.5 Tỷ Lượt',

      'TITLE_PLATFORM_PERFORMANCE': 'Hiệu Năng Phần Cứng Tối Đa',
      'DESC_PLATFORM_PERFORMANCE_P1': 'Các mảng xử lý tăng tốc ASIC chuyên dụng được cấu hình riêng cho các tính toán mạng thần kinh. Chạy các hoạt động ánh xạ bộ nhớ trực tiếp trên phần cứng bare-metal.',
      'DESC_PLATFORM_PERFORMANCE_P2': 'Các đường dẫn thực thi phần cứng trực tiếp bỏ qua các lớp ảo hóa tiêu chuẩn, mang lại tốc độ xử lý vô song và kiểm soát nhiệt độ lõi cực tốt.',
      'STAT_LABEL_PLATFORM_PERFORMANCE_1': 'Chỉ Số IOPS Tối Đa', 'STAT_VAL_PLATFORM_PERFORMANCE_1': '4.5 Triệu',
      'STAT_LABEL_PLATFORM_PERFORMANCE_2': 'Nhiệt Độ Lõi', 'STAT_VAL_PLATFORM_PERFORMANCE_2': '38°C',
      'STAT_LABEL_PLATFORM_PERFORMANCE_3': 'Sức Mạnh Tính Toán', 'STAT_VAL_PLATFORM_PERFORMANCE_3': '850 TFLOPS',

      // --- ECOSYSTEM CATEGORY PAGES TRANSLATIONS ---
      'TITLE_ECOSYSTEM_NODES': 'Bản Đồ Các Trạm Hoạt Động',
      'DESC_ECOSYSTEM_NODES_P1': 'Hệ thống phân phối toàn cầu các node xác thực cung cấp tài nguyên tính toán và lưu trữ. Tự động điều phối và cân bằng lưu lượng truy cập qua các điểm máy chủ địa lý.',
      'DESC_ECOSYSTEM_NODES_P2': 'Cho phép bất kỳ cá nhân nào cũng có thể khởi chạy một node xác thực cục bộ và tham gia bảo mật mạng lưới trong khi tích lũy phần thưởng phi tập trung.',
      'STAT_LABEL_ECOSYSTEM_NODES_1': 'Số Trạm Toàn Cầu', 'STAT_VAL_ECOSYSTEM_NODES_1': '150.000 Nodes',
      'STAT_LABEL_ECOSYSTEM_NODES_2': 'Lợi Nhuận Ước Tính', 'STAT_VAL_ECOSYSTEM_NODES_2': '8.4% APY',
      'STAT_LABEL_ECOSYSTEM_NODES_3': 'Token Đang Stake', 'STAT_VAL_ECOSYSTEM_NODES_3': '450M NEURAL',
      'NODES_EDU_P2P_TITLE': 'Mạng Lưới P2P & Lan Truyền Dữ Liệu',
      'NODES_EDU_P2P_DESC': 'Mạng phi tập trung dựa trên các giao thức gossip ngang hàng để lan truyền các khối và giao dịch. Khi một node nhận dữ liệu mới, nó sẽ phát sóng tới các node lân cận. Hiệu ứng gợn sóng này lan truyền toàn cầu trong mili giây, được gọi là độ trễ lan truyền mạng.',
      'NODES_EDU_VAL_TITLE': 'Vai Trò Validator & Độ Trễ',
      'NODES_EDU_VAL_DESC': 'Các trạm xác thực (Validator) là các phiên bản node chuyên dụng chạy công cụ đồng thuận. Họ thu thập giao dịch, đóng gói thành khối, xác minh chữ ký mã hóa và bỏ phiếu tính hợp lệ. Việc giảm thiểu độ trễ giúp ngăn chặn phân nhánh mạng.',

      'TITLE_ECOSYSTEM_VALIDATORS': 'Đồng Thuận Trạm Xác Thực',
      'DESC_ECOSYSTEM_VALIDATORS_P1': 'Cơ chế đồng thuận Proof of Stake được củng cố bởi thuật toán chịu lỗi Byzantine. Đảm bảo an toàn dữ liệu phi tập trung, tính toàn vẹn của khối và xác thực giao dịch tức thời.',
      'DESC_ECOSYSTEM_VALIDATORS_P2': 'Các trạm xác thực chủ động kiểm tra và đóng dấu các cập nhật trạng thái, duy trì độ tin cậy và tính xác thực cao trên chuỗi mà không cần bên trung gian.',
      'STAT_LABEL_ECOSYSTEM_VALIDATORS_1': 'Validator Đang Chạy', 'STAT_VAL_ECOSYSTEM_VALIDATORS_1': '4.800 Trạm',
      'STAT_LABEL_ECOSYSTEM_VALIDATORS_2': 'Tốc Độ Đồng Thuận', 'STAT_VAL_ECOSYSTEM_VALIDATORS_2': '1.2 giây',
      'STAT_LABEL_ECOSYSTEM_VALIDATORS_3': 'Node Bị Phạt', 'STAT_VAL_ECOSYSTEM_VALIDATORS_3': '0 Node',

      'TITLE_ECOSYSTEM_TOKENOMICS': 'Phân Bổ Kinh Tế Token',
      'DESC_ECOSYSTEM_TOKENOMICS_P1': 'Token $NEURAL đóng vai trò quản trị phân bổ tài nguyên, chi trả phí gas giao thức và bảo mật mạng lưới xác thực. Được phân phối để phần thưởng cho những người đóng góp node.',
      'DESC_ECOSYSTEM_TOKENOMICS_P2': 'Thiết kế tích hợp cơ chế giảm phát và thuật toán kéo dài lợi nhuận giúp duy trì tính ổn định lâu dài và sự phát triển bền vững của hệ sinh thái.',
      'STAT_LABEL_ECOSYSTEM_TOKENOMICS_1': 'Tổng Cung', 'STAT_VAL_ECOSYSTEM_TOKENOMICS_1': '1.0B NEURAL',
      'STAT_LABEL_ECOSYSTEM_TOKENOMICS_2': 'Lượng Lưu Hành', 'STAT_VAL_ECOSYSTEM_TOKENOMICS_2': '65%',
      'STAT_LABEL_ECOSYSTEM_TOKENOMICS_3': 'Đã Đốt (Burned)', 'STAT_VAL_ECOSYSTEM_TOKENOMICS_3': '12.4 Triệu',

      'TITLE_ECOSYSTEM_GOVERNANCE': 'Quản Trị Phi Tập Trung',
      'DESC_ECOSYSTEM_GOVERNANCE_P1': 'Mô hình quản trị DAO trao quyền cho các thành viên cộng đồng gửi đề xuất và tham gia bỏ phiếu về các quyết định cải tiến giao thức, nâng cấp mã và phân bổ quỹ.',
      'DESC_ECOSYSTEM_GOVERNANCE_P2': 'Trọng số bỏ phiếu được xác định bởi số lượng token stake, khuyến khích các bên tham gia luôn đưa ra các lựa chọn có lợi cho sự an toàn của toàn hệ thống.',
      'STAT_LABEL_ECOSYSTEM_GOVERNANCE_1': 'Đề Xuất Đang Mở', 'STAT_VAL_ECOSYSTEM_GOVERNANCE_1': '84 Đề Xuất',
      'STAT_LABEL_ECOSYSTEM_GOVERNANCE_2': 'Tỷ Lệ Bỏ Phiếu', 'STAT_VAL_ECOSYSTEM_GOVERNANCE_2': '72%',
      'STAT_LABEL_ECOSYSTEM_GOVERNANCE_3': 'Quỹ Cộng Đồng', 'STAT_VAL_ECOSYSTEM_GOVERNANCE_3': '$45.2M USD',

      'TITLE_ECOSYSTEM_INTEGRATIONS': 'Tích Hợp Bên Thứ Ba',
      'DESC_ECOSYSTEM_INTEGRATIONS_P1': 'Các mô-đun kết nối liền mạch liên kết các node Neuralis với các chuỗi khối bên ngoài, cơ sở dữ liệu và hệ thống doanh nghiệp mà không phát sinh chi phí cấu hình.',
      'DESC_ECOSYSTEM_INTEGRATIONS_P2': 'Cho phép các nhà phát triển tích hợp trực tiếp các trình kích hoạt tính toán bên ngoài vào lớp thực thi thần kinh, mở ra khả năng mở rộng không giới hạn.',
      'STAT_LABEL_ECOSYSTEM_INTEGRATIONS_1': 'Mạng Kết Nối', 'STAT_VAL_ECOSYSTEM_INTEGRATIONS_1': '12 Chains',
      'STAT_LABEL_ECOSYSTEM_INTEGRATIONS_2': 'Mô-đun Trung Gian', 'STAT_VAL_ECOSYSTEM_INTEGRATIONS_2': '250+ Modules',
      'STAT_LABEL_ECOSYSTEM_INTEGRATIONS_3': 'Thời Gian Thiết Lập', 'STAT_VAL_ECOSYSTEM_INTEGRATIONS_3': '< 5 phút',

      // --- SHOWCASE CATEGORY PAGES TRANSLATIONS ---
      'TITLE_SHOWCASE_3D_EXPERIENCE': 'Trình Diễn Không Gian 3D',
      'DESC_SHOWCASE_3D_EXPERIENCE_P1': 'Sử dụng đồ họa WebGPU và WebGL nhập vai hiển thị các node trực quan tương tác. Khám phá giới hạn của các công cụ đồ họa 3D chạy trên trình duyệt.',
      'DESC_SHOWCASE_3D_EXPERIENCE_P2': 'Bao gồm bản đồ ánh sáng động và trường luồng vector phản hồi ngay lập tức với các sự kiện cuộn trang hoặc thay đổi kích thước cửa sổ hiển thị.',
      'STAT_LABEL_SHOWCASE_3D_EXPERIENCE_1': 'Tỷ Lệ Khung Hình', 'STAT_VAL_SHOWCASE_3D_EXPERIENCE_1': '120 FPS',
      'STAT_LABEL_SHOWCASE_3D_EXPERIENCE_2': 'Lượt Gọi Vẽ', 'STAT_VAL_SHOWCASE_3D_EXPERIENCE_2': '120 Calls',
      'STAT_LABEL_SHOWCASE_3D_EXPERIENCE_3': 'Mức Tải GPU', 'STAT_VAL_SHOWCASE_3D_EXPERIENCE_3': '18% Load',

      // --- DOCS CATEGORY PAGES TRANSLATIONS ---
      'TITLE_DOCS_GETTING_STARTED': 'Hướng Dẫn Cài Đặt & Khởi Tạo',
      'DESC_DOCS_GETTING_STARTED_P1': 'Tìm hiểu cách tải các gói Neuralis CLI, khởi tạo cấu hình và thực thi liên kết node đầu tiên trong môi trường hộp cát (sandbox) sạch sẽ.',
      'DESC_DOCS_GETTING_STARTED_P2': 'Các hướng dẫn bắt đầu nhanh giúp bạn triển khai một môi trường phi tập trung được tối ưu hóa trong chưa đầy năm phút bằng các lệnh dòng lệnh cơ bản.',
      'STAT_LABEL_DOCS_GETTING_STARTED_1': 'Các Bước Thiết Lập', 'STAT_VAL_DOCS_GETTING_STARTED_1': '3 Bước',
      'STAT_LABEL_DOCS_GETTING_STARTED_2': 'Thời Gian Cài Đặt', 'STAT_VAL_DOCS_GETTING_STARTED_2': '2 phút',
      'STAT_LABEL_DOCS_GETTING_STARTED_3': 'Kênh Hỗ Trợ', 'STAT_VAL_DOCS_GETTING_STARTED_3': 'Tài Liệu 24/7',

      'TITLE_DOCS_ARCHITECTURE': 'Kiến Trúc Hệ Thống Chi Tiết',
      'DESC_DOCS_ARCHITECTURE_P1': 'Khám phá các lớp xử lý nội bộ của mạng Neuralis, đi sâu từ tầng phần cứng bare-metal vật lý lên đến các cấu trúc định tuyến ứng dụng.',
      'DESC_DOCS_ARCHITECTURE_P2': 'Mô tả chi tiết về cơ chế hàng đợi bộ nhớ không đồng bộ, bộ đệm socket không sao chép (zero-copy) và các tuyến đường xác thực giao dịch.',
      'STAT_LABEL_DOCS_ARCHITECTURE_1': 'Số Tầng Xử Lý', 'STAT_VAL_DOCS_ARCHITECTURE_1': '4 Tầng',
      'STAT_LABEL_DOCS_ARCHITECTURE_2': 'Giới Hạn Bộ Đệm', 'STAT_VAL_DOCS_ARCHITECTURE_2': '64 MB',
      'STAT_LABEL_DOCS_ARCHITECTURE_3': 'Độ Trễ Nội Bộ', 'STAT_VAL_DOCS_ARCHITECTURE_3': '< 100ns',

      'TITLE_DOCS_CLI_REFERENCE': 'Tài Liệu Các Lệnh Dòng Lệnh CLI',
      'DESC_DOCS_CLI_REFERENCE_P1': 'Danh sách cú pháp đầy đủ và các tùy chọn cho công cụ terminal dòng lệnh neuralis. Quản lý phân bổ node và tối ưu hóa đường truyền ngay từ shell lệnh.',
      'DESC_DOCS_CLI_REFERENCE_P2': 'Bao gồm các đối số chẩn đoán lỗi, kiểm tra validator hoạt động và các bộ kích hoạt tự động hóa cấu hình hệ thống.',
      'STAT_LABEL_DOCS_CLI_REFERENCE_1': 'Tổng Số Lệnh', 'STAT_VAL_DOCS_CLI_REFERENCE_1': '45 Lệnh',
      'STAT_LABEL_DOCS_CLI_REFERENCE_2': 'Hỗ Trợ Môi Trường', 'STAT_VAL_DOCS_CLI_REFERENCE_2': 'Bash / PowerShell',
      'STAT_LABEL_DOCS_CLI_REFERENCE_3': 'Tần Suất Cập Nhật', 'STAT_VAL_DOCS_CLI_REFERENCE_3': 'Hàng Tuần',

      'TITLE_DOCS_API_REFERENCE': 'Tài Liệu API REST & WebSockets',
      'DESC_DOCS_API_REFERENCE_P1': 'Tài liệu lập trình kết nối và gọi các điểm cuối Neuralis. Hướng dẫn chi tiết cấu hình dữ liệu JSON-RPC và các đường dẫn lắng nghe sự kiện.',
      'DESC_DOCS_API_REFERENCE_P2': 'Hỗ trợ thực thi lệnh từ xa bảo mật, thực hiện truy vấn trạng thái node thời gian thực và phát trực tuyến luồng phân tích dữ liệu mạng.',
      'STAT_LABEL_DOCS_API_REFERENCE_1': 'Số Điểm Cuối', 'STAT_VAL_DOCS_API_REFERENCE_1': '64 Điểm Cuối',
      'STAT_LABEL_DOCS_API_REFERENCE_2': 'Kết Nối Tối Đa', 'STAT_VAL_DOCS_API_REFERENCE_2': '10M Kết Nối',
      'STAT_LABEL_DOCS_API_REFERENCE_3': 'Kiểu Xác Thực', 'STAT_VAL_DOCS_API_REFERENCE_3': 'Chữ Ký ECDSA',

      'TITLE_DOCS_TUTORIALS': 'Hướng Dẫn Tạo Ứng Dụng Tác Nhân',
      'DESC_DOCS_TUTORIALS_P1': 'Thực hiện theo các bài hướng dẫn từng bước để xây dựng một tác nhân xác thực trò chuyện ảo, đồng bộ hóa nó lên mạng lưới và xử lý các yêu cầu tự động.',
      'DESC_DOCS_TUTORIALS_P2': 'Bao gồm xây dựng môi trường cục bộ, cấu hình mô-đun ứng dụng, ký xác nhận giao dịch và các bước triển khai chạy thực tế.',
      'STAT_LABEL_DOCS_TUTORIALS_1': 'Độ Khó', 'STAT_VAL_DOCS_TUTORIALS_1': 'Dễ Tiếp Cận',
      'STAT_LABEL_DOCS_TUTORIALS_2': 'Số Bài Viết', 'STAT_VAL_DOCS_TUTORIALS_2': '12 Bài Hướng Dẫn',
      'STAT_LABEL_DOCS_TUTORIALS_3': 'Người Hoàn Thành', 'STAT_VAL_DOCS_TUTORIALS_3': '45.000+ Lập Trình Viên',

      'TITLE_DOCS_FAQ': 'Câu Hỏi & Sửa Lỗi',
      'DESC_DOCS_FAQ_P1': 'Tổng hợp các câu trả lời nhanh cho các sự cố thường gặp liên quan đến kết nối node, phần thưởng validator, khóa staking và ký xác thực ví.',
      'DESC_DOCS_FAQ_P2': 'Vui lòng kiểm tra các mục accordion chi tiết bên dưới để khắc phục tình trạng gián đoạn tín hiệu hoặc lỗi đồng bộ bộ nhớ cache.',
      'STAT_LABEL_DOCS_FAQ_1': 'Tỷ Lệ Giải Quyết', 'STAT_VAL_DOCS_FAQ_1': '94%',
      'STAT_LABEL_DOCS_FAQ_2': 'Yêu Cầu Đang Mở', 'STAT_VAL_DOCS_FAQ_2': '0 Đang Mở',
      'STAT_LABEL_DOCS_FAQ_3': 'Thời Gian Phản Hồi', 'STAT_VAL_DOCS_FAQ_3': '< 10 phút',

      // --- LEGAL CATEGORY PAGES TRANSLATIONS ---
      'TITLE_LEGAL_TERMS': 'Điều Khoản Dịch Vụ',
      'DESC_LEGAL_TERMS_P1': 'Quy định các điều khoản sử dụng và trách nhiệm pháp lý khi tham gia mạng Neuralis. Bằng việc kết nối ví, người dùng đồng ý tuân thủ các quy tắc xác thực phân tán.',
      'DESC_LEGAL_TERMS_P2': 'Chỉ rõ các mục tiêu tuân thủ, cấu trúc phí gas giao thức, ranh giới tài nguyên tính toán và các quy trình giải quyết tranh chấp.',
      'STAT_LABEL_LEGAL_TERMS_1': 'Phiên Bản', 'STAT_VAL_LEGAL_TERMS_1': 'v4.2',
      'STAT_LABEL_LEGAL_TERMS_2': 'Ngày Hiệu Lực', 'STAT_VAL_LEGAL_TERMS_2': 'Tháng 6, 2026',
      'STAT_LABEL_LEGAL_TERMS_3': 'Số Điều Khoản', 'STAT_VAL_LEGAL_TERMS_3': '28 Điều Khoản',

      'TITLE_LEGAL_PRIVACY': 'Chính Sách Bảo Mật & Lưu Trữ',
      'DESC_LEGAL_PRIVACY_P1': 'Khái quát các thông tin siêu dữ liệu được xử lý trong hệ thống. Neuralis cam kết không bao giờ ghi nhật ký khóa riêng tư, vị trí thực tế hoặc thông tin cá nhân.',
      'DESC_LEGAL_PRIVACY_P2': 'Bộ nhớ cục bộ của trình duyệt chỉ được sử dụng duy nhất để lưu trữ tạm thời cấu hình giao diện (như ngôn ngữ đã chọn, giao diện tối, trạng thái kết nối ví).',
      'STAT_LABEL_LEGAL_PRIVACY_1': 'Cookies Thiết Lập', 'STAT_VAL_LEGAL_PRIVACY_1': '0 Cookies',
      'STAT_LABEL_LEGAL_PRIVACY_2': 'Theo Dõi Dữ Liệu', 'STAT_VAL_LEGAL_PRIVACY_2': 'Đã Tắt',
      'STAT_LABEL_LEGAL_PRIVACY_3': 'Mã Hóa Bộ Nhớ Cục Bộ', 'STAT_VAL_LEGAL_PRIVACY_3': 'AES-GCM Cache',

      'TITLE_LEGAL_SECURITY_POLICY': 'Chính Sách Báo Cáo Lỗ Hổng Bảo Mật',
      'DESC_LEGAL_SECURITY_POLICY_P1': 'Hướng dẫn hoạt động dành cho các nhà nghiên cứu bảo mật mũ trắng. Giúp bảo vệ tài sản mạng lưới phi tập trung khỏi các cuộc tấn công khai thác lỗ hổng hoặc DDoS.',
      'DESC_LEGAL_SECURITY_POLICY_P2': 'Cung cấp các kênh liên hệ an toàn và thông tin chi tiết về chương trình săn tiền thưởng tìm lỗi (bug bounty) đối với các lỗi nghiêm trọng zero-day.',
      'STAT_LABEL_LEGAL_SECURITY_POLICY_1': 'Bounty Tối Đa', 'STAT_VAL_LEGAL_SECURITY_POLICY_1': '$250.000 USD',
      'STAT_LABEL_LEGAL_SECURITY_POLICY_2': 'Phản Hồi Đầu Tiên', 'STAT_VAL_LEGAL_SECURITY_POLICY_2': '< 12 giờ',
      'STAT_LABEL_LEGAL_SECURITY_POLICY_3': 'Lỗi Bảo Mật Đang Mở', 'STAT_VAL_LEGAL_SECURITY_POLICY_3': '0 Lỗi Hoạt Động',

      'TITLE_LEGAL_COMPLIANCE': 'Tuân Thủ Quy Định & Kiểm Toán',
      'DESC_LEGAL_COMPLIANCE_P1': 'Chi tiết các tiêu chuẩn pháp lý được tuân thủ nghiêm ngặt bởi các node xác thực mạng lưới. Tích hợp kiểm tra bảo mật tự động phù hợp với chính sách quốc tế.',
      'DESC_LEGAL_COMPLIANCE_P2': 'Đảm bảo tích hợp kiểm tra AML/KYC đối với các validator chạy cấu hình doanh nghiệp lớn nhằm xây dựng một không gian mạng đáng tin cậy cao.',
      'STAT_LABEL_LEGAL_COMPLIANCE_1': 'Tỷ Lệ Tuân Thủ', 'STAT_VAL_LEGAL_COMPLIANCE_1': '100% ĐẠT',
      'STAT_LABEL_LEGAL_COMPLIANCE_2': 'Đơn Vị Kiểm Toán', 'STAT_VAL_LEGAL_COMPLIANCE_2': 'ConsenSys Dil.',
      'STAT_LABEL_LEGAL_COMPLIANCE_3': 'Đợt Kiểm Toán Đã Qua', 'STAT_VAL_LEGAL_COMPLIANCE_3': '4 / 4 Đợt',

      'TITLE_LEGAL_SLA': 'Cam Kết Chất Lượng Dịch Vụ SLA',
      'DESC_LEGAL_SLA_P1': 'Bảo đảm tỷ lệ thời gian hoạt động tối thiểu 99.99% cho các cổng điểm cuối phi tập trung và các cổng định tuyến RPC node. Phát hành credit hoàn trả nếu xảy ra sự cố.',
      'DESC_LEGAL_SLA_P2': 'Duy trì các mạng lưới chuyển mạch dự phòng và phân phối tải thời gian thực để ngăn chặn tuyệt đối tình trạng gián đoạn mạng lưới node.',
      'STAT_LABEL_LEGAL_SLA_1': 'Thời Gian Hoạt Động SLA', 'STAT_VAL_LEGAL_SLA_1': '99.99% SLA',
      'STAT_LABEL_LEGAL_SLA_2': 'Mức Đền Bù', 'STAT_VAL_LEGAL_SLA_2': '100% Core',
      'STAT_LABEL_LEGAL_SLA_3': 'Giới Hạn Độ Trễ', 'STAT_VAL_LEGAL_SLA_3': '< 20ms',
      'SUB_DASHBOARD': 'Bảng điều khiển',
      'DASHBOARD_TITLE': 'Bảng Điều Khiển Truy Cập Hệ Thống',
      'DASHBOARD_LOCKED': 'Truy Cập Không Gian Làm Việc Đang Bị Khóa',
      'DASHBOARD_LOCKED_DESC': 'Bạn phải kết nối ví Web3 để khởi tạo đường truyền bảo mật thông tin xác thực và truy cập cơ sở dữ liệu ủy thác Validator.'
    },
    ko: {
      // General Navigation & Switcher
      'SWITCHER_LABEL': '화면 전환기:',
      'NAV_LANDING_B': '인터랙티브 랜딩 (B)',
      'NAV_LANDING_A': '정적 랜딩 (A)',
      'NAV_SPHERE': '3D 크리스탈 스테이지',
      'NAV_SYSTEM': '옵시디언 플럭스 사양',
      'NAV_CONSOLE': '뉴럴 콘솔',

      // Reusable Navbar & Categories
      'NAV_PLATFORM': '플랫폼',
      'NAV_ECOSYSTEM': '생태계',
      'NAV_SHOWCASE': '쇼케이스',
      'NAV_DOCS': '설명서',
      'NAV_LEGAL': '법률',
      'NAV_EXPLORE_SECTIONS': '섹션 탐색',

      // Navbar B & Global Connect
      'CONNECT_BTN': '연결',
      'VERSION_TAG': '버전 4.0 라이브 출시',
      'HERO_TITLE_PRE': '인텔렉트의 ',
      'HERO_TITLE_SPAN': '미래.',
      'HERO_SUBTITLE': '몰입형 3D 지능과 분산 처리 능력을 갖춘 차세대 뉴럴 컴퓨팅을 경험해 보세요.',
      'GET_STARTED': '시작하기',
      'VIEW_DOCS': '설명서 보기',

      // Features Section
      'FEAT_TITLE': '엔지니어링된 우수성',
      'FEAT_1_TITLE': '양자 프로세싱',
      'FEAT_1_DESC': '비선형 알고리즘 구조를 활용하여 거의 제로에 가까운 열 서명และ 무한한 확장성으로 페타바이트급 데이터를 처리합니다.',
      'FEAT_1_LINK': '사양 탐색',
      'FEAT_2_TITLE': '뉴럴 메쉬',
      'FEAT_2_DESC': '극한의 노드 분산 조건에서도 100% 무결성을 유지하는 자가 치유형 분산 네트워크 아키텍처입니다.',
      'FEAT_2_LINK': '네트워크 보기',
      'FEAT_3_TITLE': '바이오 싱크',
      'FEAT_3_DESC': '인간의 의도와 기계 실행 간의 격차를 해소하는 고급 햅틱 및 인지 동기화 레이어입니다.',
      'FEAT_3_LINK': '동기화 학습',

      // Showcase Section
      'PERFORMANCE_FIRST': '성능 우선',
      'SCALE_TITLE': '글로벌 스케일을 위한 아키텍처',
      'SCALE_DESC': 'NEURALIS는 단순한 플랫폼이 아니라 기초입니다. 베어 메탈부터 전면 API에 이르기까지 스택의 모든 레이어를 최적화하여 타협 없는 시네마틱 경험을 제공합니다.',
      'SCALE_POINT_1': '종단 간 암호화된 뉴럴 경로',
      'SCALE_POINT_2': '실시간 협업 워크스페이스 동기화',
      'SCALE_POINT_3': '의도 기반 동적 리소스 할당',

      // Statistics Section
      'STAT_UPTIME': '플랫폼 가동 시간',
      'STAT_LATENCY': '글로벌 지연 시간',
      'STAT_NODES': '활성 노드 수',

      // Testimonials Section
      'TESTIMONIALS_TITLE': '개척자들이 신뢰하는 기술',
      'TEST_1_QUOTE': '"NEURALIS로의 전환은 지난 10년 동안 우리가 내린 인프라 결정 중 가장 영향력 있는 단일 결정이었습니다. 속도는 비교할 수 없습니다."',
      'TEST_2_QUOTE': '"우리는 우리 브랜드만큼이나 고급스러운 느낌을 주는 플랫폼이 필요했습니다. Neuralis는 순전히 시네마틱한 UI 및 API 경험을 제공했습니다."',
      'TEST_3_QUOTE': '"메쉬로 이동하기 전까지 스케일링은 항상 문제였습니다. 이제 성장은 간단한 매개변수 전환입니다. 절대적으로 훌륭합니다."',

      // CTA Section
      'CTA_TITLE': '뱅가드에 합류하세요.',
      'CTA_DESC': '존재하는 가장 진보된 뉴럴 컴퓨팅 네트워크의 일원이 되십시오. 내일의 설계자들을 위해 구축된 안전하고 확장 가능한 아키텍처입니다.',
      'CTA_BTN': '액세스 초기화',

      // Footer
      'FOOTER_SLOGAN': '인간의 직관과 기계 지능 사이의 경계를 개척합니다.',
      'STAY_UPDATED': '최신 뉴스 받기',
      'JOIN_BTN': '가입',
      'EMAIL_PLACEHOLDER': '이메일 주소',

      // Sphere Showcase Page
      'SPHERE_PAGE_TITLE': '3D 크리스탈 스테이지 쇼케이스',
      'SPHERE_DESC': '내부 프랙탈과 빛나는 일렉트릭 시안 코어가 있는 미래 지향적이고 반투명한 3D 홀로그램 크리스탈 구체입니다. 하드웨어 가속 디스플레이에 최적화된 시각 효과를 선보입니다.',
      'FOCUS_ALL': '포커스: 전체',
      'FOCUS_CORE': '포커스: 크리스탈 코어',
      'FOCUS_BG': '포커스: 배경',
      'STABILITY_TAG': '안정성 상태: 정상',
      'ROTATION_TAG': '회전 코드: 활성화됨',

      // Design System Page
      'DS_TITLE': '옵시디언 플럭스 사양',
      'DS_SUBTITLE': '초고대비 다크 모드 및 프리미엄 홀로그램 오버레이를 위해 제작된 Neuralis 인터페이스의 디자인 시스템 토큰 사양입니다.',
      'COLOR_PALETTE': '색상 팔레트 및 토큰',
      'TYPO_TOKENS': '타이포그래피 토큰',
      'SPACING_SCALE': '간격 및 레이아웃 토큰',

      // Neural Console Page
      'CONSOLE_TITLE': '뉴럴 제어 콘솔',
      'SYS_ALLOCATOR': '시스템 자원 할당기',
      'CPU_ALLOC': '프로세싱 전력 (CPU)',
      'MEM_ALLOC': '메모리 깊이 (RAM)',
      'NET_ALLOC': '네트워크 대역폭',
      'EFFICIENCY_DIAL': '동기화 효율성',
      'NODE_MAP': '노드 메쉬 맵',
      'TERMINAL_TITLE': '레트로 터미널 CLI',
      'NODE_DETAILS': '노드 상세 정보',
      'NODE_NAME': '노드 이름',
      'NODE_STATUS': '상태',
      'NODE_LATENCY': '지연 시간',
      'NODE_TEMP': '코어 온도',
      'CLI_PROMPT': '명령어 입력 (도움말이 필요하면 help 입력)...',
      'CLI_WELCOME': 'NEURALIS 명령 인터페이스 [버전 4.0.2]\n(c) 2026 Neuralis Corp. All rights reserved.\n\n사용 가능한 진단 명령어를 보려면 "help"를 입력하세요.\n--------------------------------------------------',
      'CMD_NOT_FOUND': '명령어를 찾을 수 없음: ',
      'CMD_HELP': '사용 가능한 명령어:\n  help      - 진단 명령어 목록 표시\n  status    - 현재 시스템 자원 할당량 보기\n  optimize  - 뉴럴 링크 최적화 시퀀스 시작\n  clear     - 터미널 로그 지우기\n  node [id] - 특정 노드의 세부 정보 쿼리 (예: node 1)',
      'CMD_OPTIMIZE_START': '최적화 시퀀스를 시작하는 중...\n버퍼 영역 할당 중...\n노드 간섭 제거 중...',
      'CMD_OPTIMIZE_DONE': '최적화 완료. 처리 효율성이 100%로 동기화되었습니다. 모든 경로 상태 정상.',

      // Global Wallet Modal
      'MODAL_CONNECT_TITLE': '뉴럴 링크 연결',
      'MODAL_CONNECT_DESC': '지갑 잔액을 동기화하고 안전한 분산형 소켓 노드를 설정하려면 게이트웨이 검증기 인터페이스를 선택하세요.',

      // Integrated Diagnostic Simulator
      'SIM_TITLE': '통합 진단 시뮬레이터',
      'SIM_RUN': '진단 시작',
      'SIM_RUN_AGAIN': '진단 재실행',
      'SIM_WELCOME': '진단 오프라인 상태입니다. 자동화된 경로 노드 무결성 검사를 실행하려면 위의 "진단 시작"을 클릭하세요.',

      // Dropdown Switch Subpages Labels
      'SUB_QUANTUM_COMPUTE': '양자 컴퓨팅',
      'SUB_NEURAL_MESH': '뉴럴 메쉬',
      'SUB_BIO_SYNC': '바이오 싱크',
      'SUB_SECURITY': '종단 간 보안',
      'SUB_API': '개발자 API',
      'SUB_PERFORMANCE': '하드웨어 사양',
      'SUB_NODES': '활성 노드',
      'SUB_VALIDATORS': '검증자',
      'SUB_TOKENOMICS': '토큰노믹스',
      'SUB_GOVERNANCE': '거버넌스',
      'SUB_INTEGRATIONS': '통합 모듈',
      'SUB_3D_EXPERIENCE': '3D 스테이지',
      'SUB_SPHERE': '크리스탈 구체',
      'SUB_DESIGN_SYSTEM': '디자인 시스템',
      'SUB_LANDING_A': '정적 랜딩 (A)',
      'SUB_LANDING_B': '인터랙티브 랜딩 (B)',
      'SUB_GETTING_STARTED': '시작하기',
      'SUB_ARCHITECTURE': '아키텍처',
      'SUB_CLI': 'CLI 참조',
      'SUB_API_REF': 'API 참조',
      'SUB_TUTORIALS': '자습서',
      'SUB_FAQ': 'FAQ 및 문제 해결',
      'SUB_TERMS': '서비스 약관',
      'SUB_PRIVACY': '개인정보 처리방침',
      'SUB_SECURITY_POLICY': '보안 취약점 정책',
      'SUB_COMPLIANCE': '규정 준수',
      'SUB_SLA': 'SLA 보장',

      // FAQ Accordion
      'FAQ_SECTION_TITLE': '일반 문제 해결 및 설정 FAQ',
      'FAQ_Q_0': '로컬 검증 노드를 실행하려면 어떻게 해야 하나요?',
      'FAQ_A_0': 'NPM에서 Neuralis CLI를 다운로드하고, "neuralis login"을 실행하여 지갑을 연결한 다음, "neuralis node --start"를 호출하여 활성 검증기를 등록합니다.',
      'FAQ_Q_1': '토큰 스테이킹 락업 기간은 어떻게 되나요?',
      'FAQ_A_1': '표준 스테이킹은 토큰을 14일 동안 잠그고 8.4% APY를 제공합니다. 장기 풀은 최대 180일 동안 잠글 수 있으며 최대 14.2% APY의 수익률을 제공합니다.',
      'FAQ_Q_2': '뉴럴 메쉬에서 가스 수수료는 어떻게 계산되나요?',
      'FAQ_A_2': '가스 수수료는 처리 대기열 길이와 노드 지연 시간에 따라 동적으로 계산됩니다. 일반적인 실행 비용은 $NEURAL로 환산하여 $0.001 미만입니다.',
      'FAQ_Q_3': '햅틱 인지 동기화는 소비자용 하드웨어에 안전한가요?',
      'FAQ_A_3': '예, 바이오 싱크 프로토콜은 국제 하드웨어 안전 표준에 의해 승인된 표준 비침습적 햅틱 주파수를 사용합니다.',
      'FAQ_Q_4': '내 검증 노드가 오프라인이 되면 어떻게 되나요?',
      'FAQ_A_4': '일시적인 중단은 보상이 일시적으로 중단됩니다. 장기 중단(24시간 이상)은 메쉬 무결성을 보호하기 위해 약간의 스테이킹 삭감(슬래싱)을 유발할 수 있습니다.',

      // --- PLATFORM CATEGORY PAGES TRANSLATIONS ---
      'TITLE_PLATFORM_QUANTUM_COMPUTE': '양자 컴퓨팅 코어',
      'DESC_PLATFORM_QUANTUM_COMPUTE_P1': '절대 영도에서 비선형 알고리즘을 실행하는 초전도 큐비트 아키텍처. 다차원 텐서 배열의 페타바이트를 즉시 처리하여 즉각적인 인지 결정을 지원합니다.',
      'DESC_PLATFORM_QUANTUM_COMPUTE_P2': '자동 큐비트 오류 수정 및 햅틱 노드 원격 측정 시스템이 장착되어 있어 기존 실리콘 칩의 한계를 완벽히 극복합니다.',
      'STAT_LABEL_PLATFORM_QUANTUM_COMPUTE_1': '큐비트 수', 'STAT_VAL_PLATFORM_QUANTUM_COMPUTE_1': '5,000 Qubits',
      'STAT_LABEL_PLATFORM_QUANTUM_COMPUTE_2': '오류율', 'STAT_VAL_PLATFORM_QUANTUM_COMPUTE_2': '0.0001%',
      'STAT_LABEL_PLATFORM_QUANTUM_COMPUTE_3': '처리 속도 향상', 'STAT_VAL_PLATFORM_QUANTUM_COMPUTE_3': '15,000배',

      'TITLE_PLATFORM_NEURAL_MESH': '분산형 뉴럴 메쉬 네트워크',
      'DESC_PLATFORM_NEURAL_MESH_P1': '글로벌 컴퓨팅 검증 노드를 연결하는 자가 치유형 분산 네트워크 아키텍처. 동적 패킷 라우팅 알고리즘을 사용하여 대량 트래픽 조건에서도 100% 가동 시간을 유지합니다.',
      'DESC_PLATFORM_NEURAL_MESH_P2': '데이터 전송 경로는 안전하게 종단 간 암호화되며, 노드 간의 상태 수정 사항을 즉시 동기화하는 직접적인 서버리스 파이프라인을 제공합니다.',
      'STAT_LABEL_PLATFORM_NEURAL_MESH_1': '활성 메쉬 노드', 'STAT_VAL_PLATFORM_NEURAL_MESH_1': '120만 노드',
      'STAT_LABEL_PLATFORM_NEURAL_MESH_2': '장애 복구 지연', 'STAT_VAL_PLATFORM_NEURAL_MESH_2': '< 1ms',
      'STAT_LABEL_PLATFORM_NEURAL_MESH_3': '네트워크 대역폭', 'STAT_VAL_PLATFORM_NEURAL_MESH_3': '10 Tbps',

      'TITLE_PLATFORM_BIO_SYNC': '햅틱 인지 동기화',
      'DESC_PLATFORM_BIO_SYNC_P1': '직접적인 인간-컴퓨터 인지 동기화 루프. 하위 감각 수준의 신경 자극을 통해 인간의 의도와 기계적 실행을 동기화하여 완벽한 몰입형 컴퓨팅 링크를 구축합니다.',
      'DESC_PLATFORM_BIO_SYNC_P2': '고급 햅틱 피드백을 통해 실시간으로 물리적 미세 동작을 디지털 매개변수에 매핑함으로써 사용자 인터페이스 마찰을 제로에 가깝게 줄입니다.',
      'STAT_LABEL_PLATFORM_BIO_SYNC_1': '동기화 깊이', 'STAT_VAL_PLATFORM_BIO_SYNC_1': '99.8%',
      'STAT_LABEL_PLATFORM_BIO_SYNC_2': '연결 지연 시간', 'STAT_VAL_PLATFORM_BIO_SYNC_2': '2ms',
      'STAT_LABEL_PLATFORM_BIO_SYNC_3': '활성 사용자', 'STAT_VAL_PLATFORM_BIO_SYNC_3': '24,500명',

      'TITLE_PLATFORM_SECURITY': '종단 간 암호화 보안',
      'DESC_PLATFORM_SECURITY_P1': '격자 기반(lattice-based) 수학 알고리즘으로 보호되는 종단 간 암호화 실드. 미래의 고급 양자 컴퓨팅 해킹 모델에 대해서도 완벽한 보안 성능을 보장합니다.',
      'DESC_PLATFORM_SECURITY_P2': '영지식 증명(ZKP) 기술을 활용하여 민감한 사용자 메타데이터를 노출하지 않고 트랜잭션 및 네트워크 신원을 보호합니다.',
      'STAT_LABEL_PLATFORM_SECURITY_1': '암호화 규격', 'STAT_VAL_PLATFORM_SECURITY_1': 'Lattice 512',
      'STAT_LABEL_PLATFORM_SECURITY_2': '무차별 대입 시간', 'STAT_VAL_PLATFORM_SECURITY_2': '15억 년',
      'STAT_LABEL_PLATFORM_SECURITY_3': '보안 등급 평가', 'STAT_VAL_PLATFORM_SECURITY_3': 'A+ 최고 보안',

      'TITLE_PLATFORM_API': '개발자 API 게이트웨이',
      'DESC_PLATFORM_API_P1': '지연 시간이 극히 적은 REST, gRPC 및 WebSockets 연결 프레임워크. 글로벌 엔드포인트를 호출하여 단 몇 초 만에 신경 데이터를 스트리밍하거나 가상 에이전트를 가동할 수 있습니다.',
      'DESC_PLATFORM_API_P2': '안전하고 포괄적인 샌드박스 테스트 환경, 풍부한 기능의 SDK 패키지, 자동화 소프트웨어 구축을 위한 웹훅 트리거 기능을 지원합니다.',
      'STAT_LABEL_PLATFORM_API_1': '응답 지연 시간', 'STAT_VAL_PLATFORM_API_1': '4ms',
      'STAT_LABEL_PLATFORM_API_2': '가동 시간 보장', 'STAT_VAL_PLATFORM_API_2': '99.999%',
      'STAT_LABEL_PLATFORM_API_3': '일일 호출량', 'STAT_VAL_PLATFORM_API_3': '25억 회 이상',

      'TITLE_PLATFORM_PERFORMANCE': '베어메탈 하드웨어 성능',
      'DESC_PLATFORM_PERFORMANCE_P1': '신경망 계산을 위해 최적화된 전용 ASIC 가속 처리 어레이. 최고 수준의 하드웨어 처리량과 제로 복사 버퍼링을 위한 메모리 매핑 연산을 실행합니다.',
      'DESC_PLATFORM_PERFORMANCE_P2': '가상화 레이어를 거치지 않는 직접적인 하드웨어 실행 경로를 지원하여 연산 지연을 줄이고 코어 발열 제어 능력을 극대화했습니다.',
      'STAT_LABEL_PLATFORM_PERFORMANCE_1': '최대 IOPS', 'STAT_VAL_PLATFORM_PERFORMANCE_1': '450만 IOPS',
      'STAT_LABEL_PLATFORM_PERFORMANCE_2': '코어 온도', 'STAT_VAL_PLATFORM_PERFORMANCE_2': '38°C',
      'STAT_LABEL_PLATFORM_PERFORMANCE_3': '연산 처리 전력', 'STAT_VAL_PLATFORM_PERFORMANCE_3': '850 TFLOPS',

      // --- ECOSYSTEM CATEGORY PAGES TRANSLATIONS ---
      'TITLE_ECOSYSTEM_NODES': '활성 노드 분포 인프라',
      'DESC_ECOSYSTEM_NODES_P1': '네트워크 연산 및 메모리 자원을 제공하는 전 세계 검증 노드 분포 지도. 지리적 서버 분산 상태에 맞춰 트래픽을 자동으로 최적 라우팅하고 분산합니다.',
      'DESC_ECOSYSTEM_NODES_P2': '개인 컴퓨터로도 로컬 검증 노드를 손쉽게 활성화하여 탈중앙화 보상을 획득함과 동시에 네트워크 보안에 기여할 수 있습니다.',
      'STAT_LABEL_ECOSYSTEM_NODES_1': '글로벌 노드 수', 'STAT_VAL_ECOSYSTEM_NODES_1': '150,000 노드',
      'STAT_LABEL_ECOSYSTEM_NODES_2': '예상 수익률', 'STAT_VAL_ECOSYSTEM_NODES_2': '8.4% APY',
      'STAT_LABEL_ECOSYSTEM_NODES_3': '스테이킹 수량', 'STAT_VAL_ECOSYSTEM_NODES_3': '4억 5천만 NEURAL',
      'NODES_EDU_P2P_TITLE': 'P2P 메시 네트워크 및 전파',
      'NODES_EDU_P2P_DESC': '탈중앙화 네트워크는 블록과 트랜잭션을 전파하기 위해 피어 투 피어(P2P) 가십 프로토콜에 의존합니다. 노드가 새로운 데이터를 발견하면 즉각적인 피어에게 브로드캐스트합니다. 이 파급 효과는 밀리초 단위로 전 세계에 전파되며, 이를 네트워크 전파 지연이라고 합니다.',
      'NODES_EDU_VAL_TITLE': '검증자의 역할 및 지연 시간',
      'NODES_EDU_VAL_DESC': '검증자는 합의 엔진을 실행하는 전용 노드 인스턴스입니다. 트랜잭션을 수집하고, 블록으로 패키징하고, 암호화 서명을 확인하고, 유효성에 투표합니다. 노드 지연 시간을 최소화하면 포크를 방지하고 안정적인 고처리량 합의를 보장합니다.',

      'TITLE_ECOSYSTEM_VALIDATORS': '분산형 검증자 합의',
      'DESC_ECOSYSTEM_VALIDATORS_P1': '비잔틴 결함 허용(BFT) 아키텍처에 기반한 지분 증명(PoS) 합의 모델. 네트워크 데이터 무결성을 검증하고 트랜잭션을 실시간으로 안전하게 처리합니다.',
      'DESC_ECOSYSTEM_VALIDATORS_P2': '검증자들은 지속적으로 블록을 활발히 검사하고 상태 업데이트를 검증하여 중앙 서버 없이도 신뢰 가능한 시스템 아키텍처를 유지합니다.',
      'STAT_LABEL_ECOSYSTEM_VALIDATORS_1': '활성 검증자 수', 'STAT_VAL_ECOSYSTEM_VALIDATORS_1': '4,800 노드',
      'STAT_LABEL_ECOSYSTEM_VALIDATORS_2': '합의 달성 시간', 'STAT_VAL_ECOSYSTEM_VALIDATORS_2': '1.2초',
      'STAT_LABEL_ECOSYSTEM_VALIDATORS_3': '슬래싱 제재 횟수', 'STAT_VAL_ECOSYSTEM_VALIDATORS_3': '0회 제재',

      'TITLE_ECOSYSTEM_TOKENOMICS': '토큰 유틸리티 및 분배 구조',
      'DESC_ECOSYSTEM_TOKENOMICS_P1': '$NEURAL 토큰은 시스템 리소스 할당, 트랜잭션 가스 수수료 지불, 그리고 네트워크 검증 실드 유지관리에 사용되며 연산 기여자에게 보상으로 지급됩니다.',
      'DESC_ECOSYSTEM_TOKENOMICS_P2': '장기적 성장과 토큰 안정성 유지를 위해 지속적인 디플레이션 제어 아키텍처 및 수익율 분배 알고리즘을 결합하여 설계되었습니다.',
      'STAT_LABEL_ECOSYSTEM_TOKENOMICS_1': '총 발행량', 'STAT_VAL_ECOSYSTEM_TOKENOMICS_1': '10억 NEURAL',
      'STAT_LABEL_ECOSYSTEM_TOKENOMICS_2': '유통 비율', 'STAT_VAL_ECOSYSTEM_TOKENOMICS_2': '65%',
      'STAT_LABEL_ECOSYSTEM_TOKENOMICS_3': '소각된 토큰 수', 'STAT_VAL_ECOSYSTEM_TOKENOMICS_3': '1,240만 NEURAL',

      'TITLE_ECOSYSTEM_GOVERNANCE': '탈중앙화 거버넌스 (DAO)',
      'DESC_ECOSYSTEM_GOVERNANCE_P1': '네트워크 이용자와 검증자들로 구성된 의사결정 모델. 누구나 프로토콜 개선 아이디어 및 자원 할당 제안을 등록하고 투표권을 행사할 수 있습니다.',
      'DESC_ECOSYSTEM_GOVERNANCE_P2': '투표 영향력은 스테이킹한 토큰 보유량에 비례하여 결정되므로, 참여자들이 항상 네트워크의 가치 성장에 기여하도록 유도합니다.',
      'STAT_LABEL_ECOSYSTEM_GOVERNANCE_1': '활성 제안서 수', 'STAT_VAL_ECOSYSTEM_GOVERNANCE_1': '84개 제안',
      'STAT_LABEL_ECOSYSTEM_GOVERNANCE_2': '투표 참여 비율', 'STAT_VAL_ECOSYSTEM_GOVERNANCE_2': '72%',
      'STAT_LABEL_ECOSYSTEM_GOVERNANCE_3': '커뮤니티 예산고', 'STAT_VAL_ECOSYSTEM_GOVERNANCE_3': '4,520만 달러',

      'TITLE_ECOSYSTEM_INTEGRATIONS': '제3자 및 외부 연동',
      'DESC_ECOSYSTEM_INTEGRATIONS_P1': 'Neuralis 컴퓨팅 노드를 외부 메인넷 체인, 프라이빗 데이터베이스 및 기업용 솔루션과 추가 구성 부담 없이 손쉽게 연결하는 플러그 앤 플레이 통합 모듈.',
      'DESC_ECOSYSTEM_INTEGRATIONS_P2': '개발자가 외부 트리거 데이터를 신경 실행 레이어에 바로 매핑할 수 있도록 유연한 구조의 미들웨어 환경을 완벽하게 제공합니다.',
      'STAT_LABEL_ECOSYSTEM_INTEGRATIONS_1': '연결된 메인넷', 'STAT_VAL_ECOSYSTEM_INTEGRATIONS_1': '12개 체인',
      'STAT_LABEL_ECOSYSTEM_INTEGRATIONS_2': '미들웨어 개수', 'STAT_VAL_ECOSYSTEM_INTEGRATIONS_2': '250개 이상',
      'STAT_LABEL_ECOSYSTEM_INTEGRATIONS_3': '연동 설정 시간', 'STAT_VAL_ECOSYSTEM_INTEGRATIONS_3': '< 5분',

      // --- SHOWCASE CATEGORY PAGES TRANSLATIONS ---
      'TITLE_SHOWCASE_3D_EXPERIENCE': '인터랙티브 3D 스테이지',
      'DESC_SHOWCASE_3D_EXPERIENCE_P1': '브라우저 3D 렌더링 엔진의 한계에 도전하여 초현대적이고 감각적인 UX를 제공하는 몰입형 WebGPU 및 WebGL 기반 시각 그래픽 노드 쇼케이스.',
      'DESC_SHOWCASE_3D_EXPERIENCE_P2': '사용자의 마우스 시선 추적, 스크롤 인터랙션 및 화면 크기 변화에 지연 시간 없이 반응하는 백터 흐름 필드를 확인해 보세요.',
      'STAT_LABEL_SHOWCASE_3D_EXPERIENCE_1': '초당 프레임수', 'STAT_VAL_SHOWCASE_3D_EXPERIENCE_1': '120 FPS',
      'STAT_LABEL_SHOWCASE_3D_EXPERIENCE_2': '그리기 호출', 'STAT_VAL_SHOWCASE_3D_EXPERIENCE_2': '120회 호출',
      'STAT_LABEL_SHOWCASE_3D_EXPERIENCE_3': 'GPU 부하 수준', 'STAT_VAL_SHOWCASE_3D_EXPERIENCE_3': '18% 수준',

      // --- DOCS CATEGORY PAGES TRANSLATIONS ---
      'TITLE_DOCS_GETTING_STARTED': '설치 및 초기 시작 가이드',
      'DESC_DOCS_GETTING_STARTED_P1': '공식 CLI 도구를 안전하게 로컬 환경에 다운로드하고, 노드 구성 템플릿을 설정하며, 첫 번째 네트워크 통합 노드 채널을 실행하는 방법을 배웁니다.',
      'DESC_DOCS_GETTING_STARTED_P2': '단계별 명령어 안내가 포함된 당사의 빠른 안내서를 통해 5분 안에 최적화된 로컬 샌드박스를 구축할 수 있습니다.',
      'STAT_LABEL_DOCS_GETTING_STARTED_1': '설정 단계', 'STAT_VAL_DOCS_GETTING_STARTED_1': '3단계 구성',
      'STAT_LABEL_DOCS_GETTING_STARTED_2': '설치 소요시간', 'STAT_VAL_DOCS_GETTING_STARTED_2': '2분 소요',
      'STAT_LABEL_DOCS_GETTING_STARTED_3': '가이드 업데이트', 'STAT_VAL_DOCS_GETTING_STARTED_3': '24/7 온라인',

      'TITLE_DOCS_ARCHITECTURE': '아키텍처 Deep Dive',
      'DESC_DOCS_ARCHITECTURE_P1': '하드웨어 베어메탈 계층부터 최상위 라우팅 애플리케이션 프레임워크에 이르기까지, Neuralis 코어 네트워크의 내부 데이터 처리 파이프라인 구조.',
      'DESC_DOCS_ARCHITECTURE_P2': '안정성을 유지하면서 대규모 입출력을 실현하는 비동기식 메모리 대기열 및 복사 없는(zero-copy) 통신 버퍼링의 원리 분석.',
      'STAT_LABEL_DOCS_ARCHITECTURE_1': '시스템 아키텍처', 'STAT_VAL_DOCS_ARCHITECTURE_1': '4개 레이어',
      'STAT_LABEL_DOCS_ARCHITECTURE_2': '통신 버퍼링', 'STAT_VAL_DOCS_ARCHITECTURE_2': '64 MB',
      'STAT_LABEL_DOCS_ARCHITECTURE_3': '내부 게이트 지연', 'STAT_VAL_DOCS_ARCHITECTURE_3': '< 100ns',

      'TITLE_DOCS_CLI_REFERENCE': 'CLI 명령어 사양 참조',
      'DESC_DOCS_CLI_REFERENCE_P1': '터미널 유틸리티 명령어 구문 및 전체 가이드. CLI 환경을 활용해 실시간으로 노드를 튜닝하고 통신 경로를 최적화하는 핵심 스크립트 모음.',
      'DESC_DOCS_CLI_REFERENCE_P2': '자동 자원 재정리 스케줄링 설정 기능, 검증자 상태 덤프 및 트러블 슈팅을 위한 에러 진단 인수들을 포함하고 있습니다.',
      'STAT_LABEL_DOCS_CLI_REFERENCE_1': '지원 명령어', 'STAT_VAL_DOCS_CLI_REFERENCE_1': '45개 스크립트',
      'STAT_LABEL_DOCS_CLI_REFERENCE_2': '쉘 환경 지원', 'STAT_VAL_DOCS_CLI_REFERENCE_2': 'Bash / PowerShell',
      'STAT_LABEL_DOCS_CLI_REFERENCE_3': '동기화 빈도', 'STAT_VAL_DOCS_CLI_REFERENCE_3': '매주 업데이트',

      'TITLE_DOCS_API_REFERENCE': 'REST & WebSockets API 문서',
      'DESC_DOCS_API_REFERENCE_P1': 'Neuralis 시스템 통신 인터페이스 개발 지침서. 풍부한 성능의 JSON-RPC 통신 규격 구조 및 실시간 이벤트 스트리밍 구독 연결 안내.',
      'DESC_DOCS_API_REFERENCE_P2': '원격 보안 제어 실행, 통신 채널 파라미터 미터링 모니터링 등 다채로운 고성능 연산 기능 제어 가이드.',
      'STAT_LABEL_DOCS_API_REFERENCE_1': 'API 엔드포인트', 'STAT_VAL_DOCS_API_REFERENCE_1': '64개 엔드포인트',
      'STAT_LABEL_DOCS_API_REFERENCE_2': '최대 동시 연결', 'STAT_VAL_DOCS_API_REFERENCE_2': '1,000만 연결',
      'STAT_LABEL_DOCS_API_REFERENCE_3': '서명 인증 방식', 'STAT_VAL_DOCS_API_REFERENCE_3': 'ECDSA 암호키',

      'TITLE_DOCS_TUTORIALS': '에이전트 앱 구축 가이드',
      'DESC_DOCS_TUTORIALS_P1': '간단한 스크립트로 작동하는 커스텀 인공지능 자율 검증기 에이전트를 조립하고, 시스템 네트워크에 동기화해 실제 클라이언트 요청을 받는 과정 실습.',
      'DESC_DOCS_TUTORIALS_P2': '로컬 개발 샌드박스 환경 설정, 패키지 구성 요소 의존성 연동, 지갑 트랜잭션 수동 서명 및 릴리스 검증 과정 상세 가이드.',
      'STAT_LABEL_DOCS_TUTORIALS_1': '난이도', 'STAT_VAL_DOCS_TUTORIALS_1': '초급 가이드',
      'STAT_LABEL_DOCS_TUTORIALS_2': '실습 코스 수', 'STAT_VAL_DOCS_TUTORIALS_2': '12개 자습서',
      'STAT_LABEL_DOCS_TUTORIALS_3': '수료 개발자 수', 'STAT_VAL_DOCS_TUTORIALS_3': '45,000명 이상',

      'TITLE_DOCS_FAQ': '자주 묻는 질문(FAQ) 및 문제해결',
      'DESC_DOCS_FAQ_P1': '노드 네트워크 접속 장애, 검증 보상 수령 문제, Staking 가속 락업 규칙, 그리고 지갑 연동 에러 상황에 대응하는 간편 솔루션 모음.',
      'DESC_DOCS_FAQ_P2': '신호 단절, 메모리 동기화 실패 등 구체적인 시스템 동작 에러 발생 시 아래의 아코디언 메뉴를 통해 해결책을 즉시 진단해 보세요.',
      'STAT_LABEL_DOCS_FAQ_1': '자체 해결율', 'STAT_VAL_DOCS_FAQ_1': '94%',
      'STAT_LABEL_DOCS_FAQ_2': '미결 티켓 수', 'STAT_VAL_DOCS_FAQ_2': '0개 미결',
      'STAT_LABEL_DOCS_FAQ_3': '평균 답변 대기', 'STAT_VAL_DOCS_FAQ_3': '< 10분 소요',

      // --- LEGAL CATEGORY PAGES TRANSLATIONS ---
      'TITLE_LEGAL_TERMS': '서비스 이용 약관',
      'DESC_LEGAL_TERMS_P1': 'Neuralis 네트워크 자원 사용 권한과 이용에 따른 상호 면책 사항을 규정합니다. 지갑 주소 연결 시 이용자는 합의 노드 규정에 자동으로 동의한 것으로 간주됩니다.',
      'DESC_LEGAL_TERMS_P2': '가스 수수료 차감 정책, 합의 프로토콜 참여 규칙, 분산 처리 한도 및 분쟁 발생 시의 중재 절차 규정.',
      'STAT_LABEL_LEGAL_TERMS_1': '최신 버전', 'STAT_VAL_LEGAL_TERMS_1': 'v4.2 규격',
      'STAT_LABEL_LEGAL_TERMS_2': '효력 발생일', 'STAT_VAL_LEGAL_TERMS_2': '2026년 6월',
      'STAT_LABEL_LEGAL_TERMS_3': '약관 조항 수', 'STAT_VAL_LEGAL_TERMS_3': '28개 조항',

      'TITLE_LEGAL_PRIVACY': '개인정보 보호 및 수집 정책',
      'DESC_LEGAL_PRIVACY_P1': '시스템에서 처리하는 지갑 주소 및 노드 메타데이터 분석 정책. Neuralis는 어떠한 경우에도 지갑 프라이빗 키, 이용자의 실명 또는 IP 실물 위치를 기록하지 않습니다.',
      'DESC_LEGAL_PRIVACY_P2': '브라우저 로컬 저장소는 오직 사용자의 인터페이스 설정 정보(예: 지정 언어, 화면 스타일 테마, 지갑 연동 기록)를 임시 캐시하는 목적으로만 사용됩니다.',
      'STAT_LABEL_LEGAL_PRIVACY_1': '쿠키 수집', 'STAT_VAL_LEGAL_PRIVACY_1': '0개 쿠키',
      'STAT_LABEL_LEGAL_PRIVACY_2': '사용자 추적', 'STAT_VAL_LEGAL_PRIVACY_2': '추적 안 함',
      'STAT_LABEL_LEGAL_PRIVACY_3': '브라우저 보안', 'STAT_VAL_LEGAL_PRIVACY_3': 'AES-GCM 캐싱',

      'TITLE_LEGAL_SECURITY_POLICY': '취약점 제보 및 보상 정책',
      'DESC_LEGAL_SECURITY_POLICY_P1': '화이트햇 보안 전문가 및 연구원들의 취약점 분석 가이드. 악의적인 디도스(DDoS) 공격이나 가상 자산 탈취 시도를 차단하기 위한 취약점 발견 및 신고 안내.',
      'DESC_LEGAL_SECURITY_POLICY_P2': '중대 시스템 오류 제보 시 최대 25만 달러 규모의 버그 바운티 보상을 지급하며, 분석 접수 확인을 신속하게 완료합니다.',
      'STAT_LABEL_LEGAL_SECURITY_POLICY_1': '최대 포상금', 'STAT_VAL_LEGAL_SECURITY_POLICY_1': '250,000 USD',
      'STAT_LABEL_LEGAL_SECURITY_POLICY_2': '최초 응답 시간', 'STAT_VAL_LEGAL_SECURITY_POLICY_2': '< 12시간 이내',
      'STAT_LABEL_LEGAL_SECURITY_POLICY_3': '현재 해결된 버그', 'STAT_VAL_LEGAL_SECURITY_POLICY_3': '0개 활성 오류',

      'TITLE_LEGAL_COMPLIANCE': '규정 준수 및 외부 감사',
      'DESC_LEGAL_COMPLIANCE_P1': '당사 시스템 노드가 준수하는 금융 및 암호화 산업 보안 표준 규격 안내. 글로벌 규제 프레임워크와의 완벽한 정렬을 위한 상시 감시 기능 통합.',
      'DESC_LEGAL_COMPLIANCE_P2': '기관용 고성능 노드 운용 Validator에 대한 검증 AML/KYC 프로세스를 구현해 자금 세탁 및 부적절한 노드 참여를 기술적으로 예방합니다.',
      'STAT_LABEL_LEGAL_COMPLIANCE_1': '규정 준수율', 'STAT_VAL_LEGAL_COMPLIANCE_1': '100% 만족',
      'STAT_LABEL_LEGAL_COMPLIANCE_2': '감사 협력사', 'STAT_VAL_LEGAL_COMPLIANCE_2': 'ConsenSys Dil.',
      'STAT_LABEL_LEGAL_COMPLIANCE_3': '누적 외부 감사', 'STAT_VAL_LEGAL_COMPLIANCE_3': '4 / 4 감사 통과',

      'TITLE_LEGAL_SLA': '서비스 수준 계약(SLA) 보장',
      'DESC_LEGAL_SLA_P1': '탈중앙화 RPC 통신 및 게이트웨이 엔드포인트에 대한 99.99% 가동 시간(Uptime) 보장. 예기치 못한 오프라인 가동 중단 발생 시 보상 정책 규정.',
      'DESC_LEGAL_SLA_P2': '자동 실시간 무정전 백업 노드 활성화 채널 및 로드 밸런서를 통해 서비스 중단 위험을 원천적으로 차단합니다.',
      'STAT_LABEL_LEGAL_SLA_1': '보장 Uptime', 'STAT_VAL_LEGAL_SLA_1': '99.99% SLA',
      'STAT_LABEL_LEGAL_SLA_2': '보장 적용 범위', 'STAT_VAL_LEGAL_SLA_2': '100% 코어 보장',
      'STAT_LABEL_LEGAL_SLA_3': '지연 임계치', 'STAT_VAL_LEGAL_SLA_3': '< 20ms 이내',
      'SUB_DASHBOARD': '대시보드',
      'DASHBOARD_TITLE': '뉴럴 액세스 대시보드',
      'DASHBOARD_LOCKED': '보안 워크스페이스 액세스 잠김',
      'DASHBOARD_LOCKED_DESC': '검증자 위임 데이터베이스에 액세스하고 보안 인증 터널을 초기화하려면 암호화 Web3 지갑을 연결해야 합니다.'
    }
  };

  // Resolve translation helper
  t(key: string): string {
    const lang = this.currentLang();
    return this.dictionary[lang]?.[key] || key;
  }

  // Set selected language and persist to localStorage
  setLanguage(lang: LanguageType) {
    this.currentLang.set(lang);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('heji_lang', lang);
    }
  }

  private getSavedLanguage(): LanguageType {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('heji_lang') as LanguageType;
      if (saved === 'en' || saved === 'vi' || saved === 'ko') {
        return saved;
      }
    }
    return 'en'; // default language
  }
}
