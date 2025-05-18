export interface AuthApproval {
  _id: string;
  userId: string;
  appId: string;
  status: 'pending' | 'approved';
  requestedAt: Date;
  approvedAt: Date | null;
}

export interface PendingRequest {
  _id: string;
  email: string;
  appName: string;
  requestedAt: Date;
}