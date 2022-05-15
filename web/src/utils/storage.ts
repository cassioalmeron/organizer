export type AuthState = {
  token: string;
  user: {
    name: string;
    email: string;
  };
};

const localStorageAuthKey = '@Organizer:auth';

export function setAuth(auth: AuthState): void {
  localStorage.setItem(localStorageAuthKey, JSON.stringify(auth));
}

export function removeAuth(): void {
  localStorage.removeItem(localStorageAuthKey);
}

export function getAuth(): AuthState | undefined {
  const authJson = localStorage.getItem(localStorageAuthKey);
  if (!authJson) return undefined;

  let auth = {};
  if (authJson) auth = JSON.parse(authJson);

  return auth as AuthState;
}
