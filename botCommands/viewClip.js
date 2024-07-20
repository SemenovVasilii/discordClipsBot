const { SlashCommandBuilder } = require('@discordjs/builders');
const { getClips, getClip } = require('../dbQueries/viewClipQueries');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

async function viewClipsButtons(interaction) {
    try {
        const clips = await getClips(interaction.guild.id);

        if (clips.length === 0) {
            await interaction.reply('No clips found.');
            return;
        }

        const buttons = clips.map(clip =>
            new ButtonBuilder()
                .setCustomId(`clip_${clip.id}`)
                .setLabel(clip.title)
                .setStyle(ButtonStyle.Primary)
        );

        const rows = [];
        for (let i = 0; i < buttons.length; i += 5) {
            rows.push(new ActionRowBuilder().addComponents(buttons.slice(i, i + 5)));
        }

        await interaction.reply({ content: 'Available clips:', components: rows });
    } catch (error) {
        console.error(error);
        await interaction.reply('An error occurred while fetching clips.');
    }
}

async function viewClip(interaction) {
    const clipId = interaction.customId.split('_')[1];
    try {
        const clip = await getClip(clipId);
        if (clip) {
            await interaction.reply({ files: [{ attachment: clip.video_url }] });
        } else {
            await interaction.reply('Clip not found.');
        }
    } catch (error) {
        console.error(error);
        await interaction.reply('An error occurred while fetching the clip.');
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('viewclip')
        .setDescription('View all clips'),
    execute: viewClipsButtons,
    handleViewClip: viewClip
};
