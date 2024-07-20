const { SlashCommandBuilder } = require('@discordjs/builders');

async function listCommands(interaction) {
    await interaction.reply('\
        /commands - List all commands\n/addclip - Add a new clip\n/viewclip - View all clips'
    );
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('commands')
        .setDescription('List all commands'),
    execute: listCommands
};