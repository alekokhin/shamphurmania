export const SITE_NAME = 'შამფურმანია';
export const SITE_NAME_KA = 'შამფურმანია';
export const DEFAULT_CURRENCY = 'GEL';
export const PRODUCTS_PER_PAGE = 12;

export const AVAILABILITY_OPTIONS = [
  { value: 'IN_STOCK', label: 'მარაგშია' },
  { value: 'OUT_OF_STOCK', label: 'ამოწურულია' },
  { value: 'PREORDER', label: 'წინასწარი შეკვეთა' },
] as const;

export const AVAILABILITY_MAP: Record<string, string> = {
  IN_STOCK: 'მარაგშია',
  OUT_OF_STOCK: 'ამოწურულია',
  PREORDER: 'წინასწარი შეკვეთა',
};

export const FUEL_TYPE_OPTIONS = [
  { value: 'გაზი', label: 'გაზი' },
  { value: 'ნახშირი', label: 'ნახშირი' },
  { value: 'ელექტრო', label: 'ელექტრო' },
  { value: 'პელეტი', label: 'პელეტი' },
  { value: 'ჰიბრიდი', label: 'ჰიბრიდი' },
] as const;

export const SORT_OPTIONS = [
  { value: 'newest', label: 'უახლესი' },
  { value: 'price-asc', label: 'ფასი: დაბლიდან' },
  { value: 'price-desc', label: 'ფასი: მაღლიდან' },
  { value: 'name-asc', label: 'სახელი: ა-ჰ' },
] as const;

export const ADMIN_NAV_ITEMS = [
  { label: 'მთავარი', href: '/admin/dashboard', icon: 'Dashboard' },
  { label: 'პროდუქტები', href: '/admin/products', icon: 'Inventory' },
  { label: 'კატეგორიები', href: '/admin/categories', icon: 'Category' },
  { label: 'ბრენდები', href: '/admin/brands', icon: 'Storefront' },
  { label: 'პარამეტრები', href: '/admin/settings', icon: 'Settings' },
] as const;
