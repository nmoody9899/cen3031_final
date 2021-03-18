import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";
import PropTypes from "prop-types";
import formatMoney from "../../functions/formatMoney";

const Invoice = ({ order }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          ~ {new Date().toLocaleString()} ~
        </Text>
        <Text style={styles.title}>Order Invoice</Text>
        <Text style={styles.author}>Consider Herbs Market</Text>
        <Text style={styles.subtitle}>Order Summary</Text>

        <Table>
          <TableHeader>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Quantity</TableCell>
          </TableHeader>
        </Table>
        <Table data={order.products}>
          <TableBody>
            <DataTableCell getContent={(x) => x.product.title} />
            <DataTableCell
              getContent={(x) => `$${formatMoney(x.product.price)}`}
            />
            <DataTableCell getContent={(x) => x.product.brand.name} />
            <DataTableCell getContent={(x) => x.count} />
          </TableBody>
        </Table>
        <Text style={styles.text}>
          <Text>
            Date:{" "}
            {new Date(order.paymentIntent.created * 1000).toLocaleString()}
          </Text>
          <Text>Order ID: {order.paymentIntent.id}</Text>
          <Text>Order Status: {order.orderStatus}</Text>
          <Text>
            Total Paid: ${formatMoney(order.paymentIntent.amount / 100)}
          </Text>
        </Text>
        <Text style={styles.footer}>
          ~ Thank you for Shopping with Consider Herbs Market ~
        </Text>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

Invoice.propTypes = {
  order: PropTypes.any,
};

export default Invoice;
