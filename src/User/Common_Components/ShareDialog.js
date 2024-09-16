import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

export default function ShareDialog({
  open,
  setOpen,
  shareUrl,
  quote,
  hashtag,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="share-dialog-title"
      aria-describedby="share-dialog-description"
      sx={{ minWidth: 300 }}
    >
      <DialogTitle id="share-dialog-title">Share</DialogTitle>
      <DialogContent>
        <DialogContentText id="share-dialog-description">
          <div>
            <p>{quote}</p>
            <p>{hashtag}</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "10px",
            }}
          >
            <FacebookShareButton url={shareUrl} quote={quote} hashtag={hashtag}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <WhatsappShareButton url={shareUrl} title={quote}>
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
            <TelegramShareButton url={shareUrl} title={quote}>
              <TelegramIcon size={32} round={true} />
            </TelegramShareButton>
            <FacebookMessengerShareButton
              url={shareUrl}
              appId="YOUR_FACEBOOK_APP_ID"
            >
              <FacebookMessengerIcon size={32} round={true} />
            </FacebookMessengerShareButton>
            <TwitterShareButton
              url={shareUrl}
              title={quote}
              hashtags={[hashtag]}
            >
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
