import customCreatorIcon from '@/assets/custom_creator.svg';
import intervalsIcon from '@/assets/intervals.svg';
import oneScalesIcon from '@/assets/one_scales.svg';
import patternIcon from '@/assets/pattern.svg';

export interface NavigationItem {
  index: number;
  queryKey: string;
  label: string;
  icon: string;
  route: string;
  description: string;
}

export const navigationItems: NavigationItem[] = [
  {
    index: 0,
    queryKey: 'pattern',
    label: 'Pattern',
    icon: patternIcon,
    route: '/',
    description:
      'Learn scales by playing the selected pattern at every each scale step. This allows you  to recognize characteristic intervals of a scale and helps to build confidence in using them.',
  },
  {
    index: 1,
    queryKey: 'randomScalesOneChord',
    label: 'Scales one chord',
    icon: oneScalesIcon,
    route: '/scales-one-chord',
    description:
      'First step towards musical improvisation. Choose a chord and then select one or more scales to be played along. You can start with one scale and then try adding another to hear how do they mix together.',
  },
  {
    index: 2,
    queryKey: 'intervals',
    label: 'Intervals',
    icon: intervalsIcon,
    route: '/intervals',
    description:
      'This excercise helps you to train your musical hearing. Select which intervals will be played randomly, upwards or downwards, one after another.',
  },
  {
    index: 3,
    queryKey: 'melody',
    label: 'Melody',
    icon: intervalsIcon,
    route: '/melody',
    description: 'Choose one of the most wisely known melody its tonation and tempo.',
  },
  {
    index: 4,
    queryKey: 'customCreator',
    label: 'Custom creator',
    icon: customCreatorIcon,
    route: '/custom-creator',
    description:
      'Learn how to improvise scales with chords progression. You can build composition by adding following blocks. Every component block has four features: tonation, duration in quarternotes, chord name, scale name. Just click on plus sign and make a choice what the next bar should be.',
  },
];
