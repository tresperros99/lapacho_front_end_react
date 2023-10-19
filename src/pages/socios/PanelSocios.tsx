import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../app/store';
import { fetchNominaSocios } from '../../features/socios/sociosThunk';
import { SociosFormateado } from '../../models/responses/socios/NominaSocios.response';
import { eliminarSocio } from '../../api/ApiSocios';
import { TableFooter, TablePagination } from '@mui/material';
const PanelSocios = () => {
  const dispatch = useAppDispatch();
	const {nominaSocios} = useSelector((state:RootState)=> state.socios);
  const navigate = useNavigate(); 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  useEffect(() => {    
    if (nominaSocios.length <= 0) {
      dispatch((fetchNominaSocios())) 
    }
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const editarSocio = (socio:SociosFormateado) => {
    navigate('/formSocios',{state:socio});
  }
  const eliminarSocioById = async (idSocio:number) => {
    //TODO: aca llamar a la api para eliminar
    await eliminarSocio(idSocio)
  }
  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Cedula</TableCell>
            <TableCell align="right">Descripcion</TableCell>
            {/* <TableCell align="right">Estado</TableCell> */}
            <TableCell align="right">Numero de Telefono</TableCell>
            <TableCell align="right">Editar</TableCell>
            <TableCell align="right">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nominaSocios.length>0 &&
          
          nominaSocios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((socio) => (
            <TableRow
              key={socio.idSocio}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {`${socio.nombre} ${socio.apellido}`}
              </TableCell>
              <TableCell align="right">{socio.cedula}</TableCell>
              <TableCell align="right">{socio.tipoSocio}</TableCell>
              {/* <TableCell align="right">{socio.cedula}</TableCell> */}
              <TableCell align="right">{socio.numeroTel}</TableCell>
              <TableCell onClick={()=>editarSocio(socio)} align="right"><EditOutlinedIcon sx={{cursor:'pointer'}} /></TableCell>
              <TableCell onClick={()=>eliminarSocioById(socio.idSocio)} align="right"><DeleteOutlineOutlinedIcon sx={{cursor:'pointer'}} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={nominaSocios.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default PanelSocios;