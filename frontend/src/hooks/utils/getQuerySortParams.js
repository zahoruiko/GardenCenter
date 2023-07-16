export const getQuerySortParams = (currentSortModeState) => {
  let sortFieldName = "";
  let sortDirection = "";

  switch (+currentSortModeState) {
    case 0:
      sortFieldName = "price";
      sortDirection = "desc";
      break; // Sort: by default
    case 1:
      sortFieldName = "title";
      sortDirection = "asc";
      break; // Name: A to Z
    case 2:
      sortFieldName = "title";
      sortDirection = "desc";
      break; // Name: Z to A
    case 3:
      sortFieldName = "price";
      sortDirection = "asc";
      break; // Price: Low to High
    case 4:
      sortFieldName = "price";
      sortDirection = "desc";
      break; // Price: High to Low
    case 5:
      sortFieldName = "createdAt";
      sortDirection = "asc";
      break; // Newest Arrivals
    case 6:
      sortFieldName = "createdAt";
      sortDirection = "desc";
      break; // Oldest Arrivals
    default:
      sortFieldName = "id";
      sortDirection = "asc";
      break; // Sort: by default
  }
  return { sortFieldName, sortDirection };
};
