
export function ColorBox({ clr, index }) {
  console.log(clr, index);
  let styles = { background: clr, height: "100px", width: "400px" };
  return (
    <div style={styles}>
      {clr}
    </div>
  );
}
