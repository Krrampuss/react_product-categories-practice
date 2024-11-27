/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { ProductTable } from './commponents/ProductTable';
import { Filters } from './commponents/Filters';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleUserClick = userId => {
    setSelectedUser(userId === selectedUser ? null : userId);
  };

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleResetFilters = () => {
    setSelectedUser(null);
    setSearchQuery('');
  };

  const filteredProducts = productsFromServer.filter(product => {
    const category = categoriesFromServer.find(
      cat => cat.id === product.categoryId,
    );
    const user = usersFromServer.find(u => u.id === category.ownerId);
    const matchesUser = selectedUser ? user.id === selectedUser : true;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesUser && matchesSearch;
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <Filters
            selectedUser={selectedUser}
            searchQuery={searchQuery}
            users={usersFromServer}
            onUserClick={handleUserClick}
            onSearchChange={handleSearchChange}
            onClearSearch={handleClearSearch}
            onResetFilters={handleResetFilters}
          />
        </div>

        <div className="box table-container">
          {filteredProducts.length === 0 ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
            <ProductTable
              filteredProducts={filteredProducts}
              categoriesFromServer={categoriesFromServer}
              usersFromServer={usersFromServer}
            />
          )}
        </div>
      </div>
    </div>
  );
};
