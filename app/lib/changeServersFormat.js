// export const changeServersFormat = (servers) => {
//   if (!servers || servers.length === 0) {
//     return null;
//   }

//   // console.log("server-func", servers);
//   const mainservers = [];
//   const otherServers = [];

//   if (servers !== undefined && servers.length > 0) {
//     const mainLanguages = servers[0].mainLanguages;
//     const otherLanguages = servers[0].moreLanguages;
//     Object.keys(mainLanguages).forEach((language) => {
//       if (mainLanguages[language].checked && mainLanguages[language].num > 0) {
//         const obj = {};
//         obj[language.toLowerCase()] = mainLanguages[language].channels.map(
//           (channel) => ({
//             streamLinkName: channel?.serverValue?.name,
//             streamLinkUrl: channel?.serverValue?.streamLinkUrl,
//           })
//         );
//         mainservers.push(obj);
//       }
//     });
//     if (otherLanguages.checked && otherLanguages.num > 0) {
//       otherLanguages.otherLangs.map((language) => {
//         if (language.num > 0) {
//           const obj = {};
//           obj[language.name] = language.channels.map((channel) => ({
//             streamLinkName: channel.streamLinkName,
//             streamLinkUrl: channel.streamLinkUrl,
//           }));
//           otherServers.push(obj);
//         }
//       });
//     }
//   }
//   const allServers = [...mainservers, ...otherServers];
//   return allServers;
// };
export const changeServersFormat = (servers) => {
  if (!servers || servers.length === 0) {
    return null;
  }

  const mainLanguages = servers[0].mainLanguages;
  const otherLanguages = servers[0].moreLanguages;

  const formatChannels = (channels) => {
    return channels.map((channel) => ({
      streamLinkName: channel?.serverValue?.name,
      streamLinkUrl: channel?.serverValue?.streamLinkUrl,
    }));
  };

  // Processing Main Languages
  const mainservers = Object.keys(mainLanguages)
    .filter(
      (language) =>
        mainLanguages[language].checked && mainLanguages[language].num > 0
    )
    .map((language) => {
      const obj = {};
      obj[language.toLowerCase()] = formatChannels(
        mainLanguages[language].channels
      );
      return obj;
    });

  // Processing Other Languages
  const otherServers =
    otherLanguages.checked && otherLanguages.num > 0
      ? otherLanguages.otherLangs
          .filter((language) => language.num > 0)
          .map((language) => {
            const obj = {};
            obj[language.name] = language.channels.map((channel) => ({
              streamLinkName: channel.streamLinkName,
              streamLinkUrl: channel.streamLinkUrl,
            }));
            return obj;
          })
      : [];

  return [...mainservers, ...otherServers];
};
