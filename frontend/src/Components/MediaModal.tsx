import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MediaPage from "./MediaPage";
interface MediaDialogProps {
  open: boolean;
  onClose: () => void;
  mediaSrc: string; // URL of the media (image or video)
  mediaType: "image" | "video"; // Type of media
}

const MediaDialog: React.FC<MediaDialogProps> = ({
  open,
  onClose,
  mediaSrc,
  mediaType,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        backdropFilter: "blur(10px)", // Glassy blur effect
        backgroundColor: "rgba(0, 33, 55, 0.6)", // Translucent background
        "& .MuiDialog-paper": {
          borderRadius: "12px", // Rounded corners
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)", // Box shadow
          backgroundColor: "#002137", // Set the dialog paper background color.
          maxHeight: "95vh", // Set a max height to avoid overfilling the viewport
          margin: "auto", // Center the dialog
        },
      }}
    >
      <DialogTitle>
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
        <MediaPage mediaSrc={mediaSrc} mediaType={mediaType} />
      </DialogContent>
    </Dialog>
  );
};

export default MediaDialog;
