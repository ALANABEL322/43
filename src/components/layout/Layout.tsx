import { useAuthStore } from '@/store/authStore';
import Navbar from '@/components/header/Navbar';
import SidebarAdmin from '../header/sidebarAdmin';
import SidebarAdminMobile from '../header/sidebarAdminMobile';
import SidebarUser from '../header/sidebarUser';
import SidebarUserMobile from '../header/sidebarUserMobile';
import Footer from '../footer';
import Container from '@/components/ui/Container';
import { useFooterProximity } from '@/hooks/useFooterProximity';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, isAuthenticated } = useAuthStore();
  const isMobile = window.innerWidth < 768;
  const isFooterNear = useFooterProximity();

  return (
    <>
      {isAuthenticated && <Navbar />}
      
      <Container>
        <div className="flex-1 flex">
          {user?.role === 'admin' && (
            <>
              {isMobile && !isFooterNear ? (
                <SidebarAdminMobile />
              ) : (
                <SidebarAdmin />
              )}
            </>
          )}
          {user?.role === 'user' && (
            <>
              {isMobile && !isFooterNear ? (
                <SidebarUserMobile />
              ) : (
                <SidebarUser />
              )}
            </>
          )}
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
        <Footer />
      </Container>
    </>
  );
}
