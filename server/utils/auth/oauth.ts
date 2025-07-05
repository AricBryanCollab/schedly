import axios from "axios";

export interface UserInfo<T> {
  email: T;
  username: T;
  profilePic: T;
}

const handleGoogleProvider = async (
  accessToken: string
): Promise<UserInfo<string>> => {
  try {
    const googleUrl = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`;
    const { data } = await axios.get(googleUrl);
    return {
      email: data.email,
      username: data.name,
      profilePic: data.picture,
    };
  } catch (error) {
    throw new Error("Failed to handle google access token ");
  }
};

const handleGithubProvider = async (
  accessToken: string
): Promise<UserInfo<string>> => {
  try {
    const { data: user } = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { data: emails } = await axios.get(
      "https://api.github.com/user/emails",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const primaryEmail = emails.find((email: any) => email.primary)?.email;

    return {
      email: primaryEmail || "",
      username: user.login,
      profilePic: user.avatar_url,
    };
  } catch (error) {
    throw new Error("Failed to handle GitHub access token");
  }
};

export { handleGithubProvider, handleGoogleProvider };
