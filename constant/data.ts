export const stepsData = [
  {
    id: 1,
    title: "Browse Products",
    description: "User browses and selects the products they want to buy.",
  },
  {
    id: 2,
    title: "Add to Cart",
    description: "User adds the selected products to their shopping cart.",
  },
  {
    id: 3,
    title: "Review Cart",
    description: "User reviews the cart to confirm the items and quantities.",
  },
  {
    id: 4,
    title: "Proceed to Checkout",
    description:
      "User initiates the checkout process by providing shipping and billing information.",
  },
  {
    id: 5,
    title: "Payment",
    description: "User chooses a payment method and completes the payment.",
  },
  {
    id: 6,
    title: "Order Confirmation",
    description: "User receives an order confirmation and order summary.",
  },
  {
    id: 7,
    title: "Shipping",
    description:
      "The seller processes and ships the order to the user's address.",
  },
  {
    id: 8,
    title: "Delivery",
    description: "User receives the order and confirms the delivery.",
  },
];

export type status = "complete" | "in-progress";

export type HomeLink = {
  id: number;
  icon: string;
  title: string;
  href: string;
  status: status;
  keyConcepts: string[];
};

export const homeLinks: HomeLink[] = [
  {
    id: 1,
    icon: "📃",
    title: "React Pagination Example",
    href: "/pagination",
    status: "complete",
    keyConcepts: ["Pagination", "React"],
  },
  {
    id: 2,
    icon: "🔍",
    title: "React Search Filter Example",
    href: "/searchfilter",
    status: "complete",
    keyConcepts: ["Search", "Filter", "React"],
  },
  {
    id: 3,
    icon: "🪟",
    title: "Modal with Portal",
    href: "/portalmodal",
    status: "complete",
    keyConcepts: ["Modal", "Portal", "React"],
  },
  {
    id: 4,
    icon: "🪜",
    title: "Stepper",
    href: "/stepper",
    status: "in-progress",
    keyConcepts: ["Stepper", "React"],
  },
  {
    id: 5,
    icon: "🛺",
    title: "Auto Complete",
    href: "/autocomplete",
    status: "in-progress",
    keyConcepts: ["Autocomplete", "React"],
  },
  {
    id: 6,
    icon: "🍟",
    title: "Auto Complete Chip",
    href: "/autocomplete/chip",
    status: "complete",
    keyConcepts: ["Autocomplete", "React"],
  },
  {
    id: 7,
    icon: "❔",
    title: "Multi Step Form",
    href: "/multistepform",
    status: "in-progress",
    keyConcepts: ["Form", "Stepper", "React"],
  },
  {
    id: 8,
    icon: "☑️",
    title: "To Do List",
    href: "/todolist",
    status: "complete",
    keyConcepts: ["To Do", "Input", "List"],
  },
  {
    id: 9,
    icon: "🏹",
    title: "Drag and Drop List",
    href: "/draganddrop",
    status: "complete",
    keyConcepts: ["Drag", "List", "React"],
  },
  {
    id: 10,
    icon: "🔴🟢🔵",
    title: "Color Match Game",
    href: "/colormatch",
    status: "complete",
    keyConcepts: ["Drag", "List", "React"],
  },
  {
    id: 11,
    icon: "💬",
    title: "Chat Bot",
    href: "/chatbot",
    status: "in-progress",
    keyConcepts: ["Infinite Scroll", "List", "Message"],
  },
  {
    id: 12,
    icon: "📂",
    title: "Accordion",
    href: "/accordian",
    status: "in-progress",
    keyConcepts: ["Accordion", "Accessibility", "React"],
  },
  {
    id: 13,
    icon: "🪟",
    title: "Custom Modal",
    href: "/custommodal",
    status: "in-progress",
    keyConcepts: ["Modal", "React"],
  },
  {
    id: 14,
    icon: "🔄",
    title: "Custom Redux",
    href: "/customredux",
    status: "in-progress",
    keyConcepts: ["Redux", "State Management", "React"],
  },
  {
    id: 15,
    icon: "📊",
    title: "Data Table",
    href: "/datatable",
    status: "in-progress",
    keyConcepts: ["Table", "Pagination", "React"],
  },
  {
    id: 16,
    icon: "📋",
    title: "Dropdown",
    href: "/dropdown",
    status: "in-progress",
    keyConcepts: ["Dropdown", "Select", "React"],
  },
  {
    id: 17,
    icon: "📁",
    title: "File Folder Explorer",
    href: "/filefolder",
    status: "in-progress",
    keyConcepts: ["Tree", "File Explorer", "React"],
  },
  {
    id: 18,
    icon: "🖼️",
    title: "Image Carousel",
    href: "/imagecarousel",
    status: "in-progress",
    keyConcepts: ["Carousel", "Images", "React"],
  },
  {
    id: 19,
    icon: "✏️",
    title: "Mark Words",
    href: "/markwords",
    status: "in-progress",
    keyConcepts: ["Annotation", "Selection", "React"],
  },
  {
    id: 20,
    icon: "🔢",
    title: "OTP Input",
    href: "/otpinput",
    status: "in-progress",
    keyConcepts: ["OTP", "Input", "React"],
  },
  {
    id: 21,
    icon: "💡",
    title: "Tooltip / Popover",
    href: "/tooltip",
    status: "in-progress",
    keyConcepts: ["Tooltip", "Popover", "React"],
  },
  {
    id: 22,
    icon: "📜",
    title: "Virtual List",
    href: "/virtuallist",
    status: "in-progress",
    keyConcepts: ["Virtualization", "List", "React"],
  },
];
