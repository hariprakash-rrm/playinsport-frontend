/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'Home',
        title: 'Home',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/'
    },
    {
        id: 'Token',
        title: 'Token',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/user/token'
    },
    {
        id: 'Wallet',
        title: 'Wallet',
        type: 'basic',
        icon: 'heroicons_outline:credit-card',
        link: '/user/wallet'
    },
    {
        id: 'UserProfile',
        title: 'User Profile',
        type: 'collapsable', // Change type to 'collapsable' to create a dropdown
        icon: 'heroicons_outline:user-circle',
        children: [ // Nest the items within the 'children' property
            {
                id: 'Profile',
                title: 'Profile',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: '/user/profile'
            },
            {
                id: 'Reward',
                title: 'Rewards',
                type: 'basic',
                icon: 'heroicons_outline:star',
                link: '/user/reward'
            },
            {
                id: 'TransactionHistory',
                title: 'TransactionHistory',
                type: 'basic',
                icon: 'heroicons_outline:wallet',
                link: '/user/transaction-history'
            }
        ]
    },
    {
        id: 'Sign out',
        title: 'Sign Out',
        type: 'basic',
        icon: 'heroicons_outline:logout',
        link: '/sign-out'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'User',
        title: 'User Home',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/user',
    },
    {
        id: 'Token',
        title: 'User Token',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/user/token',
    },
    {
        id: 'Wallet',
        title: 'User Wallet',
        type: 'basic',
        icon: 'heroicons_outline:wallet',
        link: '/user/wallet',
    },
    {
        id: 'UserProfile',
        title: 'User Profile',
        type: 'collapsable', // Change type to 'collapsable' to create a dropdown
        icon: 'heroicons_outline:user-circle',
        children: [
            // Nest the items within the 'children' property
            {
                id: 'Profile',
                title: 'Profile',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: '/user/profile',
            },
            {
                id: 'Reward',
                title: 'Rewards',
                type: 'basic',
                icon: 'heroicons_outline:star',
                link: '/user/reward',
            },
            {
                id: 'Transaction History',
                title: 'Transaction History',
                type: 'basic',
                icon: 'heroicons_outline:wallet',
                link: '/user/transaction-history',
            },
        ],
    },
    {
        id: 'Rewards',
        title: 'User Rewards',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/user/reward',
    },
    {
        id: 'Home',
        title: 'Admin Home',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/admin/home',
    },

    {
        id: 'Token',
        title: 'Admin Token',
        type: 'basic',
        icon: 'heroicons_outline:document',
        link: '/admin/token',
    },
    {
        id: 'Wallet',
        title: 'Admin Wallet',
        type: 'basic',
        icon: 'heroicons_outline:document',
        link: '/admin/wallet',
    },
    {
        id: 'Sign out',
        title: 'Sign Out',
        type: 'basic',
        icon: 'heroicons_outline:logout',
        link: '/sign-out',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
