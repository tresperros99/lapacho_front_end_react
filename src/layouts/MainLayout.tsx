import Grid2 from '@mui/material/Unstable_Grid2';
import SidebarProyect from '../components/Sidebar/SidebarProyect';
import {ReactNode} from 'react'
import TopBarProyect from '../components/TopBar/TopBarProyect';
type MainLayoutProps = {
	children:ReactNode
}
export const MainLayout = ({children}:MainLayoutProps) => {
	return (
		<Grid2 display={'flex'} >
			<SidebarProyect/>
			<main style={{flexGrow:1}}>
				<TopBarProyect/>
				{children}
			</main>
		</Grid2>
	)
}

export default MainLayout;
