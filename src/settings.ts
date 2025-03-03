export const Settings = {
  page: {
    pattern: {
      tempo: {
        min: 80,
        max: 180,
        defaultValue: 100,
      },
      pattern: {
        maxLength: 5,
      },
    },
    scalesOneChord: {
      tempo: {
        min: 20,
        max: 80,
        defaultValue: 50,
      },
      moveScaleMax: {
        min: 1,
        max: 3,
        defaultValue: 2,
      },
      quartones: {
        min: 1,
        max: 7,
        defaultValue: 4,
      },
    },
    intervals: {
      tempo: {
        min: 20,
        max: 60,
        defaultValue: 30,
      },
    },
    customCreator: {
      tempo: {
        min: 20,
        max: 80,
        defaultValue: 40,
      },
      quarternotes: {
        min: 1,
        max: 4,
        defaultValue: 4,
      },
      components: {
        maxLength: 16,
      },
    },
  },
};
