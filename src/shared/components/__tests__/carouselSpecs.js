import React from 'react';
import ReactDOM from 'react-dom';
import { sandbox } from 'sinon';
import proxyquire from 'proxyquire';
import { mount } from 'enzyme';

const sinon = sandbox.create();

describe('Carousel', () => {
  let Carousel;
  let carouselWrapper;
  let swipeKillSpy;
  let swipeGetPosSpy;

  beforeEach(() => {
    const swipe = {};

    swipeKillSpy = sinon.spy();
    swipe.kill = swipeKillSpy;
    swipeGetPosSpy = sinon.spy();
    swipe.getPos = swipeGetPosSpy;

    Carousel = proxyquire('src/shared/components/carousel', {
      'swipe-js-iso'() {
        return swipe;
      }
    }).default;
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should hide indicator if there is no child', () => {
    carouselWrapper = mount(<Carousel />);

    const indicator = carouselWrapper.find('.carousel-dots');

    expect(indicator).to.have.lengthOf(0);
  });

  it('should fix index when there is only 2 child items(Swipe will generated 4 items)', () => {
    // it is not good to use private method like this. just keeping the swipe logic here.
    carouselWrapper = mount(
      <Carousel>
        <div key="1">PANEL 1</div>
        <div key="2">PANEL 2</div>
      </Carousel>
    );

    carouselWrapper.instance()._transitionEnd(3);

    expect(carouselWrapper).to.have.state('selectedItem').equal(1);
  });

  it('should call swipe kill function when component unmount', () => {
    const container = document.createElement('div');

    carouselWrapper = mount(<Carousel />, { attachTo: container });

    carouselWrapper.detach();

    expect(swipeKillSpy).to.have.been.calledOnce;
  });

  describe('className on children', () => {
    beforeEach(() => {
      carouselWrapper = mount(
        <Carousel dotsInFooter>
          <div className="foo" key={1} />
          <div className="foo" key={2} />
        </Carousel>
      );
    });

    it('should preserve custom classes on children', () => {
      expect(carouselWrapper.find('.foo')).to.have.lengthOf(2);
    });

    it('should wrap each child with a carousel-child container', () => {
      expect(carouselWrapper.find('.carousel-child')).to.have.lengthOf(2);
    });
  });

  describe('pagination dots', () => {
    context('when dotsInFooter=true', () => {
      beforeEach(() => {
        carouselWrapper = mount(
          <Carousel dotsInFooter>
            <div key={1} />
            <div key={2} />
          </Carousel>
        );
      });

      it('should have class .carousel-dots--in-footer', () => {
        expect(carouselWrapper.find('.carousel-dots--in-footer')).be.present();
      });

      describe('each dot', () => {
        it('should have the in-footer modifier', () => {
          const pageIndicator = carouselWrapper.find('.carousel-dots');

          expect(pageIndicator.find('.dot--in-footer')).to.have.lengthOf(2);
        });
      });
    });

    context('when dotsInFooterWithArrows=true', () => {
      beforeEach(() => {
        carouselWrapper = mount(
          <Carousel dotsInFooterWithArrows>
            <div key={1} />
            <div key={2} />
          </Carousel>
        );
      });

      it('should have class .carousel-dots--in-footer-with-arrows', () => {
        expect(carouselWrapper.find('.carousel-dots--in-footer-with-arrows')).be.present();
      });

      describe('each dot', () => {
        it('should have the in-footer-with-arrows modifier', () => {
          const pageIndicator = carouselWrapper.find('.carousel-dots');

          expect(pageIndicator.find('.dot--in-footer-with-arrows')).to.have.lengthOf(2);
        });
      });
    });
  });

  describe('children with different heights', () => {
    const mountBasicCarousel = () =>
      mount(
        <Carousel>
          <div />
          <div />
        </Carousel>
      );

    it('should leave the height style alone on initial load', () => {
      const carouselWrapper = mountBasicCarousel();
      const carouselWrapperComponent = carouselWrapper.find('.carousel-wrapper');

      expect(carouselWrapperComponent).to.have.prop('style').deep.equal({ height: undefined });
    });

    context('when you swipe to another child', () => {
      it('should set the height of the container to the height of the visible child', () => {
        // it is not good to use private method like this. just keeping the swipe logic here.
        const carouselWrapper = mountBasicCarousel();
        const instance = carouselWrapper.instance();
        const getOffsetHeightStub = sinon.stub(instance, '_getOffsetHeightOf');

        getOffsetHeightStub.withArgs(ReactDOM.findDOMNode(instance.refs[`child-1`])).returns(10);

        instance._transitionEnd(1);

        expect(instance.state).to.deep.equal({
          heightOfVisibleChild: 10,
          selectedItem: 1
        });
      });
    });
  });
});
