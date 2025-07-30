//'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, Target, Moon, Sun, Download, Filter, Search, ChevronDown, ChevronUp } from 'lucide-react';

// Mock data for charts
const lineChartData = [
  { name: 'Jan', revenue: 4000, users: 2400, conversions: 240 },
  { name: 'Feb', revenue: 3000, users: 1398, conversions: 221 },
  { name: 'Mar', revenue: 2000, users: 9800, conversions: 229 },
  { name: 'Apr', revenue: 2780, users: 3908, conversions: 200 },
  { name: 'May', revenue: 1890, users: 4800, conversions: 218 },
  { name: 'Jun', revenue: 2390, users: 3800, conversions: 250 },
  { name: 'Jul', revenue: 3490, users: 4300, conversions: 210 }
];

const barChartData = [
  { name: 'Social Media', value: 4000, growth: 12 },
  { name: 'Email', value: 3000, growth: 8 },
  { name: 'Search', value: 2000, growth: 15 },
  { name: 'Direct', value: 2780, growth: 5 },
  { name: 'Referral', value: 1890, growth: 20 }
];

const pieChartData = [
  { name: 'Desktop', value: 65, color: '#8b5cf6' },
  { name: 'Mobile', value: 30, color: '#06b6d4' },
  { name: 'Tablet', value: 5, color: '#10b981' }
];

const tableData = [
  { id: 1, campaign: 'Summer Sale 2024', clicks: 12500, conversions: 890, ctr: '7.12%', cost: '$2,450', status: 'Active' },
  { id: 2, campaign: 'Holiday Promo', clicks: 8900, conversions: 567, ctr: '6.37%', cost: '$1,780', status: 'Paused' },
  { id: 3, campaign: 'Brand Awareness', clicks: 15600, conversions: 234, ctr: '1.50%', cost: '$3,200', status: 'Active' },
  { id: 4, campaign: 'Product Launch', clicks: 9800, conversions: 445, ctr: '4.54%', cost: '$2,100', status: 'Active' },
  { id: 5, campaign: 'Retargeting Q3', clicks: 6700, conversions: 789, ctr: '11.78%', cost: '$1,340', status: 'Active' }
];

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const MetricCard = ({ title, value, change, icon: Icon, color, delay = 0 }) => (
    <div 
      className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} 
        rounded-xl border p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {title}
          </p>
          <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mt-2`}>
            {value}
          </p>
          <p className={`text-sm mt-1 flex items-center ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            {change >= 0 ? '+' : ''}{change}% from last month
          </p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    let sortableData = [...tableData];
    if (searchTerm) {
      sortableData = sortableData.filter(item =>
        item.campaign.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  };

  const paginatedData = getSortedData().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(getSortedData().length / itemsPerPage);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} 
        border-b px-6 py-4 sticky top-0 z-50 backdrop-blur-sm`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ADmyBRAND Insights
            </h1>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
              Analytics Dashboard
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className={`px-3 py-2 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${
                darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'
              } hover:scale-110 transition-transform duration-200`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Revenue"
            value="$24,580"
            change={12.5}
            icon={DollarSign}
            color="bg-gradient-to-r from-green-500 to-green-600"
            delay={0}
          />
          <MetricCard
            title="Active Users"
            value="1,234"
            change={8.2}
            icon={Users}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
            delay={100}
          />
          <MetricCard
            title="Conversions"
            value="456"
            change={-2.1}
            icon={Target}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
            delay={200}
          />
          <MetricCard
            title="Growth Rate"
            value="23.4%"
            change={15.8}
            icon={TrendingUp}
            color="bg-gradient-to-r from-orange-500 to-orange-600"
            delay={300}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Revenue Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData} key={animationKey}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="name" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                    border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 6 }}
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Device Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={1500}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Traffic Sources
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="name" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                  border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="#06b6d4" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Data Table */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Campaign Performance
              </h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-lg border ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
                <button className={`p-2 rounded-lg ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                } hover:scale-110 transition-transform duration-200`}>
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  {['Campaign', 'Clicks', 'Conversions', 'CTR', 'Cost', 'Status'].map((header) => (
                    <th
                      key={header}
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}
                      onClick={() => handleSort(header.toLowerCase())}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{header}</span>
                        {sortConfig.key === header.toLowerCase() && (
                          sortConfig.direction === 'asc' ? 
                          <ChevronUp className="w-4 h-4" /> : 
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={`${darkMode ? 'bg-gray-800' : 'bg-white'} divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {paginatedData.map((row, index) => (
                  <tr key={row.id} className={`hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors duration-150`}>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {row.campaign}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      {row.clicks.toLocaleString()}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      {row.conversions}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      {row.ctr}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      {row.cost}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        row.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className={`px-6 py-3 flex items-center justify-between border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, getSortedData().length)} of {getSortedData().length} results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md text-sm ${
                  currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md text-sm ${
                  currentPage === totalPages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;