import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { deleteUser } from "../../services/UsersService";

interface DeleteUserModalProps {
  userId: string | number | undefined;
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

function DeleteUserModal({
  userId,
  open,
  onClose,
  onDelete,
}: DeleteUserModalProps) {
  const handleDelete = async () => {
    const response = await deleteUser(String(userId));
    if (response.status === 200) {
      onDelete();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user {userId} from the system?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteUserModal;
