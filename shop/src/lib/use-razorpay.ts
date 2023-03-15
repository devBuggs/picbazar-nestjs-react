import { useCallback, useMemo } from 'react';

interface RazorpaySuccessHandlerArgs {
  razorpay_signature: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
}

export interface RazorpayOptions {
  key?: string;
  amount: string;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  handler?: (args: RazorpaySuccessHandlerArgs) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
    method?: 'card' | 'netbanking' | 'wallet' | 'emi' | 'upi';
  };
  notes?: {};
  theme?: {
    hide_topbar?: boolean;
    color?: string;
    backdrop_color?: string;
  };
  modal?: {
    backdropclose?: boolean;
    escape?: boolean;
    handleback?: boolean;
    confirm_close?: boolean;
    ondismiss?: Function;
    animation?: boolean;
  };
  subscription_id?: string;
  subscription_card_change?: boolean;
  recurring?: boolean;
  callback_url?: string;
  redirect?: boolean;
  customer_id?: string;
  timeout?: number;
  remember_customer?: boolean;
  readonly?: {
    contact?: boolean;
    email?: boolean;
    name?: boolean;
  };
  hidden?: {
    contact?: boolean;
    email?: boolean;
  };
  send_sms_hash?: boolean;
  allow_rotation?: boolean;
  retry?: {
    enabled?: boolean;
    max_count?: boolean;
  };
  config?: {
    display: {
      language: 'en' | 'ben' | 'hi' | 'mar' | 'guj' | 'tam' | 'tel';
    };
  };
}

const useRazorpay = () => {
  /* Constants */
  const RAZORPAY_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';

  const isClient = useMemo(() => typeof window !== 'undefined', []);

  const checkScriptLoaded: () => boolean = useCallback(() => {
    if (!isClient || !('Razorpay' in window)) return false;
    return true;
  }, []);

  const loadRazorpayScript = useCallback(() => {
    if (!isClient) return; // Don't execute this function if it's rendering on server side
    return new Promise((resolve, reject) => {
      const scriptTag = document.createElement('script');
      scriptTag.src = RAZORPAY_SCRIPT;
      scriptTag.onload = (ev) => resolve(ev);
      scriptTag.onerror = (err) => reject(err);
      document.body.appendChild(scriptTag);
    });
  }, []);

  return { checkScriptLoaded, loadRazorpayScript };
};

export default useRazorpay;
