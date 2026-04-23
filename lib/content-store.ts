import { promises as fs } from "fs";
import path from "path";

import type {
  ActivityRecord,
  AdminRecord,
  BirdRecord,
  ContactMessageRecord,
  GalleryItemRecord,
  HomepageSectionKey,
  HomepageSectionMap,
  HomepageSectionRecord,
  MediaLibraryItem,
  PortfolioItemRecord,
  PostRecord,
  RegistrationRecord,
  ServiceRecord,
  SiteSettingsRecord,
  SubscriberRecord,
} from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "data");

async function readJsonFile<T>(fileName: string) {
  const filePath = path.join(DATA_DIR, fileName);
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content) as T;
}

async function writeJsonFile<T>(fileName: string, data: T) {
  const filePath = path.join(DATA_DIR, fileName);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

export async function getAdmins() {
  return readJsonFile<AdminRecord[]>("admins.json");
}

export async function saveAdmins(admins: AdminRecord[]) {
  return writeJsonFile("admins.json", admins);
}

export async function getPosts() {
  const posts = await readJsonFile<PostRecord[]>("posts.json");
  return posts.sort((left, right) =>
    left.createdAt < right.createdAt ? 1 : -1,
  );
}

export async function savePosts(posts: PostRecord[]) {
  return writeJsonFile("posts.json", posts);
}

export async function getActivities() {
  const activities = await readJsonFile<ActivityRecord[]>("activities.json");
  return activities.sort((left, right) => (left.date > right.date ? -1 : 1));
}

export async function saveActivities(activities: ActivityRecord[]) {
  return writeJsonFile("activities.json", activities);
}

export async function getBirds() {
  const birds = await readJsonFile<BirdRecord[]>("birds.json");
  return birds.sort((left, right) => left.name.localeCompare(right.name, "zh-Hant"));
}

export async function saveBirds(birds: BirdRecord[]) {
  return writeJsonFile("birds.json", birds);
}

export async function getRegistrations() {
  const registrations = await readJsonFile<RegistrationRecord[]>("registrations.json");
  return registrations.sort((left, right) =>
    left.createdAt < right.createdAt ? 1 : -1,
  );
}

export async function saveRegistrations(registrations: RegistrationRecord[]) {
  return writeJsonFile("registrations.json", registrations);
}

export async function getServices() {
  const services = await readJsonFile<ServiceRecord[]>("services.json");
  return services.sort((left, right) => left.sortOrder - right.sortOrder);
}

export async function saveServices(services: ServiceRecord[]) {
  return writeJsonFile("services.json", services);
}

export async function getHomepageSections() {
  return readJsonFile<HomepageSectionRecord[]>("homepage-sections.json");
}

export async function saveHomepageSections(sections: HomepageSectionRecord[]) {
  return writeJsonFile("homepage-sections.json", sections);
}

export async function getHomepageSectionMap() {
  const sections = await getHomepageSections();
  const map = sections.reduce<Partial<HomepageSectionMap>>((accumulator, section) => {
    accumulator[section.sectionKey] = section;
    return accumulator;
  }, {});

  return map as HomepageSectionMap;
}

export async function updateHomepageSection(
  sectionKey: HomepageSectionKey,
  updater: (section: HomepageSectionRecord) => HomepageSectionRecord,
) {
  const sections = await getHomepageSections();
  const nextSections = sections.map((section) =>
    section.sectionKey === sectionKey ? updater(section) : section,
  );

  await saveHomepageSections(nextSections);
}

export async function getGalleryItems() {
  const items = await readJsonFile<GalleryItemRecord[]>("gallery-items.json");
  return items.sort((left, right) => left.sortOrder - right.sortOrder);
}

export async function saveGalleryItems(items: GalleryItemRecord[]) {
  return writeJsonFile("gallery-items.json", items);
}

export async function getPortfolioItems() {
  return readJsonFile<PortfolioItemRecord[]>("portfolio-items.json");
}

export async function savePortfolioItems(items: PortfolioItemRecord[]) {
  return writeJsonFile("portfolio-items.json", items);
}

export async function getSubscribers() {
  const subscribers = await readJsonFile<SubscriberRecord[]>("subscribers.json");
  return subscribers.sort((left, right) =>
    left.createdAt < right.createdAt ? 1 : -1,
  );
}

export async function saveSubscribers(subscribers: SubscriberRecord[]) {
  return writeJsonFile("subscribers.json", subscribers);
}

export async function getSiteSettings() {
  return readJsonFile<SiteSettingsRecord>("site-settings.json");
}

export async function saveSiteSettings(settings: SiteSettingsRecord) {
  return writeJsonFile("site-settings.json", settings);
}

export async function getMediaLibrary() {
  const items = await readJsonFile<MediaLibraryItem[]>("media-library.json");
  return items.sort((left, right) =>
    left.createdAt < right.createdAt ? 1 : -1,
  );
}

export async function saveMediaLibrary(items: MediaLibraryItem[]) {
  return writeJsonFile("media-library.json", items);
}

export async function getContactMessages() {
  return readJsonFile<ContactMessageRecord[]>("contact-messages.json");
}

export async function saveContactMessages(messages: ContactMessageRecord[]) {
  return writeJsonFile("contact-messages.json", messages);
}
