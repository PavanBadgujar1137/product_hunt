export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem('token');
    if (token) {
      // Go back if possible, otherwise go to home
      if (window.history.length > 1) {
        return navigateTo(from.fullPath !== to.fullPath ? from.fullPath : '/');
      } else {
        return navigateTo('/');
      }
    }
  }
});