import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import {
  DetalleFactura,
  FacturaFactura,
  Timbrado,
} from "../../../models/responses/caja/MovimientoDeVenta.response";

export type FacturaPDFProps = {
  timbrado: Timbrado;
  factura: FacturaFactura;
  detalleFactura: DetalleFactura[];
};

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10 },
  header: { textAlign: "center", marginBottom: 20 },
  section: { marginBottom: 10 },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  companyInfo: { fontSize: 10, marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  textBold: { fontWeight: "bold" },
  clientInfo: { marginTop: 10, padding: 10, borderTop: 1, borderBottom: 1 },
  table: { display: "flex", width: "auto", marginTop: 20 },
  tableHeader: { fontWeight: "bold", borderBottom: 1, paddingBottom: 5 },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  tableCell: { width: "20%", textAlign: "right" },
  totalSection: { marginTop: 10, borderTop: 1, paddingTop: 10 },
});

const FacturaTemplate = ({
  timbrado,
  factura,
  detalleFactura,
}: FacturaPDFProps) => (
  <Document>
    <Page style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Factura Electrónica</Text>
        <Text>Timbrado N°: {timbrado.nroTimbrado}</Text>
        <Text>Fecha de Vencimiento: {timbrado.fechaVencimiento.toLocaleDateString()}</Text>
      </View>

      {/* Company Information */}
      <View style={styles.companyInfo}>
        <Text style={styles.textBold}>{timbrado.razonSocial}</Text>
        <Text>RUC: {timbrado.rucEmisor}</Text>
        {timbrado.direccion && <Text>Dirección: {timbrado.direccion}</Text>}
        <Text>Teléfono: 0981810046</Text>{" "}
        {/* Ajusta con el dato correspondiente */}
        <Text>Correo: asismed@asismed.com.py</Text>{" "}
        {/* Ajusta con el dato correspondiente */}
      </View>

      {/* Client Information */}
      <View style={styles.clientInfo}>
        <Text style={styles.textBold}>Datos del Cliente:</Text>
        <Text>Nombre o Razón Social: Lucas Torres Inc</Text>{" "}
        {/* Ajusta con el dato correspondiente */}
        <Text>RUC/CI: {factura.nroFactura}</Text>
      </View>

      {/* Invoice Information */}
      <View style={styles.section}>
        <Text style={styles.textBold}>
          Número de Factura: {factura.nroFactura}
        </Text>
        <Text>Fecha y hora de emisión: 16/10/2024 16:01:26</Text>{" "}
        {/* Ajusta con el dato correspondiente */}
        <Text>Condiciones de venta: Contado</Text>
      </View>

      {/* Table Header */}
      <View style={[styles.row, styles.tableHeader]}>
        <Text style={{ width: "10%" }}>Cant.</Text>
        <Text style={{ width: "50%" }}>Descripción</Text>
        <Text style={{ width: "20%", textAlign: "right" }}>Precio Unit.</Text>
        <Text style={{ width: "20%", textAlign: "right" }}>IVA 10%</Text>
      </View>

      {/* Table Rows */}
      {detalleFactura.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={{ width: "10%" }}>{item.cantidad}</Text>
          <Text style={{ width: "50%" }}>{item.descripcion}</Text>
          <Text style={{ width: "20%", textAlign: "right" }}>
            {item.precio}
          </Text>
          <Text style={{ width: "20%", textAlign: "right" }}>
            {item.iva10.toFixed(2)}
          </Text>
        </View>
      ))}

      {/* Totals */}
      <View style={styles.totalSection}>
        <View style={styles.row}>
          <Text>Total IVA:</Text>
          <Text>{factura.totalIva.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textBold}>Monto Total:</Text>
          <Text style={styles.textBold}>{factura.montoTotal.toFixed(2)}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.section}>
        <Text>Consulte la validez de esta Factura Electrónica en:</Text>
        <Text>https://ekuatia.set.gov.py/consultas</Text>
        <Text>CDC: 0180 0166 5820 0100 1097 5459 2202 4101 6115 9730 1165</Text>
      </View>
    </Page>
  </Document>
);

export default FacturaTemplate;
