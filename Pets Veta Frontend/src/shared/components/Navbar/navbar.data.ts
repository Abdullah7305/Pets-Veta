import type { NavItem } from './navbar.types.ts';

export const NAV_ITEMS: NavItem[] = [
    {
        id: 1,
        label: 'Home',
        path: '/',
    },
    {
        id: 2,
        label: 'About',
        path: '/about',
    },
    {
        id: 3,
        label: 'Services',
        path: '/services',
    },
    {
        id: 4,
        label: 'Contact',
        path: '/contact',
    },
    {
        id: 5,
        label: 'Login/Register',
        path: '/auth',
    },
];