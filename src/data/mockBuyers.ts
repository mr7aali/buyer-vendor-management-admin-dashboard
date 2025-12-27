export const MOCK_BUYERS = Array.from({ length: 35 }).map((_, i) => ({
    id: `${i + 1}`,
    // Realistic name list (cycle through 20 names)
    name: [
        'Alice Johnson',
        'Bob Smith',
        'Carol Davis',
        'David Wilson',
        'Eve Martinez',
        'Frank Brown',
        'Grace Lee',
        'Hannah Clark',
        'Ian Walker',
        'Jane Hall',
        'Kyle Young',
        'Laura King',
        'Mike Allen',
        'Nina Scott',
        'Oscar Reed',
        'Paula Adams',
        'Quentin Brooks',
        'Rachel Carter',
        'Steve Evans',
        'Tina Foster'
    ][i % 20],
    email: `buyer${i + 1}@example.com`,
    phone: `+1 (555) 000-${(i + 1000).toString().slice(1)}`,
    address: `${i * 10 + 123} Main St, City`,
    joinDate: `Oct ${24 - (i % 20)}, 2023`,
    totalOrders: (i * 5) + 2,
    totalSpent: `$${((i * 100) + 1240.50).toFixed(2)}`,
    status: i % 4 === 0 ? 'inactive' : 'active',
    verified: i % 3 !== 0,
    country: i % 3 === 0 ? 'USA' : i % 3 === 1 ? 'Canada' : 'UK',
    // Using a more deterministic approach for avatars or just relying on the seed
    avatar: `https://i.pravatar.cc/150?u=${i + 1}`
}));
