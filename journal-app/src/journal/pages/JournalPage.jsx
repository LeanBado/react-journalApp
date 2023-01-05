
import { AddOutlined } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteVIew } from "../views/NoteVIew"
import { NothingSelectedView } from "../views/NothingSelectedView"

export const JournalPage = () => {
  return (
    <JournalLayout>
{/*       <Typography variant={"h1"}>JournalPage</Typography>
 */}      <NothingSelectedView></NothingSelectedView>
    {/*   <NoteVIew></NoteVIew> */}

    <IconButton
    size="large"
    sx={{
      color: "white",
      backgroundColor: "error.main",
      ":hover": { backgroundColor: "error.main", opacity: 0.9 },
      position: "fixed",
      right: 50,
      bottom: 50,
    }}
    ><AddOutlined sx={{ fontSize: 30 }}></AddOutlined></IconButton>
    
    </JournalLayout>
  )
}
