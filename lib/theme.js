// localStorage key for the reader's light/dark pick.
export const THEME_STORAGE_KEY = 'theme';

// Runs in <head> before first paint, so a saved pick applies without flashing the other theme.
export const themeInitScript = `try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;
