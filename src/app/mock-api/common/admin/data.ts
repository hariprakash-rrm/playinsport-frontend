/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'Home',
        title: 'Home',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/admin/home',
    },
    {
        id: 'Game',
        title: 'Game',
        type: 'basic',
        icon: 'heroicons_outline:book',
        link: '/admin/game',
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'Game',
        title: 'Game',
        type: 'basic',
        icon: 'heroicons_outline:game_',
        link: 'admin/game',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
