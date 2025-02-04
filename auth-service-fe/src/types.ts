// Type definitions
export type AuthError = {
  message: string;
  field?: string;
};
export type Page = 'signin' | 'signup' | 'app';
export type ApplicationPageProps = {
  userName: string | null;
};
