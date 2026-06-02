import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const stats = [
  {
    label: "Events Attended",
    value: "12",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
    iconColor: "text-blue-400",
    textColor: "text-blue-300",
  },
  {
    label: "Documents Downloaded",
    value: "8",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
    iconColor: "text-purple-400",
    textColor: "text-purple-300",
  },
  {
    label: "Notifications",
    value: "3 New",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    color: "from-amber-500/20 to-amber-600/10 border-amber-500/30",
    iconColor: "text-amber-400",
    textColor: "text-amber-300",
  },
  {
    label: "Member Since",
    value: "2024",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11a3 3 0 10-6 0" />
      </svg>
    ),
    color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
    iconColor: "text-emerald-400",
    textColor: "text-emerald-300",
  },
];

const quickActions = [
  {
    to: "/profile",
    title: "My Profile",
    description: "View and edit your personal details",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    to: "/my-events",
    title: "My Events",
    description: "Manage your event registrations",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    to: "/notifications",
    title: "Notifications",
    description: "Stay up to date with alerts",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    to: "/members",
    title: "Members Directory",
    description: "Connect with fellow members",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    ),
  },
];

const recentUpdates = [
  {
    title: "Annual General Meeting - Save the Date",
    message: "The AGM has been scheduled for September 15th. Mark your calendars!",
    time: "2 hours ago",
  },
  {
    title: "New CPD Workshop Available",
    message: "A workshop on UK Immigration Law updates is now open for registration.",
    time: "1 day ago",
  },
  {
    title: "Welcome New Members",
    message: "We're pleased to welcome 12 new members who joined this month.",
    time: "3 days ago",
  },
  {
    title: "Membership Renewal Reminder",
    message: "Annual membership renewals are due by the end of next month.",
    time: "1 week ago",
  },
];

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Welcome, {user?.firstName || "Member"}!
        </h1>
        <p className="text-gray-400 mt-2">Your personal dashboard</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`relative overflow-hidden rounded-xl border bg-gradient-to-br ${stat.color} p-5`}
          >
            <div className={`${stat.iconColor} mb-3`}>{stat.icon}</div>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className={`text-sm mt-1 ${stat.textColor}`}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-5">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="group flex items-center gap-4 bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 hover:border-blue-500/50 hover:bg-gray-800/80 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="shrink-0 w-11 h-11 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-500/30 group-hover:scale-110 transition-all duration-300">
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {action.title}
                </p>
                <p className="text-sm text-gray-400 truncate">{action.description}</p>
              </div>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-5">Recent Updates</h2>
        <div className="space-y-3">
          {recentUpdates.map((update, i) => (
            <div
              key={i}
              className="bg-gray-800/40 border border-gray-700/40 rounded-xl p-5 hover:border-gray-600/60 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-white">{update.title}</p>
                  <p className="text-sm text-gray-400 mt-1">{update.message}</p>
                </div>
                <span className="shrink-0 text-xs text-gray-500 whitespace-nowrap">{update.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
