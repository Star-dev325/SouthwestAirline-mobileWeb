import { getHocDisplayName } from 'src/shared/enhancers/hocHelper';

describe('hocs', () => {
  it('should have a display name for class component', () => {
    class Example {
      render() {
        return null;
      }
    }

    expect(getHocDisplayName('WithNothing', Example)).to.equal('WithNothing(Example)');
  });

  it('should have a display name for arrow functional component', () => {
    const Example = () => null;

    expect(getHocDisplayName('WithNothing', Example)).to.equal('WithNothing(Example)');
  });

  it('should have a display name for functional component', () => {
    function Example() {
      return null;
    }

    expect(getHocDisplayName('WithNothing', Example)).to.equal('WithNothing(Example)');
  });

  it('should have display name for class component with override', () => {
    class Example {
      render() {
        return null;
      }
    }
    Example.displayName = 'Override';

    expect(getHocDisplayName('WithNothing', Example)).to.equal('WithNothing(Override)');
  });

  it('should fallback to hoc name when no name is provided', () => {
    expect(getHocDisplayName('WithNothing', () => {})).to.equal('WithNothing');
  });
});
