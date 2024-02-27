// @flow
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import type { ElementRef, HeaderRefsType } from 'src/shared/flow-typed/shared.types';

type Props = {
  shouldShow: ?boolean,
  alphabet: Array<string>,
  scrollTo: (string) => void
};

const AlphabetSelector = (props: Props) => {
  const letterRefs: HeaderRefsType = {};
  const { alphabet, shouldShow, scrollTo } = props;

  const _preventDefault = (event: Event) => event && event.preventDefault();

  const _onClick = (letter: string) => (event: Event) => {
    _preventDefault(event);
    scrollTo(letter);
  };

  const _onTouchMove = (event: Event) => {
    const touchLocation = _.chain(event).get('touches').head().get('clientY').value();
    const letterLocations = _.mapValues(letterRefs, (ref) => _.get(ref.getBoundingClientRect(), 'top'));

    const lettersAboveTouch = _.pickBy(letterLocations, (letterLocation) => letterLocation < touchLocation);
    const letterTouched = _.chain(lettersAboveTouch).keys().max().value();

    letterTouched && scrollTo(letterTouched);
  };

  const _setLetterRef = (letter: string) => (ref: ElementRef) => {
    _.set(letterRefs, letter, ReactDOM.findDOMNode(ref));
  };

  const _displayLetter = (letter: string) => (
    <div onClick={_onClick(letter)} ref={_setLetterRef(letter)} key={letter} data-qa={'alpha-select-letter'}>
      {letter}
    </div>
  );

  return (
    <div className="alphabet-selector disable-scrolling" onTouchMove={_onTouchMove}>
      {shouldShow && _.map(_.sortBy(alphabet), _displayLetter)}
    </div>
  );
};

export default withBodyClass('overflow-hidden')(AlphabetSelector);
