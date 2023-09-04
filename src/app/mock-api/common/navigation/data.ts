/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'User',
        title: 'Home',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/user',
    },
    {
        id: 'Token',
        title: 'Token',
        type: 'basic',
        icon: 'heroicons_outline:cube',
        link: '/user/token',
    },
    {
        id: 'Wallet',
        title: 'Wallet',
        type: 'basic',
        icon: 'heroicons_outline:currency-rupee',
        link: '/user/wallet',
    },
    {
        id: 'UserProfile',
        title: 'Profile',
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
                icon: 'heroicons_outline:clock',
                link: '/user/transaction-history',
            },
        ],
    },
    {
        id: 'Contact-us',
        title: 'Contact-us',
        type: 'basic',
        icon: 'heroicons_outline:user-group',
        link: '/user/contact',
    },
    {
        id: 'Terms & conditions*',
        title: 'Terms & conditions*',
        type: 'basic',
        icon: 'heroicons_outline:bell',
        link: '/user/t&c',
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
        icon: 'heroicons_outline:cube',
        link: '/user/token',
    },
    {
        id: 'Wallet',
        title: 'User Wallet',
        type: 'basic',
        icon: 'heroicons_outline:currency-rupee',
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
                icon: 'heroicons_outline:clock',
                link: '/user/transaction-history',
            },
        ],
    },
        {
            id: 'Contact-us',
            title: 'Contact-us',
            type: 'basic',
            icon: 'heroicons_outline:user-group',
            link: '/user/contact',
        },
        {
            id: 'Terms & conditions*',
            title: 'Terms & conditions*',
            type: 'basic',
            icon: 'heroicons_outline:bell',
            link: 'user/t&c',
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
        icon: 'heroicons_outline:cube',
        link: '/admin/token',
    },
    {
        id: 'Wallet',
        title: 'Admin Wallet',
        type: 'basic',
        icon: 'heroicons_outline:currency-rupee',
        link: '/admin/wallet',
    },
    {
        id: 'Reward',
        title: 'Admin Reward',
        type: 'basic',
        icon: 'heroicons_outline:key',
        link: '/admin/create-coupon',
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
