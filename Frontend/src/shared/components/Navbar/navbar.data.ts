interface NavLink {
    id: number;
    title: string;
    path: string
}

export const NAVLINKS: NavLink[] = [
    {
        id: 1,
        title: "Home",
        path: "/"
    },
    {
        id: 2,
        title: "Services",
        path: "/services"
    },
    {
        id: 3,
        title: "About",
        path: "/about"
    },
    {
        id: 4,
        title: "Contact Us",
        path: "/contact"
    },
    {
        id: 5,
        title: "Doctors",
        path: '/doctors'
    }
];