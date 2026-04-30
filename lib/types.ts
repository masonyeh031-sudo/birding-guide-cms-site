export type PostStatus = "draft" | "published";

export interface AdminRecord {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: string;
}

export interface PostRecord {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityRecord {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  meetingPoint: string;
  duration: string;
  price: string;
  description: string;
  schedule: string[];
  highlights: string[];
  notices: string[];
  image: string;
  images: string[];
  registerUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface BirdRecord {
  id: string;
  name: string;
  englishName: string;
  image: string;
  galleryImages: string[];
  description: string;
  detailedDescription: string;
  habitat: string[];
  category: string;
  observationPoint: string;
  sourceText: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type RegistrationStatus = "new" | "contacted" | "confirmed" | "cancelled";

export interface RegistrationRecord {
  id: string;
  activityId: string;
  activityTitle: string;
  name: string;
  email: string;
  phone: string;
  participants: number;
  ticketType: string;
  // 依 Google Form 加入的欄位
  lineId: string;
  paymentStatus: string; // 我已經匯款完了 / 我要現場繳費
  employmentStatus: string; // 學生 / 就業 / 退休
  // 舊欄位保留為選填（向下相容，且仍可供後台檢視）
  companionNames: string;
  experience: string;
  needs: string;
  source: string;
  status: RegistrationStatus;
  createdAt: string;
}

export interface ServiceRecord {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  features: string[];
  sortOrder: number;
}

export type HomepageSectionKey =
  | "hero"
  | "news"
  | "about"
  | "stats"
  | "flow"
  | "showcase"
  | "series"
  | "subscribe";

export interface NewsItem {
  id: string;
  date: string;
  time: string;
  location: string;
  title: string;
  summary: string;
  buttonLabel: string;
  href: string;
}

export interface StatItem {
  id: string;
  icon: string;
  title: string;
  content: string;
  value?: string;
}

export interface FlowItem {
  id: string;
  step: string;
  title: string;
  content: string;
  // 流程步驟的插圖；未填則不顯示圖片。
  image?: string;
}

export interface ShowcaseImage {
  id: string;
  title: string;
  image: string;
}

export interface SeriesItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface SubscribeFormData {
  title: string;
  subtitle: string;
  placeholder: string;
  buttonLabel: string;
  successMessage: string;
}

export interface HomepageSectionRecord {
  id: string;
  sectionKey: HomepageSectionKey;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  extraJson: Record<string, unknown>;
  // 是否顯示於前台；undefined/true 皆視為顯示
  visible?: boolean;
  updatedAt: string;
}

export interface GalleryItemRecord {
  id: string;
  image: string;
  caption: string;
  sortOrder: number;
}

export interface PortfolioItemRecord {
  id: string;
  title: string;
  image: string;
  images: string[];
  description: string;
  link: string;
}

export interface SubscriberRecord {
  id: string;
  email: string;
  createdAt: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface ManagedPageContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  actionLabel?: string;
  actionHref?: string;
}

export interface SiteSettingsRecord {
  id: string;
  siteName: string;
  logo: string;
  tagline: string;
  seoTitle: string;
  seoDescription: string;
  contactEmail: string;
  socialLinks: SocialLink[];
  footerText: string;
  footerBottomText: string;
  pageContent: {
    journal: ManagedPageContent;
    activities: ManagedPageContent;
    services: ManagedPageContent;
    portfolio: ManagedPageContent;
    contact: ManagedPageContent;
  };
}

export interface MediaLibraryItem {
  id: string;
  url: string;
  label: string;
  createdAt: string;
}

export interface ContactMessageRecord {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface HomepageSectionMap {
  hero: HomepageSectionRecord;
  news: HomepageSectionRecord;
  about: HomepageSectionRecord;
  stats: HomepageSectionRecord;
  flow: HomepageSectionRecord;
  showcase: HomepageSectionRecord;
  series: HomepageSectionRecord;
  subscribe: HomepageSectionRecord;
}
