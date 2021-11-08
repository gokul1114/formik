
export function Box({ val, playerClick }) {
  return (
    <div className="box" onClick={playerClick}>
      {val}
    </div>
  );
}


