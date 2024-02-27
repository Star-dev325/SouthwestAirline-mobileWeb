import { get } from 'src/shared/helpers/jsUtils';

describe('get', () => {
  const testData = {
    layer1: {
      data1: '1',
      layer2: {
        data2: '2',
        layer3: {
          data3: '3'
        }
      }
    }
  };

  it('should return undefined if no data can be found and no default is provided', () => {
    expect(get(testData, 'invalidPath')).toBeUndefined();
  });

  it('should return the default value if the data is undefined', () => {
    expect(get(undefined, 'layer1.data1', 'default')).toEqual('default');
  });

  it('should return the default value if the path is undefined', () => {
    expect(get(testData, undefined, 'default')).toEqual('default');
  });

  it('should return the default value if the path cannot be found', () => {      
    expect(get(testData, 'invalidPath', 'default')).toEqual('default');
  });    

  it('should return a value of a top level property', () => {
    expect(get(testData, 'layer1')).toEqual(testData.layer1);
  });

  it('should return a value nested in an object using dot notation', () => {
    expect(get(testData, 'layer1.layer2.layer3.data3')).toEqual('3');
  });

  it('should return a value nested in an object using an array path', () => {
    expect(get(testData, ['layer1', 'layer2', 'layer3', 'data3'])).toEqual('3');
  });

  it('should return a value using array notation', () => {
    expect(get(testData, 'layer1[layer2][layer3][data3]')).toEqual('3');
  });

  it('should return a value using mixed notation', () => {
    expect(get(testData, 'layer1[layer2].layer3[data3]')).toEqual('3');
  });

  it('should return a value when an array is given for the path', () => {
    expect(get(testData, ['layer1', 'data1'])).toEqual('1');
  });

  it('should access the values of an array at a given index', () => {
    expect(get(['a', 'b', 'c'], '0')).toEqual('a');
  });

  it('should access the values of an array at a nested index', () => {
    expect(get([['a', 'b', 'c']], '0.0')).toEqual('a');
  });

  it('should access the values of an array at a nested index using array syntax', () => {
    expect(get([['a', 'b', 'c']], '0[0]')).toEqual('a');
  });
});