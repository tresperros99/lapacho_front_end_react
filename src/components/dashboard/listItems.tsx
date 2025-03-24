import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import PeopleIcon from "@mui/icons-material/People";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import es from "../../locales/es";
export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <SchoolOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary={es.components.dashboard.listItems.professors} />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary={es.components.dashboard.listItems.orders} />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary={es.components.dashboard.listItems.customers} />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary={es.components.dashboard.listItems.reports} />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary={es.components.dashboard.listItems.integrations} />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
			Saved reports
		</ListSubheader>
		<ListItemButton>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Current month" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Last quarter" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Year-end sale" />
		</ListItemButton> */}
  </React.Fragment>
);
