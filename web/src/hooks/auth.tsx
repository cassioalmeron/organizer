import React, { createContext, useCallback, useContext, useState } from 'react';
import jwt from 'jsonwebtoken';
import { toast } from 'material-react-toastify';
import { firebase, auth } from '../services/firebase';
import { AuthState, getAuth, removeAuth, setAuth } from '../utils/storage';
import { ApiCallback, apiPost } from '../services/api';

type Credentials = {
  name?: string;
  email: string;
  socialId?: string;
};

interface IAuthContextData {
  auth: AuthState | undefined;
  signInWithGoogle: (callback: ApiCallback) => Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState | undefined>(() => {
    return getAuth();
  });

  const signOut = useCallback(() => {
    removeAuth();
    setData(undefined);
  }, []);

  const post = useCallback(
    async (socialToken: string, callback: ApiCallback) => {
      await apiPost(
        'session',
        { token: socialToken },
        {
          then: response => {
            const { token, user } = response;
            const authentication = { token, user };
            setAuth(authentication);
            setData(authentication);
            callback.then({});
          },
          finally: callback.finally,
        },
      );
    },
    [],
  );

  const signInWithGoogle = useCallback(
    async (callback: ApiCallback) => {
      const provider = new firebase.auth.GoogleAuthProvider();

      try {
        const result = await auth.signInWithPopup(provider);

        if (result.user) {
          const { displayName, email, uid } = result.user;

          if (!displayName)
            throw new Error('Missing information from Google Account.');

          const credentials = {
            name: displayName,
            email,
            socialId: uid,
          } as Credentials;

          const socialToken = createToken(credentials);

          await post(socialToken, callback);
        }
      } catch (err: any) {
        if (err.code === 'auth/account-exists-with-different-credential') {
          const { email } = err;

          const credentials = {
            email,
          } as Credentials;

          const socialToken = createToken(credentials);

          await post(socialToken, callback);
        } else {
          toast.warning('No selected account!');
        }
      } finally {
        if (callback.finally) callback.finally();
      }
    },
    [post],
  );

  return (
    <AuthContext.Provider
      value={{
        auth: data,
        signOut,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}

function createToken(credentials: Credentials): string {
  const socialToken = jwt.sign(
    credentials,
    process.env.REACT_APP_SOCIAL_KEY || '',
    {
      expiresIn: '1m',
    },
  );

  return socialToken;
}
