import React from 'react';
import Panel from 'src/shared/components/panel';
import { mount } from 'enzyme';

describe('Panel', () => {
  it('should have class and body', () => {
    const wrapper = mount(<Panel>Panel content</Panel>);

    expect(wrapper).to.have.className('panel');
    expect(wrapper.find('.panel--body')).to.be.present();
  });

  it('should honour additional classes passed in, adding not overriding', () => {
    const wrapper = mount(<Panel className="bob" />);

    expect(wrapper).to.have.className('panel');
    expect(wrapper).to.have.className('bob');
  });

  it('should have unwrapped header', () => {
    const wrapper = mount(<Panel header="Heading">Panel content</Panel>);

    expect(wrapper.find('.panel--heading')).to.have.text('Heading');
  });

  it('should have custom component header', () => {
    const header = <h3 className="test-header">Heading</h3>;
    const wrapper = mount(<Panel header={header}>Panel content</Panel>);

    const panelHeading = wrapper.find('.test-header');

    expect(panelHeading).to.have.text('Heading');
    expect(panelHeading).to.have.className('panel__title');
  });

  it('should have custom component header with anchor', () => {
    const header = <h3 className="test-header">Heading</h3>;
    const wrapper = mount(
      <Panel header={header} collapsible>
        Panel content
      </Panel>
    );

    expect(wrapper.find('.panel-anchor')).to.exist;
  });

  it('should have footer', () => {
    const wrapper = mount(<Panel footer="Footer">Panel content</Panel>);

    const footer = wrapper.find('.panel__footer');

    expect(footer).to.have.text('Footer');
  });

  it('should have collapse classes', () => {
    const wrapper = mount(
      <Panel collapsible expanded>
        Panel content
      </Panel>
    );

    expect(wrapper.find('.panel_collapsed.collapse.in')).to.be.present();
  });

  it('should pass through dom properties', () => {
    const wrapper = mount(<Panel id="testid">Panel content</Panel>);

    expect(wrapper.find('#testid')).to.be.present();
  });

  it('should pass id to panel-collapse', () => {
    const wrapper = mount(
      <Panel collapsible id="testid" header="Heading">
        Panel content
      </Panel>
    );

    expect(wrapper.find('.panel_collapsed').find('#testid')).to.be.present();
    expect(wrapper.find('.panel__title a')).to.have.attr('href', '#testid');
  });

  it('should be open', () => {
    const wrapper = mount(
      <Panel collapsible expanded header="Heading">
        Panel content
      </Panel>
    );

    expect(wrapper.find('.panel_collapsed')).to.have.className('in');
    expect(wrapper.find('.panel__title a')).not.have.className('collapsed');
  });

  it('should be closed', () => {
    const wrapper = mount(
      <Panel collapsible header="Heading">
        Panel content
      </Panel>
    );

    expect(wrapper.find('.panel_collapsed')).not.have.className('in');
    expect(wrapper.find('.panel__title a')).to.have.className('collapsed');
  });

  it('should be aria-expanded=true', () => {
    const wrapper = mount(
      <Panel collapsible expanded header="Heading">
        Panel content
      </Panel>
    );

    expect(wrapper.find('.panel_collapsed')).to.have.attr('aria-expanded', 'true');
    expect(wrapper.find('.panel__title a')).to.have.attr('aria-expanded', 'true');
  });

  it('should be aria-expanded=false', () => {
    const wrapper = mount(
      <Panel collapsible expanded={false} header="Heading">
        Panel content
      </Panel>
    );

    expect(wrapper.find('.panel_collapsed')).to.have.attr('aria-expanded', 'false');
    expect(wrapper.find('.panel__title a')).to.have.attr('aria-expanded', 'false');
  });

  it('should call onSelect handler', (done) => {
    const handleSelect = (e, key) => {
      expect(key).to.equal('1');
      done();
    };

    const wrapper = mount(
      <Panel collapsible onSelect={handleSelect} header="Click me" eventKey="1">
        Panel content
      </Panel>
    );

    wrapper.find('.panel-anchor').simulate('click');
  });

  it('should toggle when uncontrolled', () => {
    const wrapper = mount(
      <Panel collapsible header="Click me">
        Panel content
      </Panel>
    );

    expect(wrapper.state('expanded')).to.be.false;

    wrapper.find('.panel-anchor').simulate('click');

    expect(wrapper.state('expanded')).to.be.true;
  });

  context('constructor', () => {
    it('should check defaultExpanded', () => {
      const wrapper = mount(<Panel defaultExpanded>Panel content</Panel>);

      const { state } = wrapper.instance();

      expect(state.expanded).to.be.true;
    });

    it('should default collapsing to false', () => {
      const wrapper = mount(<Panel>Panel content</Panel>);
      const { state } = wrapper.instance();

      expect(state.collapsing).to.be.false;
    });
  });

  context('collapsed', () => {
    it('should have collapse class', () => {
      const wrapper = mount(<Panel collapsible>Panel content</Panel>);

      expect(wrapper.find('.collapse')).to.have.lengthOf(1);
    });
  });

  context('from collapsed to expanded', () => {
    it('should have collapsing class', () => {
      const wrapper = mount(<Panel collapsible>Panel content</Panel>);

      wrapper.setProps({ expanded: true });
      const node = wrapper.instance().getCollapsibleDOMNode();

      expect(node.className).to.contain('collapsing');
    });

    it('should set initial 0px height', () => {
      const wrapper = mount(<Panel collapsible>Panel content</Panel>);
      const node = wrapper.instance().getCollapsibleDOMNode();

      expect(node.style.height).to.be.equal('');

      wrapper.instance()._afterWillUpdate = () => {
        expect(node.style.height).to.be.equal('0px');
      };

      wrapper.setProps({ expanded: true });
    });

    it('should transition from collapsing to not collapsing', (done) => {
      const wrapper = mount(<Panel collapsible>Panel content</Panel>);

      wrapper.instance()._addEndEventListener = (node, compvare) => {
        setTimeout(() => {
          compvare();
          expect(wrapper.instance().state.collapsing).to.be.false;
          done();
        }, 25);
      };
      wrapper.setProps({ expanded: true });
      expect(wrapper.instance().state.collapsing).to.be.ok;
    });

    it('should clear height after transition compvare', (done) => {
      const wrapper = mount(<Panel collapsible>Panel content</Panel>);
      const node = wrapper.instance().getCollapsibleDOMNode();

      wrapper.instance()._addEndEventListener = (nodeInner, compvare) => {
        setTimeout(() => {
          compvare();
          expect(nodeInner.style.height).to.be.equal('');
          done();
        }, 25);
      };

      wrapper.setProps({ expanded: true });
      expect(node.style.height).to.be.equal('0px');
    });
  });

  context('from expanded to collapsed', () => {
    it('should have collapsing class', () => {
      const wrapper = mount(
        <Panel defaultExpanded collapsible>
          Panel content
        </Panel>
      );

      wrapper.setProps({ expanded: false });

      const node = wrapper.instance().getCollapsibleDOMNode();

      expect(node.className).to.contain('collapsing');
    });

    it('should set initial height', () => {
      const wrapper = mount(
        <Panel defaultExpanded collapsible>
          Panel content
        </Panel>
      );
      const node = wrapper.instance().getCollapsibleDOMNode();

      wrapper.instance()._afterWillUpdate = () => {
        expect(node.style.height).to.be.equal('15px');
      };

      expect(node.style.height).to.be.equal('');
      wrapper.setProps({ expanded: false });
    });

    it('should set transition to height', () => {
      const wrapper = mount(
        <Panel defaultExpanded collapsible>
          Panel content
        </Panel>
      );
      const node = wrapper.instance().getCollapsibleDOMNode();

      expect(node.style.height).to.be.equal('');

      wrapper.setProps({ expanded: false });
      expect(node.style.height).to.be.equal('0px');
    });

    it('should transition from collapsing to not collapsing', (done) => {
      const wrapper = mount(
        <Panel defaultExpanded collapsible>
          Panel content
        </Panel>
      );

      wrapper.instance()._addEndEventListener = (node, compvare) => {
        setTimeout(() => {
          compvare();
          expect(wrapper.instance().state.collapsing).to.be.false;
          done();
        }, 25);
      };
      wrapper.setProps({ expanded: false });

      expect(wrapper.instance().state.collapsing).to.be.true;
    });

    it('should have 0px height after transition compvare', (done) => {
      const wrapper = mount(
        <Panel defaultExpanded collapsible>
          Panel content
        </Panel>
      );
      const node = wrapper.instance().getCollapsibleDOMNode();

      wrapper.instance()._addEndEventListener = (nodeInner, compvare) => {
        setTimeout(() => {
          compvare();
          expect(nodeInner.style.height).to.be.equal('0px');
          done();
        }, 25);
      };

      expect(node.style.height).to.be.equal('');
      wrapper.setProps({ expanded: false });
      expect(node.style.height).to.be.equal('0px');
    });
  });

  context('expanded', () => {
    it('should have collapse and in class', () => {
      const wrapper = mount(
        <Panel expanded collapsible>
          Panel content
        </Panel>
      );

      expect(wrapper.find('.collapse.in')).to.be.present();
    });

    it('should have collapse and in class with defaultExpanded', () => {
      const wrapper = mount(
        <Panel defaultExpanded collapsible>
          Panel content
        </Panel>
      );

      expect(wrapper.find('.collapse.in')).to.be.present();
    });
  });

  context('dimension', () => {
    it('Defaults to height', () => {
      const wrapper = mount(<Panel collapsible>Panel content</Panel>);

      expect(wrapper.instance().dimension()).to.be.equal('height');
    });

    it('Uses getCollapsibleDimension if exists', () => {
      const wrapper = mount(<Panel collapsible>Panel content</Panel>);

      wrapper.instance().getCollapsibleDimension = () => 'whatevs';

      expect(wrapper.instance().dimension()).to.be.equal('whatevs');
    });
  });
});
