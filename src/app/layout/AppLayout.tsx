//Layout de la pagina todo lo que esta detras el fonco etc y se arma con el Header y Footer que armamos
//Y basicamente lo que definira que es lo que traera cada vista como su header y footer en todas als vistas
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default AppLayout;
