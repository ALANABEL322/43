export interface UserViewsData {
    newUsers: number[]
    existingUsers: number[]
    labels: string[]
  }
  
  export interface WebUsageData {
    averageTime: string
    growthPercentage: number
    data: number[]
    labels: string[]
  }
  
  export interface MonthlyUsersData {
    data: number[]
    labels: string[]
    colors: string[]
  }
  
  export interface UserRole {
    name: string
    value: number
    color: string
  }
  
  export interface MetricsData {
    userViews: UserViewsData
    webUsage: WebUsageData
    monthlyUsers: MonthlyUsersData
    userRoles: UserRole[]
  }
  
  