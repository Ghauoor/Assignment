import {DefaultTheme} from '@react-navigation/native';
import {theme} from '../theme/theme';
export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.background,
  },
};
