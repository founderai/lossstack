export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: "Home",
  },
  {
    id: "apps",
    label: "Apps",
    href: "/apps",
    icon: "LayoutGrid",
    children: [
      {
        id: "appraisly",
        label: "Appraisly",
        href: "/apps#appraisly",
        icon: "FileText",
      },
      {
        id: "imagelablr",
        label: "ImageLablr",
        href: "/apps#imagelablr",
        icon: "Image",
      },
      {
        id: "restorecam",
        label: "RestoreCam",
        href: "/apps#restorecam",
        icon: "Camera",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    href: "/pricing",
    icon: "Layers",
  },
  {
    id: "compare",
    label: "Compare Apps",
    href: "/compare",
    icon: "BarChart2",
  },
  {
    id: "faqs",
    label: "FAQs",
    href: "/#faqs",
    icon: "HelpCircle",
  },
  {
    id: "contact",
    label: "Contact / Demo",
    href: "/#contact",
    icon: "Mail",
  },
];
