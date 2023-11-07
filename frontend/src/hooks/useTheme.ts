import {
  useAppDispatch,
  useAppSelector,
} from 'redux/reduxHooks';
import {
  setTheme,
  Theme,
} from 'redux/slices/themeSlice';
import { RootState } from 'redux/store';

export type TuseThemeResult = [
  theme: Theme | undefined,
  toggleTheme: () => void
];

export function useTheme(): TuseThemeResult {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(
    (state: RootState) => state.theme.currentTheme
  );

  const toggleTheme = () => {
    const newTheme = currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    document.documentElement.dataset.theme = newTheme;
    dispatch(setTheme(newTheme as Theme));
  };

  return [currentTheme, toggleTheme];
}
