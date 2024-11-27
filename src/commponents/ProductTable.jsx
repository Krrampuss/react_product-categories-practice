import { ProductTableHeader } from './ProductHaeders';
import { ProductRow } from './ProductRow';

export const ProductTable = ({
  filteredProducts,
  categoriesFromServer,
  usersFromServer,
}) => {
  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <ProductTableHeader />
      <tbody>
        {filteredProducts.map(product => {
          const category = categoriesFromServer.find(
            cat => cat.id === product.categoryId,
          );
          const user = usersFromServer.find(u => u.id === category.ownerId);

          return (
            <ProductRow
              key={product.id}
              product={product}
              category={category}
              user={user}
            />
          );
        })}
      </tbody>
    </table>
  );
};
