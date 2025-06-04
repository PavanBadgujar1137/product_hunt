export const useAuth = () => {
  const isAuthenticated = useState("isAuthenticated", () => false);
  const userRole = useState("userRole", () => null);
  const userId = useState("userId", () => null);

  const setAuth = (data) => {
    isAuthenticated.value = true;
    userRole.value = data.role;
    userId.value = data._id;
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("userId", data._id);
  };

  const clearAuth = () => {
    isAuthenticated.value = false;
    userRole.value = null;
    userId.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  };

  const initAuth = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const id = localStorage.getItem("userId");

    if (token && role && id) {
      isAuthenticated.value = true;
      userRole.value = role;
      userId.value = id;
    }
  };

  return {
    isAuthenticated,
    userRole,
    userId,
    setAuth,
    clearAuth,
    initAuth,
  };
};
