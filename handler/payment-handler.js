bot.ev.on("messages.upsert", async ({ messages }) => {
  const msg = messages[0];
  if (!msg?.message?.buttonsResponseMessage) return;

  const buttonId = msg.message.buttonsResponseMessage.selectedButtonId;

  if (buttonId === "btn_contactowner") {
    await bot.sendMessage(msg.key.remoteJid, {
      text: `📞 *Contact Owner:* wa.me/50949100359`
    }, { quoted: msg });
  }

  if (buttonId === "btn_sendproof") {
    await bot.sendMessage(msg.key.remoteJid, {
      text: `📤 Please send a screenshot of your payment here.\nWe will verify it shortly. ✅`
    }, { quoted: msg });
  }
});
