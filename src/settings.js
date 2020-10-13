export const plugins = [
  {
    name: 'GuildWars2ItemGoals',
    load: true,
    mainComponent: () => import('./StreamPlugins/GuildWars2ItemGoals/Index.vue'),
    optionsComponent: () => import('./StreamPlugins/GuildWars2ItemGoals/Options.vue'),
    path: '/guildwars2/goals',
  },
];

export const channelName = 'MagicMiko2';
