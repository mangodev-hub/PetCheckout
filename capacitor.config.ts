import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'petshop-checkout',
  webDir: 'www',
  plugins: {  
    SplashScreen: {
      launchShowDuration: 2500,       
      launchAutoHide: true,           
      backgroundColor: '#fbf9f4',      
      androidSplashResourceName: 'splash', 
      androidScaleType: 'CENTER_CROP',     
      showSpinner: false,              
      splashFullScreen: true,          
      splashImmersive: true
    }
  }
};

export default config;
