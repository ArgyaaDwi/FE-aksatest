export function filterItems(items, keyword) {
  if (!keyword) return items;

  const lower = keyword.toLowerCase();
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(lower) ||
      item.email.toLowerCase().includes(lower)
  );
}
export function paginate(items, page, perPage) {
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return {
    data: items.slice(start, end),
    total: items.length,
  };
}
