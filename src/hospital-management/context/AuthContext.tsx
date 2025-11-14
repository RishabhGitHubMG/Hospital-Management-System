import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 
  | 'patient'
  | 'doctor'
  | 'nurse'
  | 'lab_technician'
  | 'pharmacist'
  | 'receptionist'
  | 'billing'
  | 'administrator';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('hospital_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('hospital_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Find matching user from mock data
      const mockUsers: Record<string, User> = {
        'admin@hospital.com': {
          id: '1',
          email: 'admin@hospital.com',
          name: 'Admin User',
          role: 'administrator',
          department: 'Administration',
          avatar: '👨‍💼',
        },
        'doctor@hospital.com': {
          id: '2',
          email: 'doctor@hospital.com',
          name: 'Dr. John Smith',
          role: 'doctor',
          department: 'General Medicine',
          avatar: '👨‍⚕️',
        },
        'nurse@hospital.com': {
          id: '3',
          email: 'nurse@hospital.com',
          name: 'Sarah Johnson',
          role: 'nurse',
          department: 'Emergency Ward',
          avatar: '👩‍⚕️',
        },
        'lab@hospital.com': {
          id: '4',
          email: 'lab@hospital.com',
          name: 'Michael Brown',
          role: 'lab_technician',
          department: 'Laboratory',
          avatar: '🔬',
        },
        'pharmacist@hospital.com': {
          id: '5',
          email: 'pharmacist@hospital.com',
          name: 'Emma Wilson',
          role: 'pharmacist',
          department: 'Pharmacy',
          avatar: '💊',
        },
        'receptionist@hospital.com': {
          id: '6',
          email: 'receptionist@hospital.com',
          name: 'Lisa Anderson',
          role: 'receptionist',
          department: 'Front Desk',
          avatar: '👩‍💼',
        },
        'billing@hospital.com': {
          id: '7',
          email: 'billing@hospital.com',
          name: 'Robert Davis',
          role: 'billing',
          department: 'Finance',
          avatar: '💰',
        },
        'patient@hospital.com': {
          id: '8',
          email: 'patient@hospital.com',
          name: 'James Patient',
          role: 'patient',
          department: 'Patient',
          avatar: '👤',
        },
      };

      const foundUser = mockUsers[email];

      if (foundUser && password) {
        localStorage.setItem('hospital_user', JSON.stringify(foundUser));
        setUser(foundUser);
      } else {
        setError('Invalid email or password');
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('hospital_user');
    localStorage.removeItem('hospital_auth');
    setUser(null);
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
