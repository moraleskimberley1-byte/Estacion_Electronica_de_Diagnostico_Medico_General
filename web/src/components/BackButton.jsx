import { GO_BACK } from '../state/actions';

export default function BackButton({ dispatch }) {
  return (
    <button
      className="back-btn"
      onClick={() => dispatch({ type: GO_BACK })}
    >
      Volver
    </button>
  );
}
