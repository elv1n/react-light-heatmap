import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HeatMap, { components } from './';

configure({ adapter: new Adapter() });

const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);

const yLabels = ['Sun', 'Mon', 'Tue'];
const data = new Array(yLabels.length)
  .fill(0)
  .map(() =>
    new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))
  );

const props = {
  data,
  xLabels,
  yLabels
};

describe('ExampleComponent', () => {
  it('export components', () => {
    expect(components.Cell).toBeTruthy();
    expect(components.CellContent).toBeTruthy();
    expect(components.XLabel).toBeTruthy();
    expect(components.YLabel).toBeTruthy();
  });

  it('accept custom component', () => {
    const Cell = props => <div {...props} />;
    const XLabel = props => <div {...props} />;
    const YLabel = props => <div {...props} />;
    const CellContent = () => <div />;
    const components = {
      Cell,
      CellContent,
      XLabel,
      YLabel
    };
    const wrapper = shallow(<HeatMap {...props} components={components} />);
    expect(wrapper.find(Cell).exists()).toBeTruthy();
    expect(wrapper.find(CellContent).exists()).toBeTruthy();
    expect(wrapper.find(YLabel)).toHaveLength(yLabels.length);
    expect(wrapper.find(XLabel)).toHaveLength(xLabels.length);
  });
});
