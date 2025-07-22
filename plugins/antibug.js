const { cmd } = require('../command');
const fs = require('fs');

// Chemen fichye pou sove eta antibug la
const dbPath = './data/antibug.json';

// Chaje oswa inisyalize
let antiBugOn = fs.existsSync(dbPath)
  ? JSON.parse(fs.readFileSync(dbPath)).enabled
  : false;

// Sovgade eta
function saveAntiBugState(on) {
  fs.writeFileSync(dbPath, JSON.stringify({ enabled: on }, null, 2));
  antiBugOn = on;
}

// Regex pou detekte Unicode sispèk
const isBugUnicode = (text) => /[\u200B-\u200F\u061C\u180E\u2060-\u206F]/.test(text);

// ✳️ Command pou aktive/dezaktive
cmd({
  pattern: "antibug ?(.*)",
  desc: "Aktive / Dezaktive AntiBug global",
  category: "spam",
  react: "🛡️",
  filename: __filename,
}, async (conn, m, { arg, reply }) => {
  const input = (arg || "").toLowerCase();
  if (input === "on") {
    saveAntiBugState(true);
    return await reply("✅ *AntiBug Active!*\nUnicode sispèk ap efase + sanksyon.");
  } else if (input === "off") {
    saveAntiBugState(false);
    return await reply("🚫 *AntiBug Dezaktive.*");
  } else {
    return await reply(`🛡️ *AntiBug Status:* ${antiBugOn ? "ON ✅" : "OFF ❌"}\n\nUse *.antibug on* or *.antibug off*`);
  }
});

// 📥 Global listener — aktif si antibug la sou
cmd({
  pattern: ".*",
  fromMe: false,
  dontAddCommandList: true,
  filename: __filename,
}, async (conn, m, { next }) => {
  if (!m || !m.body || !antiBugOn) return await next();

  if (isBugUnicode(m.body)) {
    try {
      await conn.sendMessage(m.chat, { delete: m.key });
    } catch {}

    if (m.isGroup) {
      try {
        await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      } catch (e) {
        await conn.sendMessage(m.chat, {
          text: `🚫 *Unicode Bug Blocked!*\nUser couldn't be kicked (maybe admin).`,
          quoted: m
        });
      }
    } else {
      try {
        await conn.updateBlockStatus(m.sender, "block");
        await conn.sendMessage(m.chat, {
          text: "🚫 *Unicode Bug Blocked!*\nYou’ve been blocked for suspicious characters.",
        });
      } catch {}
    }
    return;
  }

  return await next();
});
