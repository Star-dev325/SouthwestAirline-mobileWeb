import GlobalHeaderActionTypes from 'src/shared/actions/globalHeaderActionTypes';
import globalHeaderReducer from 'src/shared/reducers/globalHeaderReducer';

const {
  GLOBAL_HEADER__SHOW_EDIT_BUTTON,
  GLOBAL_HEADER__SHOW_CANCEL_BUTTON,
  GLOBAL_HEADER__CLICK_EDIT_BUTTON,
  GLOBAL_HEADER__CLICK_CANCEL_BUTTON,
  GLOBAL_HEADER__HIDE_GLOBAL_HEADER,
  GLOBAL_HEADER__SHOW_ONLY_LOGIN,
  GLOBAL_HEADER__HIDE_BUTTON,
  GLOBAL_HEADER__RESET_GLOBAL_HEADER
} = GlobalHeaderActionTypes;

describe('globalHeaderReducer', () => {
  it('should set showGlobalHeader to true and button state to LOGIN_SHOW_LONG_TEXT when reset global header action trigger', () => {
    const state = globalHeaderReducer(undefined, {
      type: GLOBAL_HEADER__RESET_GLOBAL_HEADER
    });

    expect(state.showGlobalHeader).to.be.true;
    expect(state.buttonState).to.be.equal('LOGIN_SHOW_LONG_TEXT');
  });

  context('buttonState', () => {
    it('should init status', () => {
      const state = globalHeaderReducer(undefined, {});

      expect(state.buttonState).to.be.equal('LOGIN_SHOW_LONG_TEXT');
    });

    it('should set the button state to EDIT_SHOW_EDIT_TEXT when show edit action trigger', () => {
      const state = globalHeaderReducer(undefined, {
        type: GLOBAL_HEADER__SHOW_EDIT_BUTTON
      });

      expect(state.buttonState).to.be.equal('EDIT_SHOW_EDIT_TEXT');
    });

    it('should set the button state to EDIT_SHOW_EDIT_TEXT when click cancel button action trigger', () => {
      const state = globalHeaderReducer(undefined, {
        type: GLOBAL_HEADER__CLICK_CANCEL_BUTTON
      });

      expect(state.buttonState).to.be.equal('EDIT_SHOW_EDIT_TEXT');
    });

    it('should set the button state to EDIT_SHOW_CANCEL_TEXT when show cancel action trigger', () => {
      const state = globalHeaderReducer(undefined, {
        type: GLOBAL_HEADER__SHOW_CANCEL_BUTTON
      });

      expect(state.buttonState).to.be.equal('EDIT_SHOW_CANCEL_TEXT');
    });

    it('should set the button state to EDIT_SHOW_CANCEL_TEXT when click edit button action trigger', () => {
      const state = globalHeaderReducer(undefined, {
        type: GLOBAL_HEADER__CLICK_EDIT_BUTTON
      });

      expect(state.buttonState).to.be.equal('EDIT_SHOW_CANCEL_TEXT');
    });

    it('should set the button state to HIDE_BUTTON when hide button action trigger', () => {
      const state = globalHeaderReducer(undefined, {
        type: GLOBAL_HEADER__HIDE_BUTTON
      });

      expect(state.buttonState).to.be.equal('HIDDEN');
    });

    it('should set the button state to LOGIN_SHOW_SHORT_TEXT when show only login action trigger', () => {
      const state = globalHeaderReducer(undefined, {
        type: GLOBAL_HEADER__SHOW_ONLY_LOGIN
      });

      expect(state.buttonState).to.be.equal('LOGIN_SHOW_SHORT_TEXT');
    });

    it('should return default state when action is undefined', () => {
      expect(globalHeaderReducer().buttonState).to.deep.equal('LOGIN_SHOW_LONG_TEXT');
    });
  });

  context('showGlobalHeader', () => {
    it('should init status', () => {
      const state = globalHeaderReducer(undefined, {});

      expect(state.showGlobalHeader).to.be.true;
    });

    it('should set showGlobalHeader to false when hide global header action trigger', () => {
      const state = globalHeaderReducer(undefined, {
        type: GLOBAL_HEADER__HIDE_GLOBAL_HEADER
      });

      expect(state.showGlobalHeader).to.be.false;
    });

    it('should return default state when action is undefined', () => {
      expect(globalHeaderReducer().showGlobalHeader).to.deep.equal(true);
    });
  });

  context('editMode', () => {
    it('should init status', () => {
      const state = globalHeaderReducer(undefined, {});

      expect(state.editMode).to.be.false;
    });

    it('should set edit mode to true when CLICK_EDIT_BUTTON action be triggered ', () => {
      const state = globalHeaderReducer(undefined, { type: GLOBAL_HEADER__CLICK_EDIT_BUTTON });

      expect(state.editMode).to.be.true;
    });

    it('should set edit mode to true when CLICK_CANCEL_BUTTON action be triggered ', () => {
      const state = globalHeaderReducer(undefined, { type: GLOBAL_HEADER__CLICK_CANCEL_BUTTON });

      expect(state.editMode).to.be.false;
    });

    it('should set edit mode to false when CLICK_CANCEL_BUTTON action be triggered ', () => {
      const state = globalHeaderReducer(undefined, { type: GLOBAL_HEADER__CLICK_CANCEL_BUTTON });

      expect(state.editMode).to.be.false;
    });

    it('should set edit mode to false when SHOW_EDIT_BUTTON action be triggered ', () => {
      const state = globalHeaderReducer(undefined, { type: GLOBAL_HEADER__SHOW_EDIT_BUTTON });

      expect(state.editMode).to.be.false;
    });

    it('should set edit mode to false when HIDE_BUTTON action be triggered ', () => {
      const state = globalHeaderReducer(undefined, { type: GLOBAL_HEADER__HIDE_BUTTON });

      expect(state.editMode).to.be.false;
    });

    it('should set edit mode to false when RESET_GLOBAL_HEADER action be triggered ', () => {
      const state = globalHeaderReducer(undefined, { type: GLOBAL_HEADER__RESET_GLOBAL_HEADER });

      expect(state.editMode).to.be.false;
    });

    it('should return default state when action is undefined', () => {
      expect(globalHeaderReducer().editMode).to.deep.equal(false);
    });
  });
});
