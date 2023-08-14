import { Row } from "react-bootstrap";
import AdminAllProductsCard from "./AdminAllProductsCard";
import NoDocumentFound from "../error/NoDocumentFound";

const AdminAllProducts = ({ products }) => {
  return (
    <div>
      <Row>
        {products ? (
          products.map((product, index) => {
            return (
              <AdminAllProductsCard
                key={index}
                item={product}
              ></AdminAllProductsCard>
            );
          })
        ) : (
          <NoDocumentFound></NoDocumentFound>
        )}
      </Row>
    </div>
  );
};

export default AdminAllProducts;
