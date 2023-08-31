export const host = import.meta.env.VITE_SERVER_URL;

export const registerRoute = `${host}api/auth/register`;
export const loginRoute = `${host}api/auth/login`;
export const allContactsRoute = `${host}api/auth/allusers`;
export const sendMessageRoute = `${host}api/messages/addmsg`;
export const getMessageRoute = `${host}api/messages/getmsg`;
