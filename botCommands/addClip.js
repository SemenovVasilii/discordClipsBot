const { postClip } = require('../dbQueries/addClipQueries')
const { SlashCommandBuilder } = require('@discordjs/builders');

const clipBuffer = {};

async function startAddClip(interaction) {
    clipBuffer[interaction.user.id] = { step: 'title', guildId: interaction.guild.id };
    await interaction.reply('Enter the clip title');
}

async function handleAddClipMessage(message) {
    const userBuffer = clipBuffer[message.author.id];
    if (!userBuffer) return;

    if (userBuffer.step === 'title') {
        userBuffer.title = message.content;
        userBuffer.step = 'video';
        await message.reply('Now send the video');
    } else if (userBuffer.step === 'video') {
        if (message.attachments.size > 0 && message.attachments.first().contentType.startsWith('video/')) {
            const videoUrl = message.attachments.first().url;
            try {
                await postClip(userBuffer.title, videoUrl, userBuffer.guildId);
                await message.reply('Clip successfully saved!');
                delete clipBuffer[message.author.id];
            } catch (error) {
                console.error(error);
                await message.reply('An error occurred while saving the clip.');
            }
        } else {
            await message.reply('Please send a video file.');
        }
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addclip')
        .setDescription('Add a new clip'),
    execute: startAddClip,
    handleAddClipMessage
};