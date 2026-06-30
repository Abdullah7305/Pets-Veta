interface NavData {
    id: number;
    title: string;
    path?: string;
    children?: {
        id: number;
        title: string;
        path: string;
    }[];
}

const NAVLINK: NavData[] = [
    {
        id: 1,
        title: "Home",
        path: "/"
    },
    {
        id: 2,
        title: "Marketplace",
        path: "/marketplace1"
    },
    {
        id: 3,
        title: "Services",
        path: "/services"
    },
    {
        id: 4,
        title: "Doctors",
        path: "/doctors"
    },
    {
        id: 5,
        title: "AI Assistant",
        path: "/ai-assistant"
    },
    {
        id: 6,
        title: "About",
        path: "/about"
    },
    {
        id: 7,
        title: "Contact",
        path: "/contact"
    },
    {
        id: 8,
        title: "Dashboards",
        children: [
            {
                id: 1,
                title: "Pet Owner",
                path: "/pet-owner/dashboard"
            },
            {
                id: 2,
                title: "Seller",
                path: "/seller/dashboard"
            }
        ]
    }
];

export default NAVLINK;
