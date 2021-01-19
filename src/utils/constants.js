export const ANNOUCE_URLS = [
  "wss://tracker.openwebtorrent.com",
  // "wss://tracker.btorrent.xyz",
  // "wss://tracker.fastcast.nz",
  // "wss://tracker.sloppyta.co:443/announce",
];

export const APP_ID = "com.nakuraicodes.p2pairdrop";

export const LOCAL_STORAGE_KEY = {
  USERNAME: APP_ID + ":username",
  PIN: APP_ID + ":pin",
  TOS_ACCEPTED: APP_ID + ":tos_accepted",
  GROUP_NAME: APP_ID + ":groupname",
  GROUP_SAVED: APP_ID + ":groupsaved",
};

export const MSG_TYPE = {
  REQUEST_USERNAME: "REQUEST_USERNAME",
  PROVIDE_USERNAME: "PROVIDE_USERNAME",
  PING: "PING",
  PONG: "PONG",
  PROVIDE_FILE: "PROVIDE_FILE",
};

export const FILE_STATUS = {
  TO_BE_SENT: "TO_BE_SENT",
  ERROR: "ERROR",
  SENT: "SENT",
  RECEIVED: "RECEIVED",
  DOWNLOADED: "DOWNLOADED",
};
