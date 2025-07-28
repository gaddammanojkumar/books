const express = require("express");
const app = express();
app.use(express.json());

let items = [
  { id: 1, name: "Pen" },
  { id: 2, name: "Book" }
];

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const newItem = req.body;
  newItem.id = items.length + 1;
  items.push(newItem);
  res.status(201).json({ message: "Item added", item: newItem });
});

app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...req.body };
    res.json({ message: "Item updated", item: items[index] });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(item => item.id !== id);
  res.json({ message: "Item deleted", id });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});