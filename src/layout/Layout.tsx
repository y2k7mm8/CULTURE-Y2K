import { Outlet } from "react-router-dom";
import CursorTrail from "../components/CursorTrail";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Layout() {
  return (
    <div className="min-h-screen text-white">
      <CursorTrail />
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="page-grid">
          <Sidebar />
          <section className="min-w-0">
            <Outlet />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
