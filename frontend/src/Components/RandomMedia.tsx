import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
interface RandomMediaProps {
  open: boolean;
  onClose: () => void;
}

const RandomMedia: React.FC<RandomMediaProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Randomize Options
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* Add your dialog content here */}
        <p>You can add your randomize options here.</p>
      </DialogContent>
    </Dialog>
  );
};

export default RandomMedia;
