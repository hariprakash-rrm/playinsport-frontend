/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'Home',
        title: 'Home',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/user'
    },
    {
        id   : 'Token',
        title: 'Token',
        type : 'basic',
        icon : 'heroicons_outline:clock',
        link : '/user/token'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'User',
        title: 'User-Home',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/user'
    },
    {
        id   : 'Token',
        title: 'User-Token',
        type : 'basic',
        icon : 'heroicons_outline:clock',
        link : '/user/token'
    },
    {
        id: 'Home',
        title: 'Admin-Home',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/admin/home',
    },
    {
        id: 'Game',
        title: 'Admin-Game',
        type: 'basic',
        icon: 'heroicons_outline:cake',
        link: '/admin/game',
    },
    {
        id: 'Token',
        title: 'Admin-Token',
        type: 'basic',
        icon: 'heroicons_outline:clock',
        link: '/admin/token',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
