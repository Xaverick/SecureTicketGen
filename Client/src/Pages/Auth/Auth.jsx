import React, { useState, useEffect } from 'react';
import FormComponent1 from '../../components/auth/FormComponent1';
import FormComponent2 from '../../components/auth/FormComponent2';

const Auth = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {screenWidth > 730 ? (
        <>
          {/* Responsive forms for screen width greater than 730px */}
          <FormComponent1 />
        </>
      ) : (
        <>
          {/* Regular forms for screen width less than or equal to 730px */}
          <FormComponent2 />
        </>
      )}
    </div>
  );
};

export default Auth;
