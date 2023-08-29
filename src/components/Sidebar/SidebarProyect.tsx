import { Menu, MenuItem, Sidebar, menuClasses, sidebarClasses } from 'react-pro-sidebar';
export const SidebarProyect = () => {
	return (
		<Sidebar 
		rootStyles={{
			[`.${sidebarClasses.container}`]: {
				backgroundColor: '#EA6E5F',
			},
			[`.${menuClasses.menuItemRoot}`]: {
				marginTop:10
			},
		}}
		style={{ height:'100vh'}}>
		<Menu
			menuItemStyles={{
				button: ({ level, active, disabled }) => {
				  // only apply styles on first level elements of the tree
				  if (level === 0)
					return {
					  color: disabled ? '#f5d9ff' : '#416809',
					  backgroundColor: active ? 'yellow' : undefined,
					};
				}
			  }}
				>
				<MenuItem style={{marginTop:100}}> Registrar Socios</MenuItem>
				<MenuItem> Dar de Baja Socio </MenuItem>
				<MenuItem> Pagar Cuotas</MenuItem>
				<MenuItem> Estado Cuenta Club</MenuItem>
				<MenuItem> Facturas</MenuItem>
				<MenuItem> Registras Mesas</MenuItem>
				<MenuItem> Reservar Torneo</MenuItem>
				<MenuItem> Horarios Reservados </MenuItem>
	</Menu>
</Sidebar>
	)
}

export default SidebarProyect;