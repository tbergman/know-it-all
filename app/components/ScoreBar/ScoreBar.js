import ScoreButtons from '../ScoreButtons/ScoreButtons';
import { EVENTS } from '../../utils/constants';
import swapNodes from '../../utils/swapNodes';
import store from '../../data/store';
import { div } from '../../utils/elements';

if (process.env.IMPORT_SCSS) require(`./ScoreBar.scss`); // eslint-disable-line global-require

const ScoreBar = () => {
  let el;

  const render = () => {
    const buttons = store.selectedItem
      ? ScoreButtons({
        item: store.selectedItem,
        isScoreBar: true,
      })
      : null;

    return div({ className: `score-bar` }, buttons);
  };

  store.listen(EVENTS.SELECTED_ITEM_CHANGED, () => {
    el = swapNodes(el, render(), true); // often the DOM won't change, but the listeners will
  });

  store.listen(EVENTS.SCORE_CHANGED, () => {
    el = swapNodes(el, render());
  });

  el = render();

  return el;
};

export default ScoreBar;
