export const clientIdGoogle =
  "1038289489674-41usljcf84c0lbbtcrnvsccjc57hj4ko.apps.googleusercontent.com";

export const clientSecretGoogle = "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";
export const redirectUrlGoolgle =
  "http://localhost:5173/api/sessions/oauth/google";

export const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?\
response_type=code&\
client_id=${clientIdGoogle}&\
scope=openid%20email&20profile&\
redirect_uri=${redirectUrlGoolgle}&\
state=security_token%3D138r5719ru3e1%26url%3Dhttps%3A%2F%2Foauth2-login-demo.example.com%2FmyHome&\
nonce=${uuidv4()}`;

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}
