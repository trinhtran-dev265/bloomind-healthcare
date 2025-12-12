// src/auth/LoginWithGoogle.tsx
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import Constants from "expo-constants";

import { auth } from "./firebaseConfig";

// ENV
import {
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_EXPO_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
} from "@env";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleLogin(
  onSuccess?: () => void,
  onError?: (err: any) => void
) {
  const [loading, setLoading] = useState(false);

  // detect Expo Go
  const isExpoGo = Constants.appOwnership === "expo";
  const useProxy = isExpoGo;

  // Expo Go bắt buộc phải dùng auth.expo.io
  const expoRedirect = "https://auth.expo.io/@trinhtran.dev/Bloomind-heathcare";

  // FIXED: không dùng { useProxy: false } nữa
  const redirectUri: string = useProxy
    ? expoRedirect
    : makeRedirectUri(); // standalone / dev

  // scopes
  const scopes = ["openid", "profile", "email"];

  // Google Auth Config
  const config = {
    clientId: GOOGLE_WEB_CLIENT_ID,
    redirectUri,
    scopes,
    responseType: "id_token",

    // Expo Go → dùng expoClientId
    ...(useProxy ? { expoClientId: GOOGLE_EXPO_CLIENT_ID } : {}),

    // Standalone → dùng client id native
    ...(!useProxy && GOOGLE_ANDROID_CLIENT_ID
      ? { androidClientId: GOOGLE_ANDROID_CLIENT_ID }
      : {}),
    ...(!useProxy && GOOGLE_IOS_CLIENT_ID
      ? { iosClientId: GOOGLE_IOS_CLIENT_ID }
      : {}),
  } satisfies Google.GoogleAuthRequestConfig;

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  // Debug
  useEffect(() => {
    if (request) {
      console.log("DEBUG request.redirectUri =", request.redirectUri);
    }
  }, [request]);

  // Handle Google response
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
    }
  }, [response]);

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
