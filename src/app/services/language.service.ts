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

      // Navbar B
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
      'CMD_OPTIMIZE_DONE': 'Optimization completed. Processing efficiency synchronized at 100%. All pathways NOMINAL.'
    },
    vi: {
      // General Navigation & Switcher
      'SWITCHER_LABEL': 'Chuyển Đổi Trang:',
      'NAV_LANDING_B': 'Giao Diện Tương Tác (B)',
      'NAV_LANDING_A': 'Giao Diện Tĩnh (A)',
      'NAV_SPHERE': 'Mô Hình Pha Lê 3D',
      'NAV_SYSTEM': 'Thông Số Obsidian Flux',
      'NAV_CONSOLE': 'Bảng Điều Khiển Console',

      // Navbar B
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
      'CMD_OPTIMIZE_DONE': 'Tối ưu hóa hoàn tất. Hiệu suất xử lý đã đồng bộ ở mức 100%. Tất cả các trạm ĐẠT CHUẨN.'
    },
    ko: {
      // General Navigation & Switcher
      'SWITCHER_LABEL': '화면 전환기:',
      'NAV_LANDING_B': '인터랙티브 랜딩 (B)',
      'NAV_LANDING_A': '정적 랜딩 (A)',
      'NAV_SPHERE': '3D 크리스탈 스테이지',
      'NAV_SYSTEM': '옵시디언 플럭스 사양',
      'NAV_CONSOLE': '뉴럴 콘솔',

      // Navbar B
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
      'FEAT_1_DESC': '비선형 알고리즘 구조를 활용하여 거의 제로에 가까운 열 서명과 무한한 확장성으로 페타바이트급 데이터를 처리합니다.',
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
      'CMD_OPTIMIZE_DONE': '최적화 완료. 처리 효율성이 100%로 동기화되었습니다. 모든 경로 상태 정상.'
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
