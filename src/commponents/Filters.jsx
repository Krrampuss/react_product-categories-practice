import cn from 'classnames';

export const Filters = ({
  selectedUser,
  searchQuery,
  users,
  onUserClick,
  onSearchChange,
  onClearSearch,
  onResetFilters,
}) => (
  <nav className="panel">
    <p className="panel-heading">Filters</p>
    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        href="#/"
        onClick={() => onUserClick(null)}
        className={cn({ 'is-active': !selectedUser })}
      >
        All
      </a>
      {users.map(user => (
        <a
          key={user.id}
          data-cy="FilterUser"
          href="#/"
          onClick={() => onUserClick(user.id)}
          className={cn({
            'is-active': selectedUser === user.id,
          })}
        >
          {user.name}
        </a>
      ))}
    </p>
    <div className="panel-block">
      <p className="control has-icons-left has-icons-right">
        <input
          data-cy="SearchField"
          type="text"
          className="input"
          placeholder="Search"
          value={searchQuery}
          onChange={onSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true" />
        </span>
        {searchQuery && (
          <span className="icon is-right">
            <button
              data-cy="ClearButton"
              type="button"
              className="delete"
              onClick={onClearSearch}
            />
          </span>
        )}
      </p>
    </div>
    <div className="panel-block">
      <a
        data-cy="ResetAllButton"
        href="#/"
        className="button is-link is-outlined is-fullwidth"
        onClick={onResetFilters}
      >
        Reset all filters
      </a>
    </div>
  </nav>
);
