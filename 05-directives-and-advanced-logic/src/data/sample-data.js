/**
 * Sample data for the data dashboard
 */

// Sample data items
const sampleData = [
  {
    id: 1,
    title: "Complete Project Proposal",
    description: "Write up the full proposal for the new client project including timelines and budget estimates.",
    status: "completed",
    priority: "high",
    category: "Development",
    createdAt: "2025-04-05T15:30:00Z"
  },
  {
    id: 2,
    title: "Design System Update",
    description: "Update the design system with the new brand colors and typography guidelines.",
    status: "active",
    priority: "medium",
    category: "Design",
    createdAt: "2025-04-12T09:15:00Z"
  },
  {
    id: 3,
    title: "Quarterly Reports",
    description: "Generate the quarterly financial and performance reports for the stakeholders meeting.",
    status: "pending",
    priority: "high",
    category: "Finance",
    createdAt: "2025-04-15T14:00:00Z"
  },
  {
    id: 4,
    title: "API Integration",
    description: "Integrate the payment processing API with the e-commerce platform.",
    status: "active",
    priority: "high",
    category: "Development",
    createdAt: "2025-04-10T11:20:00Z"
  },
  {
    id: 5,
    title: "User Testing Session",
    description: "Schedule and conduct user testing for the new dashboard interface.",
    status: "pending",
    priority: "medium",
    category: "UX Research",
    createdAt: "2025-04-18T13:45:00Z"
  },
  {
    id: 6,
    title: "Server Maintenance",
    description: "Perform routine server maintenance and security updates.",
    status: "canceled",
    priority: "low",
    category: "IT Support",
    createdAt: "2025-04-08T22:00:00Z"
  },
  {
    id: 7,
    title: "Content Calendar",
    description: "Create social media content calendar for the product launch.",
    status: "active",
    priority: "medium",
    category: "Marketing",
    createdAt: "2025-04-14T16:30:00Z"
  },
  {
    id: 8,
    title: "Budget Review",
    description: "Review Q2 budget allocations and make necessary adjustments.",
    status: "completed",
    priority: "high",
    category: "Finance",
    createdAt: "2025-04-03T10:00:00Z"
  },
  {
    id: 9,
    title: "Team Training",
    description: "Organize training session for the team on the new project management tool.",
    status: "pending",
    priority: "low",
    category: "HR",
    createdAt: "2025-04-20T09:00:00Z"
  },
  {
    id: 10,
    title: "Client Meeting",
    description: "Prepare presentation and agenda for the upcoming client meeting.",
    status: "active",
    priority: "medium",
    category: "Sales",
    createdAt: "2025-04-16T15:00:00Z"
  }
];

/**
 * Simulates fetching data from an API
 * @returns {Promise<Array>} Promise that resolves with the sample data
 */
export const fetchSampleData = () => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleData);
    }, 800);
  });
};

/**
 * Fetches a specific data item by ID
 * @param {number} id - The ID of the item to fetch
 * @returns {Promise<Object|null>} Promise that resolves with the item or null if not found
 */
export const fetchItemById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = sampleData.find(item => item.id === id) || null;
      resolve(item);
    }, 300);
  });
};
