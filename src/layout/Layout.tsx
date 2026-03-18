import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />

      <main className="flex-grow p-6">
        <div className="mx-auto flex max-w-7xl gap-6">
          <section className="flex-1">
            <Outlet />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
