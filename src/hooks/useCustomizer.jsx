import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_WP_BASEURL;

const useCustomizer = () => {
  const [bgColor, setBgColor] = useState('');
  const [fontFamily, setFontFamily] = useState('');
  const [navColour, setNavColour] = useState('');
  const [mobileMenu, setMobileMenu] = useState('');
  
  useEffect(() => {
    axios
      .get(`${baseUrl}wp-json/custom-theme/v1/customizer-settings`)
      .then((response) => {
        const { backgroundColor, fontFamily, navbarColor, mobileMenu} = response.data;
        setBgColor(backgroundColor);
        setFontFamily(fontFamily);
        setNavColour(navbarColor);
        setMobileMenu(mobileMenu);
      })
      .catch((error) => {
        console.error('Error fetching customizer settings:', error);
      });
  }, [baseUrl]);

  return {bgColor, fontFamily, navColour, mobileMenu};
};

export default useCustomizer;