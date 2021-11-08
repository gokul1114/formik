import { useState } from "react";
import Button from '@mui/material/Button';
import { ColorBox } from "./ColorBox";

export function Color() {
  const [color, setColor] = useState("orange");
  let styles = { backgroundColor: color };
  let initialColors = ["orange", "red"];
  let [colorList, setColorList] = useState(initialColors);

  return (
    <div>
      <input value={color} style={styles} onChange={(event) => setColor(event.target.value)} />
      <Button variant="contained" onClick={() => setColorList([...colorList, color])}>Add Color</Button>
      {colorList.map(e => (<ColorBox clr={e} index={colorList.indexOf(e)} />))}
      {console.log(colorList)}
    </div>
  );
}
