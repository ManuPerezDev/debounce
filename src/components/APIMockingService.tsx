'use client';
import { useEffect } from 'react';

export const APIMockingService = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('APIMockingService')
      require('../mocks');
    }
  }, []);

  return null;
};
