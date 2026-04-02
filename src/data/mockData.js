import { subDays, subMonths, format } from "date-fns";

const today = new Date();

export const mockTransactions = [
  { id: "t1", date: format(today, "yyyy-MM-dd"), amount: 4500, category: "Salary", type: "income", description: "Monthly Tech Salary" },
  { id: "t2", date: format(subDays(today, 1), "yyyy-MM-dd"), amount: 150, category: "Groceries", type: "expense", description: "Whole Foods Market" },
  { id: "t3", date: format(subDays(today, 2), "yyyy-MM-dd"), amount: 55, category: "Entertainment", type: "expense", description: "Netflix Subscription" },
  { id: "t4", date: format(subDays(today, 5), "yyyy-MM-dd"), amount: 45, category: "Transport", type: "expense", description: "Uber Ride" },
  { id: "t5", date: format(subDays(today, 10), "yyyy-MM-dd"), amount: 1200, category: "Housing", type: "expense", description: "Monthly Rent" },
  { id: "t6", date: format(subDays(today, 14), "yyyy-MM-dd"), amount: 200, category: "Utilities", type: "expense", description: "Electric Bill" },
  { id: "t7", date: format(subDays(today, 20), "yyyy-MM-dd"), amount: 400, category: "Freelance", type: "income", description: "Web Design Project" },
  { id: "t8", date: format(subDays(today, 25), "yyyy-MM-dd"), amount: 85, category: "Dining", type: "expense", description: "Dinner at Luigi's" },
  { id: "t9", date: format(subMonths(today, 1), "yyyy-MM-dd"), amount: 4500, category: "Salary", type: "income", description: "Monthly Tech Salary" },
  { id: "t10", date: format(subDays(subMonths(today, 1), 5), "yyyy-MM-dd"), amount: 180, category: "Groceries", type: "expense", description: "Trader Joe's" },
  { id: "t11", date: format(subDays(subMonths(today, 1), 12), "yyyy-MM-dd"), amount: 1200, category: "Housing", type: "expense", description: "Monthly Rent" },
  { id: "t12", date: format(subDays(subMonths(today, 1), 18), "yyyy-MM-dd"), amount: 300, category: "Shopping", type: "expense", description: "New Shoes" },
];

export const expenseCategories = [
  "Housing", "Groceries", "Transport", "Utilities", "Entertainment", "Dining", "Shopping", "Other"
];

export const incomeCategories = [
  "Salary", "Freelance", "Investment", "Other"
];
