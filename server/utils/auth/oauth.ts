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

const handleFacebookProvider = async (
  accessToken: string
): Promise<UserInfo<string>> => {
  try {
    const facebookUrl = `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${accessToken}`;
    const { data } = await axios.get(facebookUrl);
    return {
      email: data.email,
      username: data.name,
      profilePic: data.picture?.data?.url,
    };
  } catch (error) {
    throw new Error("Failed to handle facebook access token ");
  }
};

export { handleFacebookProvider, handleGoogleProvider };
