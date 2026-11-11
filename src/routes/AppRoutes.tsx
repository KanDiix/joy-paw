import { Route, Routes } from 'react-router';
import { Layout } from 'components/Layout/Layout';
import { AboutPage } from 'components/Pages/About/AboutPage';
import { NotFoundPage } from 'components/Pages/Errors/NotFoundPage';
import { HomePage } from 'components/Pages/Home/HomePage';
import { RoutePatterns } from 'routes/RoutePaths';

export const AppRoutes = () => (
    <Routes>
        <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={RoutePatterns.about} element={<AboutPage />} />
            <Route path={RoutePatterns.notFound} element={<NotFoundPage />} />
        </Route>
    </Routes>
);
