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

export const SORT_OPTIONS = [
  { value: 'newest', label: 'უახლესი' },
  { value: 'price-asc', label: 'ფასი: დაბლიდან' },
  { value: 'price-desc', label: 'ფასი: მაღლიდან' },
  { value: 'name-asc', label: 'სახელი: ა-ჰ' },
] as const;

export const ADMIN_NAV_ITEMS = [
  { label: 'მთავარი', href: '/admin/dashboard', icon: 'Dashboard' },
  { label: 'პროდუქტები', href: '/admin/products', icon: 'Inventory' },
  { label: 'ბრენდები', href: '/admin/brands', icon: 'Storefront' },
  { label: 'პარამეტრები', href: '/admin/settings', icon: 'Settings' },
] as const;
