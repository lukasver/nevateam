import { ReactNode } from 'react';
import FooterHomePage from './footer';

const homeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
      {/* <NavBarHomePage /> */}
      <main>{children}</main>
      <FooterHomePage />
    </div>
  );
};

export default homeLayout;
