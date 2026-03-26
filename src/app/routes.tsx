import { createBrowserRouter } from 'react-router';
import Login from './pages/Login';
import CategorySelection from './pages/CategorySelection';
import StationSelection from './pages/StationSelection';
import BarcodeScanner from './pages/BarcodeScanner';
import Checklist from './pages/Checklist';
import Result from './pages/Result';
import Rework from './pages/Rework';
import Dashboard from './pages/Dashboard';
import ItemDetail from './pages/ItemDetail';
import SupervisorEdit from './pages/SupervisorEdit';
import Admin from './pages/Admin';
import Reports from './pages/Reports';
import AuditLog from './pages/AuditLog';
import Help from './pages/Help';
import NotFound from './pages/NotFound';
import { Navigation } from './components/Navigation';

// Wrapper for dashboard pages with navigation
function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/category',
    element: <CategorySelection />,
  },
  {
    path: '/stations',
    element: <StationSelection />,
  },
  {
    path: '/scanner',
    element: <BarcodeScanner />,
  },
  {
    path: '/checklist',
    element: <Checklist />,
  },
  {
    path: '/result',
    element: <Result />,
  },
  {
    path: '/rework',
    element: <Rework />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout><Dashboard /></DashboardLayout>,
  },
  {
    path: '/item/:id',
    element: <DashboardLayout><ItemDetail /></DashboardLayout>,
  },
  {
    path: '/supervisor-edit',
    element: <DashboardLayout><SupervisorEdit /></DashboardLayout>,
  },
  {
    path: '/admin',
    element: <DashboardLayout><Admin /></DashboardLayout>,
  },
  {
    path: '/reports',
    element: <DashboardLayout><Reports /></DashboardLayout>,
  },
  {
    path: '/audit',
    element: <DashboardLayout><AuditLog /></DashboardLayout>,
  },
  {
    path: '/help',
    element: <DashboardLayout><Help /></DashboardLayout>,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);