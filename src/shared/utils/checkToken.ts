const checkToken = (): boolean => {
  const token_expires_at = localStorage.getItem("token_expires_at");
  if (token_expires_at) {
    const expireAt = new Date(token_expires_at).getTime();
    const isExpired = expireAt - new Date().getTime() <= 0;
    return !isExpired;
  }
  return false;
};

export default checkToken;
