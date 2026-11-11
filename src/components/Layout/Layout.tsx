import { Outlet } from 'react-router';
import { Header } from 'components/Layout/Header';

export const Layout = () => (
    <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="container-xl flex-grow-1 py-4">
            <Outlet />
        </main>
    </div>
);
