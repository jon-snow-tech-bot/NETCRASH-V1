const config = require('../config');
const { cmd } = require('../command');

cmd({
  pattern: "about",
  alias: ["dev"],
  react: "☯️",
  desc: "Get developer and bot information",
  category: "main",
  filename: __filename
}, async (conn, mek, m, {
  from, pushname, reply
}) => {
  try {
    const caption = `
┏━━━━━━━━━━━━━━━━━━━┓
┃   👋 Hello ${pushname || 'User'}!   ┃
┗━━━━━━━━━━━━━━━━━━━┛

╔══════════════════════╗
║    👑 𝗢𝘄𝗻𝗲𝗿 𝗜𝗻𝗳𝗼    ║
╚══════════════════════╝
• 🧑‍💻 Creator: *JON TECH*
• 🆔 Real Name: *CHRIST*
• ✨ Nickname: *VAVA*
• 🎂 Age: *not found*
• 🌍 City: *Unknown*
• ❤️ Passion: *WhatsApp Dev*

╔══════════════════════╗
║     🚀 𝗣𝗿𝗼𝗷𝗲𝗰𝘁      ║
╚══════════════════════╝
*NETCRASH-V1 SNOW-MD*

╔══════════════════════╗
║  👨‍💻 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿𝘀   ║
╚══════════════════════╝
• 👑 JON-SNOW  
• 🍷 Inconnu Boy  
• 🖤 Only 2 Devs

© 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 JON TECH
`.trim();

    await conn.sendMessage(from, {
      image: { url: 'https://files.catbox.moe/8wlxxl.jpg' },
      caption,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363400596152474@newsletter',
          newsletterName: 'NETCRASH-V1',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

  } catch (e) {
    console.error("❌ Error in .about command:", e);
    return reply(`❌ Error: ${e.message || e}`);
  }
});
