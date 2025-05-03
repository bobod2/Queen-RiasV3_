const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "kaka",
    ownerNumber: process.env.OWNER_NUMBER || "233500834070",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0lJZzExbC9Dc09SSVNIeWVEUzBMQ2c1QnRwenpSL09UL29iT1JxZkJXdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMHgwRmdPbHRUZE52VnM2SjRWOVdhOGI4UXlHSDlhY0xEYmF6MGhleHlTND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJQkt2bCszSCtNTEpORjNLTmtLcDFyUThCdkc4NE5pYkE2b0o4NmdWUzFzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHaXl0dFRGSDZmRXNrNGEraFBGUEcxYXZZaFByNng2eGo1WlhVUWR2ZlZBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1DYVJRc05nMTFHMm02ZXBaemhUTFBQUC93bUtzVEpaU1NCZFlEdnY5RU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtKc0RWU3hNejlFRzZtNXNaYkZKNzB2V1N1ZG1oUmU1NTcvQ2RmYXdFa1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUhJRE4xSklsNFZpdEdvK2V1VmgrTGtqMXlQRW0vWnNPSmMvNy85ZExGTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUxaSWxUaUVQbjViQWtpeUh4TUVLaWhZSjlBcGZabjdpSzFiZ29ITkFCUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1LbVIvOXlkbkdJemNBWEljWTBXaFRORHYvdWJvYys2Um85cENKUFNoR3Mya1Rsbi9YSFhHWVpTUlUvQ1E4cHhWYlpnay9MZk1WdUxGQjYwMXhrMmdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ1LCJhZHZTZWNyZXRLZXkiOiI3MUZMQ2hTdjlKdmZPYUcxbTJuZW1mMG5sa1lYUmRMNiszbVpibjk3U3pJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJQMlhUSENDNSIsIm1lIjp7ImlkIjoiMjMzNTAwODM0MDcwOjZAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxNTkzODI0NzgzMDMyMzg6NkBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05tZGtQRUNFSzY2MmNBR0dBWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ikg0WVI1emhGZmtoYTMxdi85a0hmeURFalpMSHpoSUVwQXZJK1B4VlVuRTg9IiwiYWNjb3VudFNpZ25hdHVyZSI6IktST0prZnB4REEyck8xNkQ2cmhycENRSmNVbTFCdDFDOGVFK1VmQ0RTN2pkMWZnRytPYmsvcGFCSW9EWWFvdzdxNTFlZFlvdlQrcGpIL0NEVTk1bER3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJQVmw5bUgzOVZ6Q0FDQjJtckZsM0ZBYzdhbzZKSlQxTTB3TDd4dE4ydXhsR1ErRFNURk9PNFNqTXJOeDAwTmJiUUEzU3VkdFVmeTRvS2d2NkQwVGlpQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzUwMDgzNDA3MDo2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlIrR0VlYzRSWDVJV3Q5Yi8vWkIzOGd4STJTeDg0U0JLUUx5UGo4VlZKeFAifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NjI5NjEyNCwibGFzdFByb3BIYXNoIjoiM2dQVUprIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGQzQifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id',    
    menuType: process.env.MENU_TYPE || 2  // 1 = Image, 2 = Video
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
