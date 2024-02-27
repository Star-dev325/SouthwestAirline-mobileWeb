import React from 'react';
import { sandbox } from 'sinon';
import DatePicker from 'src/shared/components/datePicker';
import { mount } from 'enzyme';
import { focus } from 'test/unit/helpers/enzymeFormTestUtils';
import dayjs from 'dayjs';
import { today, getDayjsDateFromString } from 'src/shared/helpers/dateHelper';

const sinon = sandbox.create();

describe('datePicker', () => {
  const onChange = sinon.spy();
  let component;

  beforeEach(() => {
    onChange.reset();
    component = createComponent();
  });

  context('when initialize', () => {
    it('should render properly', () => {
      expect(component.find('Select')).to.have.lengthOf(3);
    });

    it('should render fields as props.fields', () => {
      component = createComponent({
        fields: ['month', 'year']
      });

      expect(component.find('Select')).to.have.lengthOf(2);
    });

    it('should render options properly', () => {
      component = createComponent({
        value: new Date('2015/08/15'),
        min: new Date('2015/08/10'),
        max: new Date('2016/10/10')
      });

      const monthSelect = component.find('.date-selection-month');

      expect(monthSelect.find('option.placeholder')).to.have.lengthOf(1);
      expect(monthSelect.find('option[data-qa="dqa-enabled-option"]')).to.have.lengthOf(5);
    });

    it('should only render 3 years on lap child form', () => {
      component = createComponent({
        value: new Date('2020/08/15'),
        minLapChildFormYear: new Date('2020/08/10'),
        max: new Date('2022/10/10'),
        isLapChild: true
      });

      const yearSelect = component.find('.date-selection-year');

      expect(yearSelect.find('option[data-qa="dqa-enabled-option"]')).to.have.lengthOf(3);
    });
  });

  context('when triggerDefaultOnFocus is true', () => {
    it('should trigger onChange with date which is start of two year ago on focus', () => {
      const yearSelect = component.find('.date-selection-year');

      focus(yearSelect.find('select'));

      expect(onChange).to.have.been.called;
      expect(formatDate(onChange.args[0][0])).to.equal(
        dayjs().subtract(2, 'year').month(0).date(1).format('YYYY/MM/DD')
      );
    });
  });

  context('when triggerDefaultOnFocus is false', () => {
    it('should not trigger onChange with init value on focus', () => {
      component = createComponent({ triggerDefaultOnFocus: false });

      const yearSelect = component.find('.date-selection-year');

      focus(yearSelect.find('select'));

      expect(onChange).not.to.have.been.called;
    });
  });

  context('when selected date is invalid', () => {
    it('should trigger onChange with a closest valid value', () => {
      component = createComponent({
        value: new Date('2015/12/10'),
        min: new Date('2015/08/10'),
        max: new Date('2016/10/10')
      });

      const monthSelect = component.find('.date-selection-month');

      monthSelect.find('select').simulate('change', {
        target: {
          value: '04'
        }
      });

      expect(onChange).to.have.been.called;
      expect(formatDate(onChange.args[0][0])).to.equal(formatDate(getDayjsDateFromString('2015/08/10')));
    });
  });

  context('when selected date is valid', () => {
    it('should trigger onChange with selected date', () => {
      const yearSelect = component.find('.date-selection-year');

      yearSelect.find('select').simulate('change', {
        target: {
          value: '2010'
        }
      });

      expect(onChange).to.have.been.called;
      expect(formatDate(onChange.args[0][0])).to.equal(formatDate(today().set('year', 2010)));
    });
  });

  const createComponent = (props) => {
    const finalProps = {
      onChange,
      ...props
    };

    return mount(<DatePicker {...finalProps} />);
  };

  const formatDate = (date) => dayjs(date).format('YYYY/MM/DD');
});
