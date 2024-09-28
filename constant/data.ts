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
];
