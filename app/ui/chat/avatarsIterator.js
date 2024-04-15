let avatars = {
  Avatars: [],
  Flags: [],
  NBA: { Eastern: [], Western: [] },
  Others: {
    NHL: { Eastern: [], Western: [] },
    NFL: [],
    MLB: [],
    Cricket: [],
  },
  Football: {
    Brazil: [],
    Bundesliga: [],
    LaLiga: [],
    LigaPortugal: [],
    Ligue1: [],
    MLS: { WesternConference: [], EasternConference: [] },
    Others: [],
    PremierLeague: [],
    ScottishPremiership: [],
    SerieA: [],
  },
};
for (let i = 0; i < 402; i = i + 1) {
  avatars.Avatars.push(i);
}
for (let i = 0; i < 264; i = i + 1) {
  avatars.Flags.push(i);
}
for (let i = 0; i < 15; i = i + 1) {
  avatars.NBA.Eastern.push(i);
  avatars.NBA.Western.push(i);
}
for (let i = 0; i < 30; i = i + 1) {
  avatars.Others.MLB.push(i);
  avatars.Others.NFL.push(i);
  if (i < 11) {
    avatars.Others.Cricket.push(i);
  }
  if (i < 16) {
    avatars.Others.NHL.Eastern.push(i);
    avatars.Others.NHL.Western.push(i);
  }
}
for (let i = 0; i < 31; i = i + 1) {
  avatars.Football.Others.push(i);

  if (i < 20) {
    avatars.Football.Brazil.push(i);
    avatars.Football.LaLiga.push(i);
    avatars.Football.Ligue1.push(i);
    avatars.Football.PremierLeague.push(i);
    avatars.Football.SerieA.push(i);
  }
  if (i < 18) {
    avatars.Football.Bundesliga.push(i);
    avatars.Football.LigaPortugal.push(i);
  }
  if (i < 15) {
    avatars.Football.MLS.EasternConference.push(i);
  }
  if (i < 14) {
    avatars.Football.MLS.WesternConference.push(i);
  }
  if (i < 12) {
    avatars.Football.ScottishPremiership.push(i);
  }
}
export default avatars;
