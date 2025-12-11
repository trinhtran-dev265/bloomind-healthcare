// src/auth/LoginWithGoogle.tsx
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import Constants from "expo-constants";

import { auth } from "./firebaseConfig"; // chỉnh path nếu cần
import {
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_EXPO_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
} from "@env";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleLogin(onSuccess?: () => void, onError?: (err: any) => void) {
  const [loading, setLoading] = useState(false);

  // detect Expo Go vs standalone
  const isExpoGo = Constants.appOwnership === "expo";
  const useProxy = isExpoGo;

  // expo proxy redirect string (copy đúng @username/slug)
  const expoRedirect = "https://auth.expo.io/@trinhtran.dev/Bloomind-heathcare";

  // build redirectUri as string (avoid passing object with useProxy directly)
  const redirectUri: string = useProxy ? expoRedirect : makeRedirectUri({ useProxy: false });

  // scopes as mutable array (string[]) to satisfy types
  const scopes: string[] = ["openid", "profile", "email"];

  // build config typed as Google.GoogleAuthRequestConfig (we augmented the types)
  const config: Google.GoogleAuthRequestConfig = {
    clientId: GOOGLE_WEB_CLIENT_ID,
    redirectUri,
    scopes,
    responseType: "id_token",
    // only include native client ids for standalone builds
    ...(useProxy ? { expoClientId: GOOGLE_EXPO_CLIENT_ID } : {}),
    ...(!useProxy && GOOGLE_ANDROID_CLIENT_ID ? { androidClientId: GOOGLE_ANDROID_CLIENT_ID } : {}),
    ...(!useProxy && GOOGLE_IOS_CLIENT_ID ? { iosClientId: GOOGLE_IOS_CLIENT_ID } : {}),
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  useEffect(() => {
    if (request) {
      // debug
      // @ts-ignore debug
      console.log("DEBUG request.url =", (request as any).url);
      // @ts-ignore debug
      console.log("DEBUG request.redirectUri =", (request as any).redirectUri);
    }
  }, [request]);

  useEffect(() => {
    console.log("DEBUG auth response:", response);
    if (!response) return;

    if (response.type === "success") {
      const params = response.params as Record<string, string | undefined>;
      const id_token = params.id_token;
      if (!id_token) {
        onError?.(new Error("Missing id_token from Google response"));
        return;
      }

      setLoading(true);
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => onSuccess?.())
        .catch((err) => onError?.(err))
        .finally(() => setLoading(false));
    } else if (response.type === "error") {
      onError?.(response);
    } else {
      // cancel/dismiss etc.
    }
  }, [response, onError, onSuccess]);

  const startLogin = async () => {
    try {
      const result = await promptAsync();
      console.log("DEBUG promptAsync result:", result);
    } catch (err) {
      onError?.(err);
    }
  };

  return { request, startLogin, loading };
}
