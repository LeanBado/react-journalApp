import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote } from '../../store/journal/thunks'


export const SideItems = ({title, body, date, imageURL, id}) => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.journal)
    

    
    const onSelect = () => {
      if(active?.id == id){
        return
    }
        dispatch(activeNote({title, body, date, imageURL, id}))
    }

const titleCorto = useMemo(() => {
    return title.length > 17 ? title.substring(0,17)+"...": title
}, [title])  

const bodyCorto = useMemo(() => {
    return body.length > 17 ? body.substring(0,17)+"...": body
}, [body])  


  return (
    <>
        <ListItem disablePadding onClick={onSelect}>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ titleCorto } />
                    <ListItemText secondary={ bodyCorto } />
                </Grid>
            </ListItemButton>
        </ListItem>
                      
    </>
  )
}
