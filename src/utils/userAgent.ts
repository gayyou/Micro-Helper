let ua: string = window.navigator.userAgent.toLowerCase() || '';

export const isMobile: boolean = ua.includes('mobile');
