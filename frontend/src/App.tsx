import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { LanguageProvider } from "./i18n/LanguageContext";
import Layout from "./components/Layout";
import PublicLanding from "./pages/PublicLanding";
import Home from "./pages/Home";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import SuperAdminUsers from "./pages/SuperAdminUsers";
import LeaderDashboard from "./pages/LeaderDashboard";
import Members from "./pages/Members";
import Events from "./pages/Events";
import News from "./pages/News";
import About from "./pages/About";
import Leadership from "./pages/Leadership";
import GalleryPage from "./pages/GalleryPage";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import Service from "./pages/Service";
import Galata from "./pages/Galata";
import Ergaa from "./pages/Ergaa";
import Yaadannoo from "./pages/Yaadannoo";
import Waaee from "./pages/Waaee";
import Koreewwan from "./pages/Koreewwan";
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";
import NewsDetail from "./pages/NewsDetail";
import EventDetail from "./pages/EventDetail";
import MemberDetail from "./pages/MemberDetail";
import Profile from "./pages/Profile";
import MyEvents from "./pages/MyEvents";
import Documents from "./pages/Documents";
import AlumniNetwork from "./pages/AlumniNetwork";
import Opportunities from "./pages/Opportunities";
import Resources from "./pages/Resources";
import Notifications from "./pages/Notifications";
import AdminEvents from "./pages/AdminEvents";
import AdminNews from "./pages/AdminNews";
import AdminGallery from "./pages/AdminGallery";
import AdminDocuments from "./pages/AdminDocuments";
import AdminAlumni from "./pages/AdminAlumni";
import AdminOpportunities from "./pages/AdminOpportunities";
import AdminContact from "./pages/AdminContact";
import AdminStudents from "./pages/AdminStudents";

const ADMIN_ROLES = ["superadmin", "admin"];

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppRoutes />
      </Router>
    </LanguageProvider>
  );
}

function AppRoutes() {
  const { user, token } = useAuthStore();

  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    if (!token || !user?.role || !ADMIN_ROLES.includes(user.role)) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  };

  const SuperAdminRoute = ({ children }: { children: React.ReactNode }) => {
    if (!token || user?.role !== "superadmin") {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  };

  const AdminRouteSingle = ({ children }: { children: React.ReactNode }) => {
    if (!token || user?.role !== "admin") {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  };

  if (!token) {
    return (
      <Routes>
        <Route path="/" element={<PublicLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Waaee />} />
        <Route path="/members" element={<Members />} />
        <Route path="/events" element={<Events />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/service" element={<Service />} />
        <Route path="/galata" element={<Galata />} />
        <Route path="/ergaa" element={<Ergaa />} />
        <Route path="/yaadannoo" element={<Yaadannoo />} />
        <Route path="/waaee" element={<Waaee />} />
        <Route path="/koreewwan" element={<Koreewwan />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/members/:id" element={<MemberDetail />} />

        {/* Student Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/alumni" element={<AlumniNetwork />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/notifications" element={<Notifications />} />

        {/* Superadmin Routes */}
        <Route
          path="/superadmin/dashboard"
          element={
            <SuperAdminRoute>
              <SuperAdminDashboard />
            </SuperAdminRoute>
          }
        />
        <Route
          path="/superadmin/users"
          element={
            <SuperAdminRoute>
              <SuperAdminUsers />
            </SuperAdminRoute>
          }
        />

        {/* Admin Dashboard (for president, VP, secretary, social media manager, etc.) */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRouteSingle>
              <LeaderDashboard />
            </AdminRouteSingle>
          }
        />

        {/* Content Management (shared by superadmin + leader) */}
        <Route
          path="/admin/events"
          element={
            <AdminRoute>
              <AdminEvents />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/news"
          element={
            <AdminRoute>
              <AdminNews />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <AdminRoute>
              <AdminGallery />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/documents"
          element={
            <AdminRoute>
              <AdminDocuments />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/alumni"
          element={
            <AdminRoute>
              <AdminAlumni />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/opportunities"
          element={
            <AdminRoute>
              <AdminOpportunities />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/contact"
          element={
            <AdminRoute>
              <AdminContact />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <SuperAdminRoute>
              <AdminStudents />
            </SuperAdminRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
