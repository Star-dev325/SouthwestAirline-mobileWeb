import React from 'react';
import sinonModule from 'sinon';
import { mount, shallow } from 'enzyme';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import { DOLLAR, POINTS } from 'src/shared/constants/moneyOrPoints';

import MoneyOrPointsSwitchButton from 'src/shared/components/moneyOrPointsSwitchButton';

const sinon = sinonModule.sandbox.create();

describe('MoneyOrPointsSwitchButton', () => {
  let component;
  let onSelectFunc;

  beforeEach(() => {
    onSelectFunc = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('init switch button', () => {
    beforeEach(() => {
      component = mount(<MoneyOrPointsSwitchButton defaultValue="USD" onSelect={onSelectFunc} />);
    });

    it("should have defaultValue 'money'", () => {
      expect(component.find('.active')).to.contain.text('$');
    });

    it("should turn to 'points' after click", () => {
      click(component.find('.money-or-points--points'));
      expect(component.find('.active')).to.contain.text('Pts');
    });

    it('should call onSelect when preform click', () => {
      click(component.find('.money-or-points--points'));
      expect(onSelectFunc).to.be.calledWith({
        className: 'money-or-points--points',
        label: 'Pts',
        value: 'PTS'
      });
    });
  });

  context('disabled switch button', () => {
    beforeEach(() => {
      component = mount(<MoneyOrPointsSwitchButton value="USD" onSelect={onSelectFunc} disabled />);
    });

    it('should not change value by click', () => {
      click(component.find('.money-or-points--points'));
      expect(component.find('.active')).to.contain.text('$');
    });
  });

  context('dynamic styling', () => {
    it('should have dark style when useAlternateTheme is false and darkTheme is true', () => {
      component = mount(<MoneyOrPointsSwitchButton defaultValue="USD" onSelect={onSelectFunc} darkTheme />);

      expect(component).to.not.have.className('money-or-points_alternate');
      expect(component).to.have.className('money-or-points_dark');
    });

    it('should have new style when useAlternateTheme is true even if darkTheme is true', () => {
      component = mount(
        <MoneyOrPointsSwitchButton defaultValue="USD" onSelect={onSelectFunc} darkTheme useAlternateTheme />
      );

      expect(component).to.have.className('money-or-points_alternate');
      expect(component).to.not.have.className('money-or-points_dark');
    });

    it('should have disabled style when disabled even if useAlternateTheme or darkTheme is true', () => {
      component = mount(
        <MoneyOrPointsSwitchButton defaultValue="USD" onSelect={onSelectFunc} disabled darkTheme useAlternateTheme />
      );

      expect(component).to.not.have.className('money-or-points_alternate');
      expect(component).to.not.have.className('money-or-points_dark');
    });

    it('should call the options when MWEB_HOMEPAGE_REDESIGN is true', () => {
      const expectedOptions = [
        {
          label: POINTS.FULL,
          className: 'money-or-points--points bold',
          value: POINTS.VALUE
        },
        {
          label: DOLLAR.ABBR,
          className: 'money-or-points--money bold',
          value: DOLLAR.VALUE
        }
      ];

      component = shallow(
        <MoneyOrPointsSwitchButton
          defaultValue="USD"
          onSelect={onSelectFunc}
          disabled
          darkTheme
          useAlternateTheme
          MWEB_HOMEPAGE_REDESIGN={true}
        />
      );

      expect(component.props().options).to.deep.equal(expectedOptions);
    });

    it('should call the options when MWEB_HOMEPAGE_REDESIGN is false', () => {
      const expectedOptions = [
        {
          label: DOLLAR.ABBR,
          className: 'money-or-points--money',
          value: DOLLAR.VALUE
        },
        {
          label: POINTS.ABBR,
          className: 'money-or-points--points',
          value: POINTS.VALUE
        }
      ];

      component = shallow(
        <MoneyOrPointsSwitchButton
          defaultValue="USD"
          onSelect={onSelectFunc}
          disabled
          darkTheme
          useAlternateTheme
          MWEB_HOMEPAGE_REDESIGN={false}
        />
      );

      expect(component.props().options).to.deep.equal(expectedOptions);
    });
  });
});
