// Mock data for rooms
import { COLORS } from '../../constants/theme';
export const rooms = [
  {
    id: '1',
    name: 'Room 101',
    floor: 1,
    status: 'occupied', // occupied, vacant
    occupant: '1',
    monthlyRate: 500,
    amenities: ['Air Conditioner', 'Private Bathroom', 'Study Desk'],
    image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    name: 'Room 102',
    floor: 1,
    status: 'occupied',
    occupant: '2',
    monthlyRate: 450,
    amenities: ['Fan', 'Shared Bathroom', 'Study Desk'],
    image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    name: 'Room 103',
    floor: 1,
    status: 'vacant',
    occupant: null,
    monthlyRate: 480,
    amenities: ['Air Conditioner', 'Shared Bathroom', 'Closet'],
    image: 'https://images.pexels.com/photos/3773575/pexels-photo-3773575.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    name: 'Room 201',
    floor: 2,
    status: 'occupied',
    occupant: '3',
    monthlyRate: 550,
    amenities: ['Air Conditioner', 'Private Bathroom', 'Balcony'],
    image: 'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '5',
    name: 'Room 202',
    floor: 2,
    status: 'vacant',
    occupant: null,
    monthlyRate: 520,
    amenities: ['Air Conditioner', 'Shared Bathroom', 'Study Desk'],
    image: 'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '6',
    name: 'Room 203',
    floor: 2,
    status: 'occupied',
    occupant: '4',
    monthlyRate: 500,
    amenities: ['Fan', 'Shared Bathroom', 'Closet'],
    image: 'https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '7',
    name: 'Room 301',
    floor: 3,
    status: 'occupied',
    occupant: '5',
    monthlyRate: 600,
    amenities: ['Air Conditioner', 'Private Bathroom', 'Balcony', 'Study Desk'],
    image: 'https://images.pexels.com/photos/2029722/pexels-photo-2029722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '8',
    name: 'Room 302',
    floor: 3,
    status: 'vacant',
    occupant: null,
    monthlyRate: 570,
    amenities: ['Air Conditioner', 'Private Bathroom', 'Study Desk'],
    image: 'https://images.pexels.com/photos/3773577/pexels-photo-3773577.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// Mock data for occupants
export const occupants = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+1234567890',
    roomId: '1',
    entryDate: '2023-05-15',
    status: 'active', // active, former
    email: 'john.doe@example.com',
    occupation: 'Student',
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Sister',
      phone: '+1987654321',
    },
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    name: 'Sarah Smith',
    phone: '+1345678901',
    roomId: '2',
    entryDate: '2023-06-01',
    status: 'active',
    email: 'sarah.smith@example.com',
    occupation: 'Professional',
    emergencyContact: {
      name: 'Mike Smith',
      relationship: 'Father',
      phone: '+1876543210',
    },
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    name: 'Michael Johnson',
    phone: '+1456789012',
    roomId: '4',
    entryDate: '2023-03-10',
    status: 'active',
    email: 'michael.johnson@example.com',
    occupation: 'Engineer',
    emergencyContact: {
      name: 'Lisa Johnson',
      relationship: 'Mother',
      phone: '+1765432109',
    },
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    name: 'Emily Brown',
    phone: '+1567890123',
    roomId: '6',
    entryDate: '2023-07-05',
    status: 'active',
    email: 'emily.brown@example.com',
    occupation: 'Designer',
    emergencyContact: {
      name: 'David Brown',
      relationship: 'Brother',
      phone: '+1654321098',
    },
    image: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '5',
    name: 'Alex Turner',
    phone: '+1678901234',
    roomId: '7',
    entryDate: '2023-04-20',
    status: 'active',
    email: 'alex.turner@example.com',
    occupation: 'Student',
    emergencyContact: {
      name: 'Jessica Turner',
      relationship: 'Mother',
      phone: '+1543210987',
    },
    image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '6',
    name: 'Maria Garcia',
    phone: '+1789012345',
    roomId: null,
    entryDate: '2022-11-15',
    exitDate: '2023-05-15',
    status: 'former',
    email: 'maria.garcia@example.com',
    occupation: 'Nurse',
    emergencyContact: {
      name: 'Carlos Garcia',
      relationship: 'Father',
      phone: '+1432109876',
    },
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// Mock data for payments
export const payments = [
  {
    id: '1',
    occupantId: '1',
    roomId: '1',
    amount: 500,
    type: 'rent', // rent, deposit, other
    date: '2023-10-01',
    status: 'paid', // paid, pending, overdue
    notes: 'Monthly rent for October',
    evidence: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    occupantId: '2',
    roomId: '2',
    amount: 450,
    type: 'rent',
    date: '2023-10-03',
    status: 'paid',
    notes: 'Monthly rent for October',
    evidence: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    occupantId: '3',
    roomId: '4',
    amount: 550,
    type: 'rent',
    date: '2023-10-05',
    status: 'overdue',
    notes: 'Monthly rent for October',
    evidence: null,
  },
  {
    id: '4',
    occupantId: '4',
    roomId: '6',
    amount: 500,
    type: 'rent',
    date: '2023-10-02',
    status: 'paid',
    notes: 'Monthly rent for October',
    evidence: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '5',
    occupantId: '5',
    roomId: '7',
    amount: 600,
    type: 'rent',
    date: '2023-10-05',
    status: 'paid',
    notes: 'Monthly rent for October',
    evidence: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '6',
    occupantId: '1',
    roomId: '1',
    amount: 500,
    type: 'rent',
    date: '2023-09-01',
    status: 'paid',
    notes: 'Monthly rent for September',
    evidence: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '7',
    occupantId: '2',
    roomId: '2',
    amount: 450,
    type: 'rent',
    date: '2023-09-02',
    status: 'paid',
    notes: 'Monthly rent for September',
    evidence: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '8',
    occupantId: '3',
    roomId: '4',
    amount: 550,
    type: 'rent',
    date: '2023-09-03',
    status: 'paid',
    notes: 'Monthly rent for September',
    evidence: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// Mock data for expenses
export const expenses = [
  {
    id: '1',
    category: 'utility',
    subcategory: 'electricity',
    amount: 250,
    date: '2023-10-10',
    description: 'Electricity bill for September',
    evidence: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    category: 'utility',
    subcategory: 'water',
    amount: 120,
    date: '2023-10-11',
    description: 'Water bill for September',
    evidence: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    category: 'maintenance',
    subcategory: 'repairs',
    amount: 180,
    date: '2023-10-05',
    description: 'Plumbing repairs in Room 102',
    evidence: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    category: 'utility',
    subcategory: 'internet',
    amount: 100,
    date: '2023-10-08',
    description: 'Internet bill for October',
    evidence: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '5',
    category: 'maintenance',
    subcategory: 'cleaning',
    amount: 150,
    date: '2023-10-15',
    description: 'Monthly cleaning service',
    evidence: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '6',
    category: 'utility',
    subcategory: 'electricity',
    amount: 230,
    date: '2023-09-10',
    description: 'Electricity bill for August',
    evidence: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '7',
    category: 'utility',
    subcategory: 'water',
    amount: 110,
    date: '2023-09-12',
    description: 'Water bill for August',
    evidence: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '8',
    category: 'maintenance',
    subcategory: 'repairs',
    amount: 200,
    date: '2023-09-20',
    description: 'Air conditioning repair in Room 301',
    evidence: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// Helper function to calculate total income
export const calculateTotalIncome = (month, year) => {
  const filteredPayments = payments.filter(payment => {
    const paymentDate = new Date(payment.date);
    return paymentDate.getMonth() === month && paymentDate.getFullYear() === year && payment.status === 'paid';
  });
  
  return filteredPayments.reduce((total, payment) => total + payment.amount, 0);
};

// Helper function to calculate total expenses
export const calculateTotalExpenses = (month, year) => {
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === month && expenseDate.getFullYear() === year;
  });
  
  return filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
};

// Generate monthly financial data for the current year
export const generateMonthlyFinancialData = () => {
  const currentYear = new Date().getFullYear();
  const monthlyData = [];
  
  for (let month = 0; month < 12; month++) {
    const totalIncome = calculateTotalIncome(month, currentYear);
    const totalExpenses = calculateTotalExpenses(month, currentYear);
    
    monthlyData.push({
      month: month + 1, // 1-12
      income: totalIncome,
      expenses: totalExpenses,
      profit: totalIncome - totalExpenses,
    });
  }
  
  return monthlyData;
};

// Function to get occupancy rate
export const getOccupancyRate = () => {
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(room => room.status === 'occupied').length;
  
  return {
    occupiedRooms,
    totalRooms,
    rate: (occupiedRooms / totalRooms) * 100,
  };
};

// Function to get payment status for current month
export const getCurrentMonthPaymentStatus = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const occupiedRooms = rooms.filter(room => room.status === 'occupied');
  const paidRooms = new Set();
  
  payments.forEach(payment => {
    const paymentDate = new Date(payment.date);
    if (
      paymentDate.getMonth() === currentMonth && 
      paymentDate.getFullYear() === currentYear && 
      payment.status === 'paid'
    ) {
      paidRooms.add(payment.roomId);
    }
  });
  
  const paidCount = paidRooms.size;
  const unpaidCount = occupiedRooms.length - paidCount;
  
  return {
    paidCount,
    unpaidCount,
    occupiedCount: occupiedRooms.length,
  };
};

// Generate data for charts
export const generateOccupancyChartData = () => {
  const { occupiedRooms, totalRooms } = getOccupancyRate();
  return [
    {
      name: 'Occupied',
      count: occupiedRooms,
      color: COLORS.primary,
    },
    {
      name: 'Vacant',
      count: totalRooms - occupiedRooms,
      color: COLORS.lightGray3,
    },
  ];
};

export const generatePaymentStatusChartData = () => {
  const { paidCount, unpaidCount } = getCurrentMonthPaymentStatus();
  return [
    {
      name: 'Paid',
      count: paidCount,
      color: COLORS.success,
    },
    {
      name: 'Unpaid',
      count: unpaidCount,
      color: COLORS.error,
    },
  ];
};

export const generateMonthlyIncomeChartData = () => {
  const currentYear = new Date().getFullYear();
  const monthlyData = generateMonthlyFinancialData();
  
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: monthlyData.map(data => data.income),
      },
    ],
  };
};

export const generateMonthlyExpensesChartData = () => {
  const currentYear = new Date().getFullYear();
  const monthlyData = generateMonthlyFinancialData();
  
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: monthlyData.map(data => data.expenses),
      },
    ],
  };
};

export const generateMonthlyProfitChartData = () => {
  const currentYear = new Date().getFullYear();
  const monthlyData = generateMonthlyFinancialData();
  
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: monthlyData.map(data => data.profit),
      },
    ],
  };
};