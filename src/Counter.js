import { useState } from "react";
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';






function Counter() {
  const [like, setLike] = useState(0);
  const [disLike, setDisLike] = useState(0);
  return (
    <div>
      <IconButton  onClick={() => setLike(like + 1)} >
      <Badge badgeContent = {like} color = "secondary">
      <ThumbUpIcon color="primary" ></ThumbUpIcon>
      </Badge>
      </IconButton>
      
      
      <IconButton onClick={() => setDisLike(disLike + 1)}>
      <Badge badgeContent = {disLike} color = "default">
      <ThumbDownIcon  color="warning"> </ThumbDownIcon>
      </Badge>
      </IconButton>
    </div>
  );
}

export default Counter
