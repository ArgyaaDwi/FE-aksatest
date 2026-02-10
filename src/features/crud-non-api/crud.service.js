const STORAGE_KEY = "crud_items";
const SEED_KEY = "crud_seeded";

function seedInitialData() {
  if (localStorage.getItem(SEED_KEY)) return;

  const dummy = Array.from({ length: 10 }).map((_, i) => ({
    id: crypto.randomUUID(),
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    createdAt: new Date().toISOString(),
  }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(dummy));
  localStorage.setItem(SEED_KEY, "true");
}

/**
 * Ambil semua data
 */
export function getAllItems() {
  try {
    seedInitialData(); // ⬅️ TAMBAHKAN INI
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Ambil data berdasarkan ID
 */
export function getItemById(id) {
  const items = getAllItems();
  return items.find((item) => item.id === id);
}

/**
 * Simpan data ke localStorage
 */
function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}


/**
 * Create item baru
 */
export function createItem(data) {
  const items = getAllItems();

  const newItem = {
    id: crypto.randomUUID(),
    name: data.name,
    email: data.email,
    createdAt: new Date().toISOString(),
  };

  items.unshift(newItem);
  saveItems(items);

  return newItem;
}

/**
 * Update item
 */
export function updateItem(id, data) {
  const items = getAllItems();

  const updatedItems = items.map((item) =>
    item.id === id
      ? {
          ...item,
          name: data.name,
          email: data.email,
        }
      : item
  );

  saveItems(updatedItems);
}

/**
 * Delete item
 */
export function deleteItem(id) {
  const items = getAllItems();
  const filtered = items.filter((item) => item.id !== id);
  saveItems(filtered);
}

