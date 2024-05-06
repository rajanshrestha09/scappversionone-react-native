import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import type {RootState} from '../store/store';
import AppStack from './AppStack';
import {login, logout} from '../store/authSlice';
import AuthStack from './AuthStack';
import appwrite from '../appwrite/appWrite';

export default function Router() {
  const [localStatus, setLocalStatus] = useState<boolean>(false);
  const {status} = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
     appwrite
      .getCurrentUser()
      .then((user: any) => {
        if (user) {
          console.log('Response :: Router.tsx :: => ::', user);
          dispatch(login({user}));
          setLocalStatus(true);
        } else {
          dispatch(logout());
          setLocalStatus(false);
        }
      })
      .catch((e: any) => {
        console.log('Error :: Router.tsx :: => ::', e);
        dispatch(logout());
        setLocalStatus(false);
      });
  }, [status]);

  return (
    <NavigationContainer>
      {localStatus ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
