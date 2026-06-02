export default function AdminPanel() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-4xl font-bold text-primary mb-2">0</div>
          <div className="text-gray-600 font-semibold">Total Users</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-4xl font-bold text-primary mb-2">0</div>
          <div className="text-gray-600 font-semibold">Total Members</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-4xl font-bold text-primary mb-2">0</div>
          <div className="text-gray-600 font-semibold">Total Events</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-4xl font-bold text-primary mb-2">0</div>
          <div className="text-gray-600 font-semibold">Total News</div>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-primary mb-4">
            User Management
          </h3>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition w-full">
            View All Users
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-primary mb-4">
            Member Management
          </h3>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition w-full">
            View All Members
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-primary mb-4">
            Event Management
          </h3>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition w-full">
            Manage Events
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-primary mb-4">
            Content Management
          </h3>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition w-full">
            Manage News & Updates
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold text-primary mb-4">Recent Activity</h3>
        <p className="text-gray-600">Activity logs will appear here...</p>
      </div>
    </div>
  );
}
