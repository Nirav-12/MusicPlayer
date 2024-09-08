import React, {createContext, useState, useEffect} from 'react';
// import {supabase} from '../../lib/supabase';

const AuthContext = createContext({});

const AuthProvider = props => {
  // user null = loading
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //     setUser(session ? true : false);
  //   });

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //     setUser(session ? true : false);
  //   });

  //   return () => {
  //     subscription?.unsubscribe();
  //   };
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
