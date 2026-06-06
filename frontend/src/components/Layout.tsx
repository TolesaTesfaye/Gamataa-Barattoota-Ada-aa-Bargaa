import { useState, useEffect, useRef } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useLanguage, type TranslationKey } from "../i18n/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import apiClient from "../services/api";
import Footer from "./Footer";

export default function Layout() {
  const { user, token, logout } = useAuthStore();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) return stored === "true";
      return true;
    }
    return true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (user && token) {
      apiClient
        .get("/notifications/unread-count")
        .then((res) => setUnreadCount(res.data.unreadCount || 0))
        .catch(() => {});
      apiClient
        .get("/auth/me")
        .then((res) => {
          if (res.data.role !== user.role) {
            apiClient.post("/auth/refresh-token").then((refreshRes) => {
              localStorage.setItem("token", refreshRes.data.token);
              localStorage.setItem(
                "user",
                JSON.stringify(refreshRes.data.user),
              );
              window.location.reload();
            });
          }
        })
        .catch(() => {});
    }
  }, [user, token]);

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-primary"
      : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary";

  const dropdowns = [
    {
      label: t("nav.dabalata"),
      items: [
        { to: "/waaee", label: t("nav.waaee") },
        { to: "/about", label: t("nav.about") },
        { to: "/leadership", label: t("nav.leadership") },
        { to: "/faqs", label: t("nav.faqs") },
        { to: "/service", label: t("nav.service") },
      ],
    },
    {
      label: t("nav.hawaasa"),
      items: [
        { to: "/members", label: t("nav.members") },
        { to: "/gallery", label: t("nav.gallery") },
        { to: "/alumni", label: t("nav.alumni") },
      ],
    },
    {
      label: t("nav.qabeenya"),
      items: [
        { to: "/documents", label: t("nav.documents") },
        { to: "/resources", label: t("nav.resources") },
        { to: "/opportunities", label: t("nav.opportunities") },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
              <Link to="/" className="flex items-center gap-2 shrink-0">
                <img
                  src="/asset/Picture1.png"
                  alt="GBAABW logo"
                  className="h-10 w-auto rounded-full"
                />
              </Link>

              <div className="hidden lg:flex items-center gap-1">
                {dropdowns.map((dd) => (
                  <div key={dd.label} className="relative group">
                    <button
                      type="button"
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                    >
                      {dd.label}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div className="absolute left-0 top-full mt-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                      {dd.items.map((item) => (
                        <button
                          key={item.to}
                          type="button"
                          onClick={() => navigate(item.to)}
                          className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                            location.pathname === item.to
                              ? "text-primary bg-blue-50 dark:bg-blue-900/20"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <Link
                  to="/events"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive("/events")}`}
                >
                  {t("nav.events")}
                </Link>
                <Link
                  to="/news"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive("/news")}`}
                >
                  {t("nav.news")}
                </Link>
                {user?.role === "superadmin" && (
                  <Link
                    to="/superadmin/dashboard"
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      location.pathname.startsWith("/superadmin")
                        ? "text-primary"
                        : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                    }`}
                  >
                    {t("nav.superadmin")}
                  </Link>
                )}
                {user?.role === "admin" && (
                  <Link
                    to="/admin/dashboard"
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      location.pathname.startsWith("/admin")
                        ? "text-primary"
                        : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                    }`}
                  >
                    {t("nav.admin")}
                  </Link>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <LanguageToggle />
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>

              <div className="flex items-center gap-2">
                {user ? (
                  <UserDropdown
                    user={user}
                    unreadCount={unreadCount}
                    logout={logout}
                    t={t}
                  />
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-2 py-1.5 text-xs sm:text-sm font-medium transition-colors"
                    >
                      {t("nav.login")}
                    </Link>
                    <Link
                      to="/register"
                      className="bg-primary text-white px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-medium hover:bg-secondary transition-colors"
                    >
                      {t("nav.register")}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <MobileMenu
              user={user}
              dropdowns={dropdowns}
              logout={logout}
              closeMenu={() => setMobileMenuOpen(false)}
              t={t}
            />
          </>
        )}
      </nav>

      <main className="flex-1 w-full pt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

function useClickOutside<T extends HTMLElement>(handler: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [handler]);
  return ref;
}

function UserDropdown({
  user,
  unreadCount,
  logout,
  t,
}: {
  user: { firstName: string; lastName: string; role: string };
  unreadCount: number;
  logout: () => void;
  t: (key: TranslationKey) => string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors rounded-md"
      >
        <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
          {user.firstName[0]}
          {user.lastName[0]}
        </div>
        <span className="hidden xl:inline">
          {user.firstName} {user.lastName}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 w-52 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          <Link
            to={
              user?.role === "superadmin"
                ? "/superadmin/dashboard"
                : user?.role === "admin"
                  ? "/admin/dashboard"
                  : "/dashboard"
            }
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {t("nav.user.dashboard")}
          </Link>
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {t("nav.user.profile")}
          </Link>
          <Link
            to="/my-events"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {t("nav.user.myEvents")}
          </Link>
          <Link
            to="/notifications"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {t("nav.user.notifications")}
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </Link>
          <hr className="my-1 border-gray-200 dark:border-gray-700" />
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            {t("nav.user.logout")}
          </button>
        </div>
      )}
    </div>
  );
}

function MobileMenu({
  user,
  dropdowns,
  logout,
  closeMenu,
  t,
}: {
  user: { firstName: string; lastName: string; role: string } | null;
  dropdowns: { label: string; items: { to: string; label: string }[] }[];
  logout: () => void;
  closeMenu: () => void;
  t: (key: TranslationKey) => string;
}) {
  const location = useLocation();

  const dashboardPath =
    user?.role === "superadmin"
      ? "/superadmin/dashboard"
      : user?.role === "admin"
        ? "/admin/dashboard"
        : "/dashboard";

  const linkClass = (path: string) =>
    `flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg transition-colors ${
      location.pathname === path ||
      (path !== "/" && location.pathname.startsWith(path))
        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  const sectionHeadingClass =
    "px-3 pt-4 pb-0.5 text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest";

  return (
    <div className="fixed inset-y-0 left-0 w-64 max-w-[75vw] z-50 lg:hidden bg-white dark:bg-gray-900 shadow-2xl flex flex-col animate-slide-in-left">
      <div className="flex items-center justify-between px-3 h-12 border-b border-gray-200 dark:border-gray-700 shrink-0">
        <img
          src="/asset/Picture1.png"
          alt="GBAABW"
          className="h-7 w-7 rounded-full"
        />
        <button
          onClick={closeMenu}
          className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-1.5 px-2 space-y-0.5">
        {user && (
          <>
            <div className="px-3 py-2 flex items-center gap-2.5 border-b border-gray-100 dark:border-gray-800 mb-1.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                {user.firstName[0]}
                {user.lastName[0]}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 capitalize">
                  {user.role}
                </p>
              </div>
            </div>

            <Link
              to={dashboardPath}
              onClick={closeMenu}
              className={linkClass(dashboardPath)}
            >
              <svg
                className="w-4 h-4 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {t("mobile.dashboard")}
            </Link>

            {user?.role === "superadmin" && (
              <Link
                to="/superadmin/users"
                onClick={closeMenu}
                className={linkClass("/superadmin")}
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
                {t("mobile.userManagement")}
              </Link>
            )}

            <hr className="my-2 border-gray-100 dark:border-gray-800" />
          </>
        )}

        <Link to="/events" onClick={closeMenu} className={linkClass("/events")}>
          <svg
            className="w-4 h-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {t("mobile.events")}
        </Link>
        <Link to="/news" onClick={closeMenu} className={linkClass("/news")}>
          <svg
            className="w-4 h-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
          {t("mobile.news")}
        </Link>

        {dropdowns.map((group) => (
          <div key={group.label}>
            <p className={sectionHeadingClass}>{group.label}</p>
            {group.items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={linkClass(item.to)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 p-3 shrink-0">
        {user ? (
          <button
            onClick={() => {
              closeMenu();
              logout();
            }}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            {t("mobile.logout")}
          </button>
        ) : (
          <div className="flex flex-col gap-1.5">
            <Link
              to="/login"
              onClick={closeMenu}
              className="w-full text-center px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {t("mobile.login")}
            </Link>
            <Link
              to="/register"
              onClick={closeMenu}
              className="w-full text-center px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-colors"
            >
              {t("mobile.register")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
