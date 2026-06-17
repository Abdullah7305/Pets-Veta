interface NavData {
    id: number;
    title: string;
    path: string;
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
        title: "Seller",
        path: "/seller/dashboard"
    },
    {
        id: 4,
        title: "Services",
        path: "/services"
    },
    {
        id: 5,
        title: "Doctors",
        path: "/doctors"
    },
    {
        id: 6,
        title: "AI Assistant",
        path: "/ai-assistant"
    },
    {
        id: 7,
        title: "About",
        path: "/about"
    },
    {
        id: 8,
        title: "Contact",
        path: "/contact"
    }
];

export default NAVLINK;
