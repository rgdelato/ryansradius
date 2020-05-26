import createAuth0Client from "@auth0/auth0-spa-js";

let auth0;

export const silentAuth = async () => {
  auth0 = await createAuth0Client({
    domain: process.env.AUTH0_DOMAIN,
    client_id: process.env.AUTH0_CLIENTID,
    redirect_uri: process.env.AUTH0_CALLBACK,
    cacheLocation: "localstorage",
  });

  return auth0;
};

export const isAuthenticated = async () => {
  return await auth0.isAuthenticated();
};

export const login = async () => {
  await auth0.loginWithRedirect({ redirect_uri: process.env.AUTH0_CALLBACK });
};

export const getToken = async () => {
  const claims = await auth0.getIdTokenClaims();
  return claims.__raw;
};

export const getProfile = async () => {
  const user = await auth0.getUser();
  return user;
};

export const logout = async () => {
  auth0.logout({
    returnTo: process.env.AUTH0_LOGOUT,
  });
};
