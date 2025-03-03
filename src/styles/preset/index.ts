import type { Preset } from '@primeuix/themes/types';

import card from './components/card';
import slider from './components/slider';
import primitive from './primitive';
import semantic from './semantic';

export const preset: Preset = {
  primitive: primitive,
  semantic: semantic,
  components: {
    card: card,
    slider: slider,
  },
};
