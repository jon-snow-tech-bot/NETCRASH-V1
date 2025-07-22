const { cmd } = require('../command');
const { getAnti, setAnti } = require('../data/antidel');

cmd({
  pattern: "antistatus",
  desc: "Turn on/off anti-status mention (group only)",
  category: "group",
  filename: __filename
}, async (conn, mek, m, { reply, q, isGroup }) => {
  if (!isGroup) {
    return reply("❌ This command only works in groups.");
  }

  const param = q?.toLowerCase();

  if (!param) {
    const status = await getAnti('statusMention');
    return reply(`🛡️ Anti-status mention is currently: ${status ? 'ON' : 'OFF'}`);
  }

  if (param === 'on') {
    await setAnti('statusMention', true);
    return reply("✅ Anti-status mention is now ON for this group.");
  } else if (param === 'off') {
    await setAnti('statusMention', false);
    return reply("❌ Anti-status mention is now OFF for this group.");
  } else {
    return reply("❌ Invalid option. Use: on or off");
  }
});
