import { render } from '@testing-library/react';
import React from 'react';
import InstructionText from 'src/checkIn/components/instructionText';

describe('instructionText', () => {
  it('should render InstructionText component', () => {
    const instructionText = 'fake instruction text';
    const { container } = render(<InstructionText text={instructionText} />);

    expect(container.querySelector('.instruction').textContent).toEqual(instructionText);
  });
});
