"use client";

import { PieChartIcon, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from 'next/link';
import { 
  TrendingUp, 
  Users, 
  UserX, 
  Award, 
  Activity, 
  Bell,
  Target,
  Clock,
  UserCheck
} from "lucide-react";
import { 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend,
  CartesianGrid,
  Area,
  AreaChart
} from "recharts";

// --- DATA (Some data has been updated based on your feedback) ---

const COLORS = {
  danger: '#DC2626',
  warning: '#F59E0B',
  success: '#10B981',
  primary: '#6366F1',
};

// Counselling trend data remains the same
const counsellingTrendData = [
  { month: 'Apr', totalForCounselling: 45, counselled: 38, percentage: 84 },
  { month: 'May', totalForCounselling: 52, counselled: 41, percentage: 79 },
  { month: 'Jun', totalForCounselling: 48, counselled: 42, percentage: 88 },
  { month: 'Jul', totalForCounselling: 58, counselled: 47, percentage: 81 },
  { month: 'Aug', totalForCounselling: 63, counselled: 55, percentage: 87 },
  { month: 'Sep', totalForCounselling: 71, counselled: 65, percentage: 92 },
  { month: 'Oct', totalForCounselling: 68, counselled: 64, percentage: 94 },
];

// Risk distribution data remains the same
const riskDistributionData = [
  { name: 'Critical Risk', value: 12, students: '12', fill: COLORS.danger },
  { name: 'Moderate Risk', value: 23, students: '23', fill: COLORS.warning },
  { name: 'On Track', value: 85, students: '85', fill: COLORS.success },
];

// Critical alerts data remains the same
const criticalAlerts = [
  { id: '1', name: 'Aarav Sharma', riskScore: 85, issues: ['Attendance: 42%', 'Failed 2 tests', 'No parent contact'], lastCounselled: '2 weeks ago' },
  { id: '2', name: 'Priya Patel', riskScore: 78, issues: ['3 subjects below 40%'], lastCounselled: '1 week ago' },
  { id: '3', name: 'Aditya Kumar', riskScore: 72, issues: ['Fee overdue 45 days'], lastCounselled: '3 days ago' },
];

// **UPDATED** Risk factors data (Behavior removed)
const riskFactorsData = [
  { factor: 'Low Attendance', count: 34, severity: 'high' },
  { factor: 'Failing Grades', count: 28, severity: 'high' },
  { factor: 'Fee Payment', count: 15, severity: 'medium' },
];

// Custom tooltip for counselling chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border">
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-blue-600">Need Counselling: {payload[0].value}</p>
        <p className="text-sm text-green-600">Counselled: {payload[1].value}</p>
        <p className="text-sm font-medium">Success Rate: {payload[0].payload.percentage}%</p>
      </div>
    );
  }
  return null;
};

// Custom label for pie chart (no changes)
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, payload }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="font-bold text-sm">
      {payload.students}
    </text>
  );
};


const DashboardHome = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Mentor Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Real-time student monitoring and risk assessment system</p>
      </div>

      <Alert className="mb-6 border-l-4 border-l-red-500 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <span className="font-semibold">12 students require immediate intervention</span> - Risk indicators detected.
        </AlertDescription>
      </Alert>

      {/* KPI Cards (no changes here) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
         <Card className="border-t-4 border-t-blue-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
            <Users className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">120</div>
            <div className="flex items-center text-xs mt-2">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+8 this month</span>
            </div>
          </CardContent>
        </Card>
        {/* ... other KPI cards ... */}
         <Card className="border-t-4 border-t-green-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">My Performance</CardTitle>
            <Award className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">83%</div>
            <div className="flex items-center text-xs mt-2">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+4% from last term</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-purple-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Counselling Rate</CardTitle>
            <Activity className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">94%</div>
            <div className="flex items-center text-xs mt-2">
              <span className="text-gray-600">64 of 68 counselled</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-amber-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Intervention Success</CardTitle>
            <Target className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">78%</div>
            <div className="flex items-center text-xs mt-2">
              <Clock className="h-3 w-3 text-gray-500 mr-1" />
              <span className="text-gray-600">Avg. 3 days response</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-blue-500" />Student Counselling Trends</CardTitle>
            <CardDescription>Monthly tracking of students needing vs receiving counselling</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={counsellingTrendData}>
                {/* ... defs for gradient ... */}
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
                <YAxis stroke="#666" style={{ fontSize: '12px' }} label={{ value: 'No. of Students', angle: -90, position: 'insideLeft', dx: -10, style: { textAnchor: 'middle' } }} />
                <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
                <Legend />
                <Area type="monotone" dataKey="totalForCounselling" stroke={COLORS.primary} strokeWidth={2} fillOpacity={0.3} fill="url(#colorTotal)" name="Need Counselling" />
                <Area type="monotone" dataKey="counselled" stroke={COLORS.success} strokeWidth={2} fillOpacity={0.3} fill="url(#colorCounselled)" name="Counselled" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><PieChartIcon className="h-5 w-5 text-purple-500" />Risk Distribution</CardTitle>
            <CardDescription>Current student risk categorization</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie data={riskDistributionData} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={100} innerRadius={40} paddingAngle={5} dataKey="value">
                  {riskDistributionData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.fill} />))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} formatter={(value, entry) => (<span style={{ color: entry.color }}>{value}</span>)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UserCheck className="h-5 w-5 text-green-500" />My Counselling Activity</CardTitle>
            <CardDescription>Your intervention funnel for this term.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <UserX className="h-5 w-5 text-red-500" />
                  <p className="font-medium text-sm">Students Flagged as "At Risk"</p>
                </div>
                <span className="text-xl font-bold text-gray-900">12</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-purple-500" />
                  <p className="font-medium text-sm">Sessions Conducted</p>
                </div>
                <span className="text-xl font-bold text-gray-900">8</span>
              </div>
               <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <p className="font-medium text-sm">Students Now "Improving"</p>
                </div>
                <span className="text-xl font-bold text-gray-900">6</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Critical Alerts Card */}
        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700"><Bell className="h-5 w-5 text-red-500 animate-pulse" />Critical Student Alerts</CardTitle>
            <CardDescription>Students requiring immediate intervention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalAlerts.map((student) => (
                <Link href={`/mentor/students/${student.id}`} key={student.id} className="block">
                  <div className="p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200">
                    {/* --- THIS SECTION IS NOW FILLED IN --- */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">{student.name}</p>
                          <Badge className="bg-red-500 text-white">
                            Risk: {student.riskScore}%
                          </Badge>
                        </div>
                        <div className="mt-2 space-y-1">
                          {student.issues.map((issue, idx) => (
                            <p key={idx} className="text-sm text-red-700 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />
                              {issue}
                            </p>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2 flex items-center">
                          <Clock className="inline h-3 w-3 mr-1.5" />
                          Last counselled: {student.lastCounselled}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              <button className="w-full mt-3 p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors">
                View All At-Risk Students (12)
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-amber-500" />Risk Factors Analysis</CardTitle>
          <CardDescription>Primary reasons for student risk categorization based on available data.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {riskFactorsData.map((factor, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`text-3xl font-bold ${factor.severity === 'high' ? 'text-red-500' : 'text-yellow-500'}`}>
                  {factor.count}
                </div>
                <p className="text-sm text-gray-600 mt-1">{factor.factor}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;