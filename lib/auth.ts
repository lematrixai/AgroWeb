let isAuthenticated = false

export async function checkAdminAuth(): Promise<boolean> {
  // In a real application, you would check if the user is authenticated
  // For demo purposes, we'll return a mock value
  return isAuthenticated
}

export async function loginAdmin(email: string, password: string): Promise<boolean> {
  // In a real application, you would validate credentials against a database
  // For demo purposes, we'll use a simple check
  if (email === "admin@example.com" && password === "password") {
    isAuthenticated = true
    return true
  }

  return false
}

export async function logoutAdmin(): Promise<void> {
  isAuthenticated = false
}
