import Cell from './Cell';
import YLabel from './YLabel';
import XLabel from './XLabel';

export const components = {
  Cell,
  CellContent: () => null,
  YLabel,
  XLabel
};

export const defaultComponents = customComponents => ({
  ...components,
  ...customComponents
});
