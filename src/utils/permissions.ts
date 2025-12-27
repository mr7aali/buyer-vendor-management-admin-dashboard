export type Role = 'Admin' | 'SubAdmin' | 'Staff';
export interface Permission {
  path: string;
  label: string;
}
export const ROLES: Record<string, Role> = {
  ADMIN: 'Admin',
  SUB_ADMIN: 'SubAdmin',
  STAFF: 'Staff'
};

// Define available routes/pages for permission mapping
export const APP_PAGES = [{
  path: '/',
  label: 'Dashboard'
}, {
  path: '/analytics',
  label: 'Analytics'
}, {
  path: '/buyers',
  label: 'Buyers'
}, {
  path: '/vendors',
  label: 'Vendors'
}, {
  path: '/orders',
  label: 'Orders'
}, {
  path: '/transactions',
  label: 'Transactions'
}, {
  path: '/verification',
  label: 'Verification'

},
// Admin only usually
{
  path: '/permissions',
  label: 'Permissions'
},
// Admin only
{
  path: '/settings',
  label: 'Settings'
}, {
  path: '/chats',
  label: 'Chats & Complaints'
}, {
  path: '/notifications',
  label: 'Notifications'
}, {
  path: '/account',
  label: 'Account'
}];

// Default permissions per role
export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  Admin: APP_PAGES.map(p => p.path),
  // All pages
  SubAdmin: ['/', '/analytics', '/buyers', '/vendors', '/orders', '/chats', '/notifications', '/settings', '/account'],
  Staff: ['/', '/orders', '/chats', '/notifications', '/account']
};
export function hasPermission(role: Role, path: string): boolean {
  // Allow public routes or detail pages if the base route is allowed
  // For simplicity, we check if the path starts with any allowed path
  const allowedPaths = ROLE_PERMISSIONS[role] || [];

  // Handle root path specifically
  if (path === '/') return allowedPaths.includes('/');

  // For other paths, check if the start of the path matches an allowed route
  // e.g. /orders/123 should be allowed if /orders is allowed
  return allowedPaths.some(allowed => allowed !== '/' && path.startsWith(allowed));
}