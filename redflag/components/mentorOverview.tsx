"use client";

import { PieChartIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from 'next/link';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  AlertTriangle, 
  Award, 
  Activity, 
  Bell,
  Calendar,
  BookOpen,
  Target,
  Clock
} from "lucide-react";
import { 
  LineChart, 
  Line, 
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
  AreaChart,
  RadialBarChart,
  RadialBar
} from "recharts";

// Enhanced color palette
const COLORS = {
  danger: '#DC2626',
  warning: '#F59E0B',
  success: '#10B981',
  primary: '#6366F1',
  secondary: '#8B5CF6',
  accent: '#EC4899',
  neutral: '#6B7280'
};

// Student counselling trend data
const counsellingTrendData = [
  { month: 'Apr', totalForCounselling: 45, counselled: 38, percentage: 84 },
  { month: 'May', totalForCounselling: 52, counselled: 41, percentage: 79 },
  { month: 'Jun', totalForCounselling: 48, counselled: 42, percentage: 88 },
  { month: 'Jul', totalForCounselling: 58, counselled: 47, percentage: 81 },
  { month: 'Aug', totalForCounselling: 63, counselled: 55, percentage: 87 },
  { month: 'Sep', totalForCounselling: 71, counselled: 65, percentage: 92 },
  { month: 'Oct', totalForCounselling: 68, counselled: 64, percentage: 94 },
];

// Risk distribution with student counts
const riskDistributionData = [
  { name: 'Critical Risk', value: 12, students: '12 Students', fill: COLORS.danger },
  { name: 'Moderate Risk', value: 23, students: '23 Students', fill: COLORS.warning },
  { name: 'On Track', value: 85, students: '85 Students', fill: COLORS.success },
];

// Teacher performance metrics
const teacherPerformanceData = [
  { subject: 'Mathematics', current: 82, previous: 78, trend: 'up' },
  { subject: 'Physics', current: 75, previous: 79, trend: 'down' },
  { subject: 'Chemistry', current: 88, previous: 85, trend: 'up' },
  { subject: 'Computer Science', current: 91, previous: 87, trend: 'up' },
  { subject: 'English', current: 79, previous: 80, trend: 'down' },
];

// Intervention success rate
const interventionData = [
  { name: 'Successful', value: 78, fill: COLORS.primary },
];

// Risk factors breakdown
const riskFactorsData = [
  { factor: 'Attendance', count: 34, severity: 'high' },
  { factor: 'Academic', count: 28, severity: 'high' },
  { factor: 'Fee Payment', count: 15, severity: 'medium' },
  { factor: 'Behavior', count: 8, severity: 'low' },
];

// Students needing immediate attention with more detailed info
const criticalAlerts = [
  { 
    id: '1', 
    name: 'Aarav Sharma', 
    riskScore: 85,
    issues: ['Attendance: 42%', 'Failed 2 tests', 'No parent contact'],
    lastCounselled: '2 weeks ago'
  },
  { 
    id: '2', 
    name: 'Priya Patel', 
    riskScore: 78,
    issues: ['3 subjects below 40%', 'Irregular submission'],
    lastCounselled: '1 week ago'
  },
  { 
    id: '3', 
    name: 'Aditya Kumar', 
    riskScore: 72,
    issues: ['Fee overdue 45 days', 'Attendance: 58%'],
    lastCounselled: '3 days ago'
  },
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

// Custom label for pie chart
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  payload,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  value: number;
  payload: { students: string };
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="font-bold text-sm"
    >
      {payload.students}
    </text>
  );
};

const DashboardHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Early Intervention Dashboard</h1>
        <p className="text-gray-600 mt-1">Real-time student monitoring and risk assessment system</p>
      </div>

      {/* Alert Banner */}
      <Alert className="mb-6 border-l-4 border-l-red-500 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <span className="font-semibold">12 students require immediate intervention</span> - Risk indicators detected across multiple parameters
        </AlertDescription>
      </Alert>

      {/* KPI Cards with enhanced design */}
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

        <Card className="border-t-4 border-t-green-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Teacher Performance</CardTitle>
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

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        {/* Counselling Trend Line Chart */}
        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Student Counselling Trends
            </CardTitle>
            <CardDescription>Monthly tracking of students needing vs receiving counselling</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={counsellingTrendData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCounselled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={COLORS.success} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#666"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#666"
                  style={{ fontSize: '12px' }}
                  label={{ value: 'Number of Students', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="totalForCounselling"
                  stroke={COLORS.primary}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                  name="Need Counselling"
                />
                <Area
                  type="monotone"
                  dataKey="counselled"
                  stroke={COLORS.success}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCounselled)"
                  name="Counselled"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution Pie Chart */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-purple-500" />
              Risk Distribution
            </CardTitle>
            <CardDescription>Current student risk categorization</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  innerRadius={40}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry) => (
                    <span style={{ color: entry.color }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Teacher Performance and Critical Alerts */}
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        {/* Teacher Performance */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-500" />
              Teacher Performance by Subject
            </CardTitle>
            <CardDescription>Current vs Previous Term Comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teacherPerformanceData.map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{subject.subject}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-2xl font-bold text-gray-900">{subject.current}%</span>
                      <div className="flex items-center">
                        {subject.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm ${subject.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {Math.abs(subject.current - subject.previous)}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full ${subject.current >= 80 ? 'bg-green-500' : subject.current >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${subject.current}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Critical Alerts */}
        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <Bell className="h-5 w-5 text-red-500 animate-pulse" />
              Critical Student Alerts
            </CardTitle>
            <CardDescription>Students requiring immediate intervention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalAlerts.map((student) => (
                <Link href={`/mentor/students/${student.id}`} key={student.id} className="block">
                  <div className="p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200">
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
                            <p key={idx} className="text-sm text-red-700 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                              {issue}
                            </p>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          <Clock className="inline h-3 w-3 mr-1" />
                          Last counselled: {student.lastCounselled}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              <button className="w-full p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors">
                View All At-Risk Students (12)
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Factors Breakdown */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Risk Factors Analysis
          </CardTitle>
          <CardDescription>Primary reasons for student risk categorization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {riskFactorsData.map((factor, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                <div className={`text-3xl font-bold ${
                  factor.severity === 'high' ? 'text-red-500' : 
                  factor.severity === 'medium' ? 'text-yellow-500' : 
                  'text-blue-500'
                }`}>
                  {factor.count}
                </div>
                <p className="text-sm text-gray-600 mt-1">{factor.factor}</p>
                <div className="mt-2">
                  <Badge variant={factor.severity === 'high' ? 'destructive' : factor.severity === 'medium' ? 'secondary' : 'default'}>
                    {factor.severity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;